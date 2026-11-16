import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
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

const revealEase = [0.22, 1, 0.36, 1];

// One-time fade-up used for the header and each section. Print CSS forces
// [data-reveal] visible so the PDF never captures a half-revealed state.
const revealVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: revealEase } },
};

const headerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

function Reveal({ as = 'section', children, ...props }) {
  const Component = as === 'div' ? motion.div : motion.section;
  return (
    <Component
      data-reveal=""
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      {...props}
    >
      {children}
    </Component>
  );
}

function ActionButton({ as = 'button', className, children, ...props }) {
  const Component = as === 'a' ? motion.a : motion.button;
  return (
    <Component
      className={className}
      whileTap={{ scale: 0.98 }}
      transition={criticalSpring}
      {...props}
    >
      {children}
    </Component>
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
                <p className="portrait-modal__clarification">
                  In product design, I anticipate how things might fail and
                  weigh every decision against that risk.
                </p>
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
          width="192"
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

function TimelineRow({ item, isHovered, onHover }) {
  const shouldReduceMotion = useReducedMotion();
  const isCurrent = item.period.includes('Present');

  return (
    <div
      className={`timeline-row ${isHovered ? 'timeline-row--hovered' : ''}`}
      onPointerEnter={onHover}
    >
      <div className="timeline-row__left">
        <div className="timeline-row__period">{item.period}</div>
        <div className="timeline-row__role">{item.role}</div>
        {item.badge && <span className="timeline-row__badge">{item.badge}</span>}
      </div>

      <div className="timeline-row__axis" aria-hidden="true">
        {isHovered && (
          <motion.span
            layoutId="timeline-axis-active"
            className="timeline-row__axis-fill no-print"
            transition={criticalSpring}
          />
        )}
        {isCurrent && !shouldReduceMotion && (
          <motion.span
            className="timeline-row__node-ring no-print"
            initial={{ scale: 1, opacity: 0.55 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{
              duration: 1.8,
              ease: 'easeOut',
              repeat: 2,
              repeatDelay: 0.6,
              delay: 0.8,
            }}
          />
        )}
        <motion.span
          className={`timeline-row__dot ${
            isCurrent ? 'timeline-row__dot--current' : ''
          }`}
          animate={{ scale: isHovered ? 1.25 : 1 }}
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

        {item.context && <p className="workstream__context">{item.context}</p>}

        <ul className="exec-bullets">
          {item.bullets.map((b) => (
            <li key={b.lead}>
              <strong>{b.lead}</strong> {b.text}
              {b.subBullets && (
                <ul className="exec-subbullets">
                  {b.subBullets.map((sb) => (
                    <li key={sb.lead}>
                      <strong>{sb.lead}</strong> {sb.text}
                    </li>
                  ))}
                </ul>
              )}
              {b.tags && (
                <>
                  {b.tagsLabel && (
                    <p className="harness-tags__label">{b.tagsLabel}</p>
                  )}
                  <ul className="harness-tags" aria-label={b.tagsLabel}>
                    {b.tags.map((tag, tagIdx) => (
                      <motion.li
                        key={tag}
                        className="skill-pill"
                        whileHover={{ y: -2, scale: 1.015 }}
                        transition={criticalSpring}
                      >
                        <span className="harness-tag__content">
                          <span className="harness-tag__step">
                            0{tagIdx + 1}
                          </span>
                          <span>{tag}</span>
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExperienceTimeline({ items }) {
  const [hoveredTimelineId, setHoveredTimelineId] = useState(null);

  return (
    <div className="exp-timeline" onPointerLeave={() => setHoveredTimelineId(null)}>
      {items.map((item, idx) => (
        <div key={item.id} className="exp-timeline__group">
          {item.isCompanyStart && (
            <div
              className={`exp-org-banner ${idx > 0 ? 'exp-org-banner--spaced' : ''}`}
            >
              <h3 className="exp-org-banner__name">{item.company}</h3>
              <span className="exp-org-banner__meta">{item.companyMeta}</span>
            </div>
          )}
          <TimelineRow
            item={item}
            isHovered={hoveredTimelineId === item.id}
            onHover={() => setHoveredTimelineId(item.id)}
          />
        </div>
      ))}
    </div>
  );
}

function ScrollControls() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 34,
    restDelta: 0.001,
  });
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 260;
    setShowTop((prev) => (prev === next ? prev : next));
  });

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      <div className="scroll-rail no-print" aria-hidden="true">
        <motion.div
          className="scroll-rail__fill"
          style={{ scaleY: shouldReduceMotion ? scrollYProgress : smoothProgress }}
        />
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.div
            key="scroll-top"
            className="scroll-top-wrap no-print"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={criticalSpring}
          >
            <ActionButton
              as="button"
              type="button"
              className="btn btn--secondary scroll-top-btn"
              aria-label="Back to top"
              onClick={handleScrollTop}
            >
              <Icon name="arrowUp" size={14} />
              <span>Top</span>
            </ActionButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
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

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link no-print">
        Skip to CV content
      </a>

      <ScrollControls />

      <div className="page-wrapper">
        {/* Minimal Web Utility Bar (Hidden in Print) */}
        <header className="utility-bar no-print" aria-label="Document actions">
          <div className="utility-bar__actions">
            <ActionButton
              as="a"
              href="./cv.pdf"
              download="Ngoc-Khanh-Chu-CV.pdf"
              onClick={handleDownloadPdf}
              aria-busy={isDownloadingPdf || undefined}
              className="btn btn--primary"
            >
              <Icon name="download" size={14} />
              <span>{isDownloadingPdf ? 'Preparing PDF...' : 'Download PDF'}</span>
            </ActionButton>
          </div>
        </header>

        {/* Single-Sheet Document */}
        <main id="main-content" className="cv-sheet">

          {/* 1. Profile Header */}
          <motion.section
            className="exec-header"
            aria-label="Profile"
            variants={headerStagger}
            initial="hidden"
            animate="visible"
          >
            <div className="exec-header__top">
              <motion.div data-reveal="" variants={revealVariants}>
                <InteractivePortrait src={profilePhoto} alt={cvData.name} />
              </motion.div>

              <div className="exec-header__identity">
                <motion.h1
                  className="exec-header__name"
                  data-reveal=""
                  variants={revealVariants}
                >
                  {cvData.name}
                </motion.h1>
                <motion.p
                  className="exec-header__role"
                  data-reveal=""
                  variants={revealVariants}
                >
                  {cvData.role} <span className="exec-header__sep">·</span>{' '}
                  <span>{cvData.company}</span>
                </motion.p>

                <motion.div
                  className="exec-header__contacts"
                  data-reveal=""
                  variants={revealVariants}
                >
                  <span className="contact-item">
                    <Icon name="location" size={15} />
                    <span>{cvData.location}</span>
                  </span>
                  <a href={cvData.phoneHref} className="contact-item">
                    <Icon name="phone" size={15} />
                    <span>{cvData.phone}</span>
                  </a>
                  <a href={`mailto:${cvData.email}`} className="contact-item">
                    <Icon name="mail" size={15} />
                    <span>{cvData.email}</span>
                  </a>
                  <a
                    href={cvData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn profile"
                    className="contact-item"
                  >
                    <Icon name="linkedin" size={15} />
                    <span>{cvData.linkedinLabel}</span>
                  </a>
                </motion.div>

                <motion.ul
                  className="exec-header__summary"
                  data-reveal=""
                  variants={revealVariants}
                >
                  {(Array.isArray(cvData.summary)
                    ? cvData.summary
                    : cvData.summary.split('\n')
                  ).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.section>

          {/* 2. Professional Experience (Left Vertical Timeline) */}
          <Reveal className="cv-section" aria-labelledby="heading-experience">
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
          </Reveal>

          {/* 3. Methodologies & Tooling */}
          <Reveal className="cv-section" aria-labelledby="heading-skills">
            <div className="section-head">
              <div className="section-head__group">
                <span className="section-head__icon">
                  <Icon name="layers" size={17} />
                </span>
                <h2 id="heading-skills" className="section-head__title">
                  Methodologies &amp; Tooling
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
          </Reveal>

          {/* 4. Education, Certifications & Honors */}
          <Reveal className="cv-section" aria-labelledby="heading-credentials">
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
              {/* Left Column: Academic Education */}
              <div className="cred-col">
                <h3 className="cred-col__heading">
                  <span className="competency-row__icon">
                    <Icon name="graduation" size={15} />
                  </span>
                  <span>Academic Education</span>
                </h3>
                <ul className="cred-entries">
                  {cvData.education.map((edu) => (
                    <li key={edu.degree} className="cred-entry">
                      <div className="cred-entry__top">
                        <span className="cred-entry__title">{edu.degree}</span>
                        <span className="cred-entry__date">{edu.period}</span>
                      </div>
                      <div className="cred-entry__org">{edu.school}</div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Certifications & Honors */}
              <div className="cred-col">
                <h3 className="cred-col__heading">
                  <span className="competency-row__icon">
                    <Icon name="award" size={15} />
                  </span>
                  <span>Certifications &amp; Honors</span>
                </h3>
                <ul className="cred-entries">
                  {cvData.certifications.map((cert) => (
                    <li key={cert.name} className="cred-entry">
                      <div className="cred-entry__top">
                        <span className="cred-entry__title">
                          {cert.url ? (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noreferrer"
                              className="cred-link"
                            >
                              <span>{cert.name}</span>
                              <Icon name="external" size={13} />
                            </a>
                          ) : (
                            cert.name
                          )}
                        </span>
                        {cert.period && (
                          <span className="cred-entry__date">{cert.period}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* 5. Open-Source Projects */}
          <Reveal className="cv-section cv-section--last" aria-labelledby="heading-projects">
            <div className="section-head">
              <div className="section-head__group">
                <span className="section-head__icon">
                  <Icon name="cpu" size={17} />
                </span>
                <h2 id="heading-projects" className="section-head__title">
                  Open-Source Projects
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
                        <span>{proj.name}</span>
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
          </Reveal>
        </main>
      </div>
    </MotionConfig>
  );
}
