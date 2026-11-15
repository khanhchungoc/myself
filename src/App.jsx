import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { cvData } from './data/cvData';
import { Icon } from './components/Illustrations';
import profilePhoto from './assets/profile.jpg';

const criticalSpring = {
  type: 'spring',
  bounce: 0,
  visualDuration: 0.24,
};

const portraitModalTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

function MagneticButton({
  as = 'button',
  strength = 3,
  className,
  children,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);

  const smoothX = useSpring(pullX, { stiffness: 320, damping: 24 });
  const smoothY = useSpring(pullY, { stiffness: 320, damping: 24 });

  const handlePointerMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const clampedX = Math.max(-1, Math.min(1, relX));
    const clampedY = Math.max(-1, Math.min(1, relY));
    pullX.set(clampedX * strength);
    pullY.set(clampedY * strength);
  };

  const handlePointerLeave = () => {
    pullX.set(0);
    pullY.set(0);
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <motion.div
      className="magnetic-wrap"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={shouldReduceMotion ? undefined : { x: smoothX, y: smoothY }}
    >
      <Component
        className={className}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={criticalSpring}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}

function PortraitQuoteModal({
  modalState,
  isMounted,
  src,
  alt,
  onClose,
  onExitComplete,
  shouldReduceMotion,
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!modalState) return;

    const frameId = requestAnimationFrame(() => {
      cardRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'PageUp' ||
        e.key === 'PageDown'
      ) {
        e.preventDefault();
      }
    };

    const preventWheel = (e) => e.preventDefault();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', preventWheel, { passive: false });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', preventWheel);
    };
  }, [modalState, onClose]);

  if (typeof document === 'undefined' || !isMounted) return null;

  return createPortal(
    <div
      className="portrait-modal no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Murphy's Law quote"
    >
      <AnimatePresence onExitComplete={onExitComplete}>
        {modalState && (
          <motion.div
            key="backdrop"
            className="portrait-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {modalState && (
          <motion.div
            key="stage"
            className="portrait-modal__stage"
            style={{
              width: modalState.targetWidth,
              height: modalState.targetHeight,
            }}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    x: modalState.deltaX,
                    y: modalState.deltaY,
                    scale: modalState.startScale,
                  }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { x: 0, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    x: modalState.deltaX,
                    y: modalState.deltaY,
                    scale: modalState.startScale,
                  }
            }
            transition={portraitModalTransition}
          >
            <motion.div
              ref={cardRef}
              role="button"
              tabIndex={0}
              aria-label="Close Murphy's Law quote"
              className="portrait-modal__card"
              style={
                shouldReduceMotion ? undefined : { transformStyle: 'preserve-3d' }
              }
              initial={shouldReduceMotion ? false : { rotateY: 0 }}
              animate={shouldReduceMotion ? undefined : { rotateY: 180 }}
              exit={shouldReduceMotion ? undefined : { rotateY: 0 }}
              transition={portraitModalTransition}
              onClick={onClose}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClose();
                }
              }}
            >
              {!shouldReduceMotion && (
                <div
                  className="portrait-modal__face portrait-modal__face--front"
                  aria-hidden="true"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="portrait-modal__photo"
                  />
                </div>
              )}

              <div
                className={`portrait-modal__face portrait-modal__face--back ${
                  shouldReduceMotion ? 'portrait-modal__face--flat' : ''
                }`}
              >
                <p className="portrait-modal__note">My Operating Principle</p>
                <blockquote className="portrait-modal__quote">
                  &ldquo;Anything that can go wrong,{' '}
                  <span className="portrait-modal__quote-tail">
                    will go wrong&rdquo;
                  </span>
                </blockquote>
                <p className="portrait-modal__attribution">- Murphy&apos;s Law</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

function InteractivePortrait({ src, alt }) {
  const shouldReduceMotion = useReducedMotion();
  const slotRef = useRef(null);
  const buttonRef = useRef(null);
  const [modalState, setModalState] = useState(null);
  const [isPortraitHidden, setIsPortraitHidden] = useState(false);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const hoverTarget = useMotionValue(0);

  const smoothX = useSpring(normX, { stiffness: 260, damping: 28 });
  const smoothY = useSpring(normY, { stiffness: 260, damping: 28 });
  const glareOpacity = useSpring(hoverTarget, { stiffness: 240, damping: 28 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], [12, 88]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [12, 88]);
  const glareBackground = useMotionTemplate`radial-gradient(125px circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.42), rgba(219, 234, 254, 0.16) 44%, transparent 72%)`;

  const handlePointerEnter = () => {
    if (shouldReduceMotion) return;
    hoverTarget.set(1);
  };

  const handlePointerMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    normX.set((e.clientX - rect.left) / rect.width - 0.5);
    normY.set((e.clientY - rect.top) / rect.height - 0.5);
    hoverTarget.set(1);
  };

  const handlePointerLeave = () => {
    normX.set(0);
    normY.set(0);
    hoverTarget.set(0);
  };

  const handleOpen = () => {
    const rect = (slotRef.current || buttonRef.current)?.getBoundingClientRect();
    const aspect = rect && rect.width > 0 ? rect.height / rect.width : 0.875;

    let targetWidth = Math.min(440, Math.round(window.innerWidth * 0.86));
    let targetHeight = Math.round(targetWidth * aspect);
    const maxHeight = Math.round(window.innerHeight * 0.82);
    if (targetHeight > maxHeight) {
      targetHeight = maxHeight;
      targetWidth = Math.round(targetHeight / aspect);
    }

    if (!rect) {
      setIsPortraitHidden(true);
      setModalState({
        deltaX: 0,
        deltaY: 0,
        startScale: 0.5,
        targetWidth,
        targetHeight,
      });
      return;
    }

    const srcCenterX = rect.left + rect.width / 2;
    const srcCenterY = rect.top + rect.height / 2;
    const vpCenterX = window.innerWidth / 2;
    const vpCenterY = window.innerHeight / 2;

    normX.set(0);
    normY.set(0);
    hoverTarget.set(0);

    setIsPortraitHidden(true);
    setModalState({
      deltaX: srcCenterX - vpCenterX,
      deltaY: srcCenterY - vpCenterY,
      startScale: rect.width / targetWidth,
      targetWidth,
      targetHeight,
    });
  };

  const handleClose = useCallback(() => {
    setModalState(null);
  }, []);

  const handleExitComplete = useCallback(() => {
    setIsPortraitHidden(false);
    requestAnimationFrame(() => {
      buttonRef.current?.focus({ preventScroll: true });
    });
  }, []);

  return (
    <div ref={slotRef} className="exec-header__portrait-slot">
      <motion.button
        ref={buttonRef}
        type="button"
        className={`exec-header__portrait ${
          isPortraitHidden ? 'exec-header__portrait--expanded' : ''
        }`}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleOpen}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={criticalSpring}
        aria-label="Expand profile photo to view Murphy's Law quote"
        aria-haspopup="dialog"
        aria-expanded={Boolean(modalState)}
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformPerspective: 650,
                transformStyle: 'preserve-3d',
              }
        }
      >
        <img
          src={src}
          alt={alt}
          width="244"
          height="214"
          className="exec-header__photo"
        />
        <motion.div
          className="exec-header__portrait-glare no-print"
          style={{ background: glareBackground, opacity: glareOpacity }}
          aria-hidden="true"
        />
      </motion.button>

      <PortraitQuoteModal
        modalState={modalState}
        isMounted={Boolean(modalState) || isPortraitHidden}
        src={src}
        alt={alt}
        onClose={handleClose}
        onExitComplete={handleExitComplete}
        shouldReduceMotion={shouldReduceMotion}
      />
    </div>
  );
}

function ExperienceTimeline({ items }) {
  const [hoveredTimelineId, setHoveredTimelineId] = useState(null);

  return (
    <div
      className="exp-timeline"
      onPointerLeave={() => setHoveredTimelineId(null)}
    >
      {items.map((item, idx) => {
        const isHovered = hoveredTimelineId === item.id;
        const isPrimaryCurrent = idx === 0;

        return (
          <div key={item.id} className="exp-timeline__group">
            {item.isCompanyStart && (
              <div
                className={`exp-org-banner ${
                  idx > 0 ? 'exp-org-banner--spaced' : ''
                }`}
              >
                <h3 className="exp-org-banner__name">{item.company}</h3>
                <span className="exp-org-banner__meta">{item.companyMeta}</span>
              </div>
            )}

            <div
              className={`timeline-row ${
                isHovered ? 'timeline-row--hovered' : ''
              }`}
              onPointerEnter={() => setHoveredTimelineId(item.id)}
            >
              <div className="timeline-row__left">
                <div className="timeline-row__period">{item.period}</div>
                <div className="timeline-row__role">{item.role}</div>
                {item.badge && (
                  <span className="timeline-row__badge">{item.badge}</span>
                )}
              </div>

              <div className="timeline-row__axis" aria-hidden="true">
                {isHovered && (
                  <motion.span
                    layoutId="timeline-axis-active"
                    className="timeline-row__axis-glow no-print"
                    transition={criticalSpring}
                  />
                )}
                <motion.span
                  className="timeline-row__node-ring no-print"
                  initial={false}
                  animate={{
                    scale: isHovered ? 1.85 : isPrimaryCurrent ? 1.4 : 0.75,
                    opacity: isHovered ? 1 : isPrimaryCurrent ? 0.5 : 0,
                  }}
                  transition={criticalSpring}
                />
                <motion.span
                  className={`timeline-row__dot ${
                    isPrimaryCurrent ? 'timeline-row__dot--current' : ''
                  }`}
                  animate={{
                    scale: isHovered ? 1.25 : 1,
                  }}
                  transition={criticalSpring}
                />
              </div>

              <div className="timeline-row__body">
                <h4 className="workstream__title">
                  <span className="workstream__icon">
                    <Icon name={item.icon} size={15} />
                  </span>
                  <span>{item.trackTitle}</span>
                </h4>

                {item.context && (
                  <p className="workstream__context">{item.context}</p>
                )}

                <ul className="exec-bullets">
                  {item.bullets.map((b) => (
                    <li key={b.lead}>
                      <strong>{b.lead}</strong> {b.text}
                      {b.tags && (
                        <ul
                          className="harness-tags"
                          aria-label="AI Harness Operating Principles"
                        >
                          {b.tags.map((tag, tagIdx) => (
                            <li key={tag} className="harness-tag">
                              <span className="harness-tag__content">
                                <span className="harness-tag__step">
                                  0{tagIdx + 1}
                                </span>
                                <span>{tag}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDownloadPdf = async (e) => {
    e.preventDefault();
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);

    try {
      const response = await fetch('./cv.pdf', { cache: 'no-store' });
      if (!response.ok) {
        window.print();
        return;
      }

      const blob = await response.blob();
      const signature = await blob.slice(0, 5).text();
      if (signature !== '%PDF-') {
        // Vite dev/preview and SPA hosts fall back to index.html for missing files.
        window.print();
        return;
      }

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Ngoc-Khanh-Chu-CV.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // GPU-translated pointer spotlight across .cv-sheet (avoids per-frame gradient/mask repaints)
  const sheetMouseX = useMotionValue(-300);
  const sheetMouseY = useMotionValue(-300);
  const sheetActive = useMotionValue(0);
  const smoothSheetX = useSpring(sheetMouseX, { stiffness: 220, damping: 30 });
  const smoothSheetY = useSpring(sheetMouseY, { stiffness: 220, damping: 30 });
  const sheetOpacity = useSpring(sheetActive, { stiffness: 220, damping: 30 });

  const handleSheetPointerMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    sheetMouseX.set(e.clientX - rect.left - 240);
    sheetMouseY.set(e.clientY - rect.top - 240);
    sheetActive.set(1);
  };

  const handleSheetPointerLeave = () => {
    sheetActive.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link no-print">
        Skip to CV content
      </a>

      <div className="page-wrapper">
        {/* Minimal Web Utility Bar (Hidden in Print) */}
        <header className="utility-bar no-print" aria-label="Document actions">
          <div className="utility-bar__title">
            <strong>{cvData.name}</strong>
            <span>- Curriculum Vitae</span>
          </div>
          <div className="utility-bar__actions">
            <MagneticButton
              as="a"
              href="./cv.pdf"
              download="Ngoc-Khanh-Chu-CV.pdf"
              onClick={handleDownloadPdf}
              aria-busy={isDownloadingPdf || undefined}
              className="btn btn--secondary"
            >
              <Icon name="download" size={14} />
              <span>{isDownloadingPdf ? 'Preparing PDF...' : 'Download PDF'}</span>
            </MagneticButton>
            <MagneticButton
              as="button"
              type="button"
              onClick={() => window.print()}
              className="btn btn--primary"
            >
              <Icon name="print" size={14} />
              <span>Print A4</span>
            </MagneticButton>
          </div>
        </header>

        {/* Single-Sheet Document */}
        <main
          id="main-content"
          className="cv-sheet"
          onPointerMove={handleSheetPointerMove}
          onPointerLeave={handleSheetPointerLeave}
        >
          <div className="cv-sheet__blueprint no-print" aria-hidden="true" />
          <motion.div
            className="cv-sheet__sheen no-print"
            style={{
              x: smoothSheetX,
              y: smoothSheetY,
              opacity: sheetOpacity,
            }}
            aria-hidden="true"
          />

          {/* 1. Profile Header */}
          <section
            className="exec-header"
            aria-label="Profile"
          >
            <div className="exec-header__top">
              <InteractivePortrait src={profilePhoto} alt={cvData.name} />

              <div className="exec-header__identity">
                <h1 className="exec-header__name">{cvData.name}</h1>
                <p className="exec-header__role">
                  {cvData.role} <span className="exec-header__sep">·</span>{' '}
                  <span>{cvData.company}</span>
                </p>

                {/* Clean Single-Line Contact Bar */}
                <div className="exec-header__contacts">
                  <span className="contact-item">
                    <Icon name="location" size={14} />
                    <span>{cvData.location}</span>
                  </span>
                  <motion.a
                    href={cvData.phoneHref}
                    className="contact-item"
                    whileHover={{ y: -2 }}
                    transition={criticalSpring}
                  >
                    <Icon name="phone" size={14} />
                    <span>{cvData.phone}</span>
                  </motion.a>
                  <motion.a
                    href={`mailto:${cvData.email}`}
                    className="contact-item"
                    whileHover={{ y: -2 }}
                    transition={criticalSpring}
                  >
                    <Icon name="mail" size={14} />
                    <span>{cvData.email}</span>
                  </motion.a>
                  <motion.a
                    href={cvData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-item"
                    whileHover={{ y: -2 }}
                    transition={criticalSpring}
                  >
                    <Icon name="linkedin" size={14} />
                    <span>{cvData.linkedinLabel}</span>
                  </motion.a>
                </div>

                <p className="exec-header__summary">{cvData.summary}</p>
              </div>
            </div>
          </section>

          {/* 2. Professional Experience (Left Vertical Timeline) */}
          <section className="cv-section" aria-labelledby="heading-experience">
            <div className="section-head">
              <div className="section-head__group">
                <span className="section-head__icon">
                  <Icon name="briefcase" size={17} />
                </span>
                <h2 id="heading-experience" className="section-head__title">
                  Professional Experience
                </h2>
              </div>
            </div>

            <ExperienceTimeline items={cvData.timeline} />
          </section>

          {/* 3. Side Projects (BA & AI Workflows) */}
          <section className="cv-section" aria-labelledby="heading-projects">
            <div className="section-head">
              <div className="section-head__group">
                <span className="section-head__icon">
                  <Icon name="cpu" size={17} />
                </span>
                <h2 id="heading-projects" className="section-head__title">
                  Side Projects &mdash; BA &amp; AI Workflows
                </h2>
              </div>
            </div>

            <ul className="exec-bullets">
              {cvData.sideProjects.map((proj) => (
                <li key={proj.name}>
                  <strong>
                    {proj.url ? (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="cred-link"
                      >
                        <span>{proj.repoLabel || proj.name}</span>
                        <Icon name="external" size={13} />
                      </a>
                    ) : (
                      proj.name
                    )}
                    :
                  </strong>{' '}
                  {proj.description}
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Core Competencies */}
          <section className="cv-section" aria-labelledby="heading-skills">
            <div className="section-head">
              <div className="section-head__group">
                <span className="section-head__icon">
                  <Icon name="layers" size={17} />
                </span>
                <h2 id="heading-skills" className="section-head__title">
                  Core Competencies &amp; Domain Expertise
                </h2>
              </div>
            </div>

            <div className="competency-table">
              {cvData.skillGroups.map((group) => (
                <div key={group.category} className="competency-row">
                  <h3 className="competency-row__label">
                    <span className="competency-row__icon">
                      <Icon name={group.icon} size={15} />
                    </span>
                    <span>{group.category}</span>
                  </h3>
                  <ul className="competency-row__tags">
                    {group.items.map((item) => (
                      <motion.li
                        key={item}
                        className="skill-pill"
                        whileHover={{ y: -2, scale: 1.015 }}
                        transition={criticalSpring}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Education, Certifications, Awards & Languages */}
          <section className="cv-section cv-section--last" aria-labelledby="heading-credentials">
            <div className="section-head">
              <div className="section-head__group">
                <span className="section-head__icon">
                  <Icon name="graduation" size={17} />
                </span>
                <h2 id="heading-credentials" className="section-head__title">
                  Education, Certifications &amp; Honors
                </h2>
              </div>
            </div>

            <div className="credentials-columns">
              {/* Left Column: Education & Languages */}
              <div className="cred-col">
                <h3 className="cred-col__heading">
                  <Icon name="graduation" size={14} />
                  <span>Academic Education</span>
                </h3>
                <ul className="cred-entries">
                  {cvData.education.map((edu) => (
                    <li key={edu.school} className="cred-entry">
                      <div className="cred-entry__top">
                        <strong className="cred-entry__title">{edu.degree}</strong>
                        <span className="cred-entry__date">{edu.period}</span>
                      </div>
                      <div className="cred-entry__org">{edu.school}</div>
                      <div className="cred-entry__detail">{edu.detail}</div>
                    </li>
                  ))}
                </ul>

                <h3 className="cred-col__heading cred-col__heading--spaced">
                  <Icon name="globe" size={14} />
                  <span>Languages</span>
                </h3>
                <ul className="cred-entries cred-entries--compact">
                  {cvData.languages.map((lang) => (
                    <li key={lang.language} className="cred-entry cred-entry--inline">
                      <strong>{lang.language}:</strong> <span>{lang.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Licenses & Honors */}
              <div className="cred-col">
                <h3 className="cred-col__heading">
                  <Icon name="award" size={14} />
                  <span>Licenses &amp; Certifications</span>
                </h3>
                <ul className="cred-entries">
                  {cvData.certifications.map((cert) => (
                    <li key={cert.name} className="cred-entry">
                      <div className="cred-entry__top">
                        <strong className="cred-entry__title">
                          {cert.url ? (
                            <motion.a
                              href={cert.url}
                              target="_blank"
                              rel="noreferrer"
                              className="cred-link"
                              whileHover={{ y: -1.5 }}
                              transition={criticalSpring}
                            >
                              <span>{cert.name}</span>
                              <Icon name="external" size={13} />
                            </motion.a>
                          ) : (
                            cert.name
                          )}
                        </strong>
                      </div>
                      <div className="cred-entry__org">{cert.issuer}</div>
                      <div className="cred-entry__detail">{cert.date}</div>
                    </li>
                  ))}
                </ul>

                <h3 className="cred-col__heading cred-col__heading--spaced">
                  <Icon name="trophy" size={14} />
                  <span>Honors &amp; Awards</span>
                </h3>
                <ul className="cred-entries cred-entries--compact">
                  {cvData.awards.map((award) => (
                    <li key={award.title} className="cred-entry">
                      <strong className="cred-entry__title">{award.title}</strong>
                      <div className="cred-entry__detail">{award.issuer}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}
