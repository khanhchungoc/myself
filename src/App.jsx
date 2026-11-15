import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { cvData } from './data/cvData';
import { HeroIllustration, PillarIcon } from './components/Illustrations';
import profilePhoto from './assets/profile.jpg';

const sectionReveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.08 },
  transition: { duration: 0.35, ease: 'easeOut' },
};

const pillSpring = {
  type: 'spring',
  bounce: 0.18,
  visualDuration: 0.32,
};

function TelemetryCounter({ item, isActiveLens, onSelectLens }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(prefersReducedMotion ? item.numericValue : 0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      count.set(item.numericValue);
      return;
    }
    const controls = animate(count, item.numericValue, {
      duration: 0.9,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [count, isInView, item.numericValue, prefersReducedMotion]);

  return (
    <motion.button
      ref={ref}
      type="button"
      className={`telemetry-cell ${isActiveLens ? 'telemetry-cell--active' : ''}`}
      onClick={() => onSelectLens(isActiveLens ? 'all' : item.lens)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      title={`Filter blueprint by ${item.label}`}
    >
      <div className="telemetry-cell__value">
        <span>{item.prefix}</span>
        <motion.span>{rounded}</motion.span>
        <span>{item.suffix}</span>
      </div>
      <div className="telemetry-cell__label">{item.label}</div>
      <div className="telemetry-cell__sub">{item.sub}</div>
    </motion.button>
  );
}

function HarnessPipeline({ stages }) {
  const [activeStageId, setActiveStageId] = useState(stages[0].id);
  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];

  return (
    <div className="harness-pipeline">
      <div className="harness-pipeline__header">
        <span className="harness-pipeline__label">
          BA AGENT HARNESS ARCHITECTURE // 4-STAGE LIFECYCLE
        </span>
        <span className="harness-pipeline__hint no-print">
          Click stage to inspect specification
        </span>
      </div>

      <div className="harness-steps" role="tablist" aria-label="BA AI Agent Harness Stages">
        {stages.map((stage) => {
          const isSelected = stage.id === activeStageId;
          return (
            <motion.button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`harness-step ${isSelected ? 'harness-step--active' : ''}`}
              onClick={() => setActiveStageId(stage.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <motion.span
                  layoutId="harness-stage-outline"
                  className="harness-step__indicator no-print"
                  transition={pillSpring}
                />
              )}
              <div className="harness-step__top">
                <span className="harness-step__num">STAGE {stage.step}</span>
              </div>
              <div className="harness-step__title">{stage.title}</div>
              <div className="harness-step__short">{stage.short}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Interactive detail panel on web */}
      <div className="harness-detail no-print" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="harness-detail__inner"
          >
            <span className="harness-detail__badge">STAGE {activeStage.step} SPEC</span>
            <p className="harness-detail__text">{activeStage.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  const [activeLens, setActiveLens] = useState('all');
  const [activeEra, setActiveEra] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [theme, setTheme] = useState('light');
  const [copiedField, setCopiedField] = useState(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleCopy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => {
        setCopiedField((prev) => (prev === key ? null : prev));
      }, 2000);
    } catch {
      window.location.href = key === 'email' ? `mailto:${value}` : `tel:${value}`;
    }
  };

  const handleSelectLens = (lensId) => {
    setActiveLens(lensId);
    setSelectedSkill(null);
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkill((prev) => (prev === skill ? null : skill));
  };

  const resetAllFilters = () => {
    setActiveLens('all');
    setActiveEra(null);
    setSelectedSkill(null);
  };

  const isRowHighlighted = (row) => {
    if (selectedSkill) {
      return row.skills && row.skills.includes(selectedSkill);
    }
    if (activeEra) {
      return row.eras && row.eras.includes(activeEra);
    }
    if (activeLens !== 'all') {
      return row.lenses && row.lenses.includes(activeLens);
    }
    return true;
  };

  const isFilteringActive =
    activeLens !== 'all' || Boolean(activeEra) || Boolean(selectedSkill);

  // Count matching experience highlights when a skill or lens is active
  const allHighlights = [
    ...cvData.nashtech.tracks.flatMap((t) => t.highlights),
    ...cvData.earlierExperience.flatMap((e) => e.highlights),
  ];
  const matchedHighlightCount = allHighlights.filter(isRowHighlighted).length;

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link no-print">
        Skip to CV content
      </a>

      {/* Top Scroll-Linked Blueprint Ruler */}
      <motion.div
        className="scroll-ruler no-print"
        style={{ scaleX: smoothProgress }}
        aria-hidden="true"
      />

      <div className="page-shell">
        {/* ZONE 0: Sticky Blueprint Command Bar (Web Only) */}
        <motion.header
          className="command-bar no-print"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="command-bar__top">
            <div className="command-bar__brand">
              <motion.span
                className="status-dot"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="command-bar__id">
                BLUEPRINT // NKC-CV · {cvData.location}
              </span>
            </div>

            <nav className="command-bar__jumps" aria-label="Section navigation">
              <a href="#operating-model" className="jump-link">
                01. Pillars
              </a>
              <a href="#experience" className="jump-link">
                02. Experience
              </a>
              <a href="#skills" className="jump-link">
                03. Skills
              </a>
              <a href="#credentials" className="jump-link">
                04. Credentials
              </a>
            </nav>

            <div className="command-bar__actions">
              <motion.button
                type="button"
                className="btn btn--icon"
                onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                aria-label={
                  theme === 'light'
                    ? 'Switch to CAD Night Blueprint mode'
                    : 'Switch to Parchment Light Blueprint mode'
                }
                title={
                  theme === 'light'
                    ? 'Switch to CAD Night Blueprint'
                    : 'Switch to Parchment Light'
                }
              >
                <PillarIcon type={theme === 'light' ? 'moon' : 'sun'} />
                <span>{theme === 'light' ? 'CAD Night' : 'Parchment'}</span>
              </motion.button>

              <motion.a
                href="./cv.pdf"
                download="Ngoc-Khanh-Chu-CV.pdf"
                className="btn"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Download PDF
              </motion.a>

              <motion.button
                type="button"
                onClick={() => window.print()}
                className="btn btn--primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Print A4
              </motion.button>
            </div>
          </div>

          {/* Interactive 5-Pillar Executive Lens Bar */}
          <div className="lens-bar" role="toolbar" aria-label="Executive Perspective Lens">
            <span className="lens-bar__label">INSPECT LENS:</span>
            <div className="lens-bar__pills">
              {cvData.lenses.map((lens) => {
                const isSelected = activeLens === lens.id && !selectedSkill && !activeEra;
                return (
                  <button
                    key={lens.id}
                    type="button"
                    className={`lens-pill ${isSelected ? 'lens-pill--active' : ''}`}
                    onClick={() => {
                      setActiveEra(null);
                      handleSelectLens(lens.id);
                    }}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="active-lens-pill"
                        className="lens-pill__bg"
                        transition={pillSpring}
                      />
                    )}
                    <span className="lens-pill__code">{lens.code}</span>
                    <span className="lens-pill__text">{lens.label}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isFilteringActive && (
                <motion.div
                  className="filter-status"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.16 }}
                >
                  <span className="filter-status__count">
                    {selectedSkill
                      ? `Skill X-Ray: "${selectedSkill}" (${matchedHighlightCount} matches)`
                      : activeEra
                        ? `Era Filter Active (${matchedHighlightCount} matches)`
                        : `${matchedHighlightCount} specs highlighted`}
                  </span>
                  <button
                    type="button"
                    className="filter-status__reset"
                    onClick={resetAllFilters}
                  >
                    Reset
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        <main id="main-content">
          {/* ZONE 1: Asymmetric Executive Hero + Telemetry Bar */}
          <motion.section
            className="hero"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
          >
            <div className="hero__grid">
              <div className="hero__main">
                <div className="hero__eyebrow-row">
                  <span className="hero__eyebrow">
                    {cvData.company} · {cvData.location}
                  </span>
                  <span className="hero__spec-meta">
                    SPEC // REV-2026 · DOB: {cvData.dob}
                  </span>
                </div>

                <h1 className="hero__name">{cvData.name}</h1>
                <p className="hero__title">{cvData.role}</p>

                <div className="hero__principle">
                  <span className="hero__principle-tag">{cvData.quoteLabel} //</span>
                  <span className="hero__principle-quote">“{cvData.quote}”</span>
                  <span className="hero__principle-sub">— {cvData.quoteSub}</span>
                </div>

                <p className="hero__summary">{cvData.summary}</p>

                {/* Tactile Contact Pills + Print-Clean Links */}
                <div className="hero__contacts">
                  <motion.a
                    href={cvData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-pill"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="contact-pill__tag">IN</span>
                    <span>linkedin.com/in/khanhchungoc</span>
                  </motion.a>

                  <div className="contact-pill-group">
                    <a href={`mailto:${cvData.email}`} className="contact-pill">
                      <span className="contact-pill__tag">MAIL</span>
                      <span>{cvData.email}</span>
                    </a>
                    <motion.button
                      type="button"
                      className="contact-copy-btn no-print"
                      onClick={() => handleCopy(cvData.email, 'email')}
                      whileTap={{ scale: 0.92 }}
                      aria-label="Copy email address"
                      title="Copy email address"
                    >
                      <PillarIcon type={copiedField === 'email' ? 'check' : 'copy'} />
                      <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                    </motion.button>
                  </div>

                  <div className="contact-pill-group">
                    <a href={cvData.phoneHref} className="contact-pill">
                      <span className="contact-pill__tag">TEL</span>
                      <span>{cvData.phone}</span>
                    </a>
                    <motion.button
                      type="button"
                      className="contact-copy-btn no-print"
                      onClick={() => handleCopy(cvData.phone, 'phone')}
                      whileTap={{ scale: 0.92 }}
                      aria-label="Copy phone number"
                      title="Copy phone number"
                    >
                      <PillarIcon type={copiedField === 'phone' ? 'check' : 'copy'} />
                      <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="hero__visual">
                <div className="hero__portrait-row">
                  <div className="hero__photo-frame">
                    <img
                      src={profilePhoto}
                      alt={cvData.name}
                      width="136"
                      height="136"
                      className="hero__photo"
                    />
                  </div>
                  <div className="hero__badge-stack">
                    <div className="hero__mini-stat">
                      <span className="hero__mini-stat-code">ROLE // DUAL-HAT</span>
                      <strong>Line Manager + Full-Time ODC Lead</strong>
                    </div>
                    <div className="hero__mini-stat">
                      <span className="hero__mini-stat-code">CREDENTIALS</span>
                      <strong>IIBA CBDA · IELTS 8.0 · MSc Distinction</strong>
                    </div>
                  </div>
                </div>

                <HeroIllustration onSelectLens={handleSelectLens} />
              </div>
            </div>

            {/* 5-Metric Blueprint Telemetry Strip */}
            <div className="telemetry-strip" aria-label="Executive Scope Telemetry">
              {cvData.telemetry.map((item) => (
                <TelemetryCounter
                  key={item.id}
                  item={item}
                  isActiveLens={activeLens === item.lens}
                  onSelectLens={handleSelectLens}
                />
              ))}
            </div>
          </motion.section>

          {/* ZONE 2: 5-Pillar Operating Model (Asymmetric Bento Grid) */}
          <motion.section
            id="operating-model"
            className="cv-section"
            aria-labelledby="heading-operating-model"
            {...sectionReveal}
          >
            <div className="cv-section__header">
              <div className="cv-section__title-group">
                <span className="cv-section__index">SECTION // 01</span>
                <h2 id="heading-operating-model" className="cv-section__title">
                  Executive Operating Model — 5 Core Pillars
                </h2>
              </div>
              <span className="cv-section__tag">
                Leadership · Delivery · SWAT · Pre-Sales · AI Harness
              </span>
            </div>

            <div className="pillar-bento">
              {cvData.pillars.map((pillar) => {
                const isMatched =
                  activeLens === 'all' || pillar.lens === activeLens;
                const isSelected = activeLens === pillar.lens;

                return (
                  <motion.article
                    key={pillar.id}
                    layout
                    className={`pillar-card ${pillar.wide ? 'pillar-card--wide' : ''} ${
                      isSelected ? 'pillar-card--active' : ''
                    } ${!isMatched ? 'pillar-card--dimmed' : ''}`}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <header className="pillar-card__header">
                      <div className="pillar-card__meta">
                        <span className="pillar-card__code">{pillar.specCode}</span>
                        <span className="pillar-card__badge">{pillar.badge}</span>
                      </div>
                      <button
                        type="button"
                        className="pillar-card__lens-btn no-print"
                        onClick={() =>
                          handleSelectLens(isSelected ? 'all' : pillar.lens)
                        }
                        title={`Filter CV by ${pillar.title}`}
                      >
                        <PillarIcon type={pillar.iconType} />
                        <span>{isSelected ? 'Showing Lens' : 'Focus Lens'}</span>
                      </button>
                    </header>

                    <h3 className="pillar-card__title">{pillar.title}</h3>
                    <p className="pillar-card__desc">{pillar.description}</p>

                    {pillar.harnessStages && (
                      <HarnessPipeline stages={pillar.harnessStages} />
                    )}
                  </motion.article>
                );
              })}
            </div>
          </motion.section>

          {/* ZONE 3: Synchronized 2D Experience Matrix */}
          <motion.section
            id="experience"
            className="cv-section"
            aria-labelledby="heading-experience"
            {...sectionReveal}
          >
            <div className="cv-section__header">
              <div className="cv-section__title-group">
                <span className="cv-section__index">SECTION // 02</span>
                <h2 id="heading-experience" className="cv-section__title">
                  Experience — 2D Progression &amp; Workstream Architecture
                </h2>
              </div>
              <span className="cv-section__tag">
                Dimension 1 (Role Spine) × Dimension 2 (Workstream Tracks)
              </span>
            </div>

            {/* NashTech 2D Matrix */}
            <div className="company-block">
              <div className="company-banner">
                <div>
                  <h3 className="company-banner__title">{cvData.nashtech.company}</h3>
                  <div className="company-banner__org">{cvData.nashtech.location}</div>
                </div>
                <span className="company-banner__period">{cvData.nashtech.period}</span>
              </div>

              <div className="experience-matrix">
                {/* Dimension 1: Sticky Left Role Progression Spine */}
                <aside className="spine-rail" aria-label="Role Progression Spine">
                  <div className="dimension-panel">
                    <div className="dimension-panel__head">
                      <span className="dimension-label">
                        Dimension 1 · Role Progression
                      </span>
                      <span className="dimension-hint no-print">
                        Click era to filter tracks
                      </span>
                    </div>

                    <ol className="spine">
                      {cvData.nashtech.progression.map((step, index) => {
                        const isEraSelected = activeEra === step.id;
                        const isEraMatched =
                          !activeEra || isEraSelected;

                        return (
                          <li
                            key={step.id}
                            className={`spine__item ${
                              isEraSelected ? 'spine__item--selected' : ''
                            } ${!isEraMatched ? 'spine__item--dimmed' : ''}`}
                          >
                            <span
                              className={`spine__dot ${
                                index === 0 || isEraSelected ? 'spine__dot--active' : ''
                              }`}
                              aria-hidden="true"
                            />
                            <button
                              type="button"
                              className="spine__button"
                              onClick={() =>
                                setActiveEra((prev) =>
                                  prev === step.id ? null : step.id
                                )
                              }
                              aria-pressed={isEraSelected}
                            >
                              <div className="spine__meta-row">
                                <span className="spine__code">{step.code}</span>
                                <span className="spine__duration">{step.duration}</span>
                              </div>
                              <div className="spine__title">{step.title}</div>
                              <div className="spine__period">{step.period}</div>
                              <p className="spine__summary">{step.summary}</p>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </aside>

                {/* Dimension 2: Right Column Full Workstream Cards */}
                <div className="tracks-column">
                  <div className="dimension-label dimension-label--tracks">
                    Dimension 2 · Core Workstream Tracks (Continuous &amp; Cross-Role)
                  </div>

                  <div className="track-list">
                    {cvData.nashtech.tracks.map((track) => {
                      const matchingRows = track.highlights.filter(isRowHighlighted);
                      const isTrackDimmed =
                        isFilteringActive && matchingRows.length === 0;

                      return (
                        <motion.article
                          key={track.id}
                          layout
                          className={`track-card ${
                            isTrackDimmed ? 'track-card--dimmed' : ''
                          }`}
                        >
                          <header className="track-card__header">
                            <div className="track-card__title-row">
                              <span className="track-card__code">{track.specCode}</span>
                              <h4 className="track-card__title">{track.title}</h4>
                            </div>
                            <div className="badge-row">
                              {track.badges.map((badge) => (
                                <span
                                  key={badge.label}
                                  className={`meta-badge ${
                                    badge.accent ? 'meta-badge--accent' : ''
                                  }`}
                                >
                                  {badge.label}
                                </span>
                              ))}
                            </div>
                          </header>

                          {track.context && (
                            <p className="track-card__context">{track.context}</p>
                          )}

                          <div className="spec-rows">
                            {track.highlights.map((item) => {
                              const matched = isRowHighlighted(item);
                              const activelySpotlit = isFilteringActive && matched;

                              return (
                                <motion.div
                                  key={item.id}
                                  layout
                                  className={`spec-row ${
                                    activelySpotlit ? 'spec-row--highlighted' : ''
                                  } ${!matched ? 'spec-row--dimmed' : ''}`}
                                >
                                  <div className="spec-row__lead-col">
                                    <div className="spec-row__lead">{item.lead}</div>
                                    <span className="spec-row__era">{item.eraTag}</span>
                                  </div>
                                  <div className="spec-row__body-col">
                                    <p className="spec-row__text">{item.text}</p>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Earlier Chronological Experience */}
            {cvData.earlierExperience.map((item) => (
              <div key={item.id} className="role-block">
                <div className="role-block__top">
                  <div>
                    <div className="track-card__title-row">
                      <span className="track-card__code">{item.specCode}</span>
                      <h3 className="role-block__title">{item.title}</h3>
                    </div>
                    <div className="role-block__org">{item.organization}</div>
                  </div>
                  <span className="company-banner__period">{item.period}</span>
                </div>

                {item.project && (
                  <p className="role-block__project">{item.project}</p>
                )}

                <div className="spec-rows">
                  {item.highlights.map((point) => {
                    const matched = isRowHighlighted(point);
                    const activelySpotlit = isFilteringActive && matched;

                    return (
                      <div
                        key={point.id}
                        className={`spec-row ${
                          activelySpotlit ? 'spec-row--highlighted' : ''
                        } ${!matched ? 'spec-row--dimmed' : ''}`}
                      >
                        <div className="spec-row__lead-col">
                          <div className="spec-row__lead">{point.lead}</div>
                          <span className="spec-row__era">{point.eraTag}</span>
                        </div>
                        <div className="spec-row__body-col">
                          <p className="spec-row__text">{point.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.section>

          {/* ZONE 4: Competency Bento Matrix & Interactive Skill X-Ray */}
          <motion.section
            id="skills"
            className="cv-section"
            aria-labelledby="heading-skills"
            {...sectionReveal}
          >
            <div className="cv-section__header">
              <div className="cv-section__title-group">
                <span className="cv-section__index">SECTION // 03</span>
                <h2 id="heading-skills" className="cv-section__title">
                  Skills &amp; Tooling — Interactive Competency Matrix
                </h2>
              </div>
              <span className="cv-section__tag">
                Click any tag to X-Ray Experience evidence
              </span>
            </div>

            <div className="skill-bento">
              {cvData.skillGroups.map((group) => {
                const isGroupMatched =
                  activeLens === 'all' || group.lenses.includes(activeLens);

                return (
                  <div
                    key={group.category}
                    className={`skill-card skill-card--${group.bentoSpan} ${
                      !isGroupMatched && !selectedSkill ? 'skill-card--dimmed' : ''
                    }`}
                  >
                    <div className="skill-card__head">
                      <span className="skill-card__code">{group.specCode}</span>
                      <h3 className="skill-card__title">{group.category}</h3>
                    </div>

                    <ul className="tag-list">
                      {group.items.map((skill) => {
                        const isSkillSelected = selectedSkill === skill;
                        return (
                          <li key={skill}>
                            <motion.button
                              type="button"
                              className={`tech-tag ${
                                isSkillSelected ? 'tech-tag--active' : ''
                              }`}
                              onClick={() => handleSelectSkill(skill)}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.96 }}
                              aria-pressed={isSkillSelected}
                            >
                              <span>{skill}</span>
                            </motion.button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Credentials, Education, Honors & Languages */}
          <motion.section
            id="credentials"
            className="cv-section"
            aria-labelledby="heading-credentials"
            {...sectionReveal}
          >
            <div className="cv-section__header">
              <div className="cv-section__title-group">
                <span className="cv-section__index">SECTION // 04</span>
                <h2 id="heading-credentials" className="cv-section__title">
                  Credentials, Education &amp; Recognition
                </h2>
              </div>
              <span className="cv-section__tag">Verified Qualifications</span>
            </div>

            <div className="credentials-grid">
              <div className="cred-box">
                <h3 className="cred-box__heading">Licenses &amp; Certifications</h3>
                <ul className="cred-list">
                  {cvData.certifications.map((cert) => (
                    <li key={cert.name} className="cred-list__item">
                      <div className="cred-list__title">
                        {cert.url ? (
                          <a href={cert.url} target="_blank" rel="noreferrer">
                            {cert.name} ↗
                          </a>
                        ) : (
                          cert.name
                        )}
                      </div>
                      <div className="cred-list__meta">
                        {cert.issuer} · Issued {cert.issued}
                        {cert.credentialId ? ` · Credential ID ${cert.credentialId}` : ''}
                      </div>
                      {cert.skills && (
                        <div className="cred-list__sub">{cert.skills}</div>
                      )}
                    </li>
                  ))}
                </ul>

                <h3 className="cred-box__heading cred-box__heading--spaced">
                  Honors &amp; Awards
                </h3>
                <ul className="cred-list">
                  {cvData.awards.map((award) => (
                    <li key={award.title} className="cred-list__item">
                      <div className="cred-list__title">{award.title}</div>
                      <div className="cred-list__meta">{award.detail}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cred-box">
                <h3 className="cred-box__heading">Education</h3>
                <ul className="cred-list">
                  {cvData.education.map((edu) => (
                    <li key={edu.school} className="cred-list__item">
                      <div className="cred-list__title">{edu.school}</div>
                      <div className="cred-list__sub">{edu.degree}</div>
                      <div className="cred-list__meta">
                        {edu.period} · {edu.detail}
                      </div>
                    </li>
                  ))}
                </ul>

                <h3 className="cred-box__heading cred-box__heading--spaced">
                  Languages
                </h3>
                <ul className="cred-list">
                  {cvData.languages.map((lang) => (
                    <li key={lang.name} className="cred-list__item">
                      <div className="cred-list__title">{lang.name}</div>
                      <div className="cred-list__meta">{lang.level}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="footer no-print">
          <span>Architectural Blueprint Design System · Web Interactive + A4 Print</span>
          <span>Ngoc Khanh Chu · NashTech Hanoi</span>
        </footer>
      </div>
    </MotionConfig>
  );
}
