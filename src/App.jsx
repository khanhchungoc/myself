import { MotionConfig, motion } from 'motion/react';
import { cvData } from './data/cvData';
import { HeroIllustration, PillarIcon } from './components/Illustrations';

const sectionReveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function App() {
  const managementPillars = cvData.pillars.slice(0, 2);
  const domainPillars = cvData.pillars.slice(2, 4);

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-shell">
        {/* Web-only action bar */}
        <motion.header
          className="action-bar no-print"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="action-bar__status">
            <motion.span
              className="status-dot"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {cvData.location} · Architectural Blueprint CV
          </span>

          <div className="action-bar__buttons">
            <motion.a
              href="./cv.pdf"
              download="Ngoc-Khanh-Chu-CV.pdf"
              className="btn"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Download PDF
            </motion.a>
            <motion.button
              type="button"
              onClick={() => window.print()}
              className="btn btn--primary"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Print / Save PDF
            </motion.button>
          </div>
        </motion.header>

        <main>
          {/* Full-width Warm Cream Header Banner */}
          <motion.section
            className="hero"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div>
              <p className="hero__eyebrow">
                {cvData.company} · {cvData.location}
              </p>
              <h1 className="hero__name">{cvData.name}</h1>
              <p className="hero__title">{cvData.role}</p>
              <p className="hero__summary">{cvData.summary}</p>
              <div className="hero__meta">
                <a href={cvData.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/khanhchungoc
                </a>
                <span>·</span>
                <span>Email: {cvData.email}</span>
              </div>
            </div>

            <div className="hero__illustration">
              <HeroIllustration />
            </div>
          </motion.section>

          {/* 2-Column Executive Core Summary Block */}
          <motion.section className="cv-section" {...sectionReveal}>
            <div className="cv-section__header">
              <h2 className="cv-section__title">Executive Core</h2>
              <span className="cv-section__tag">Leadership &amp; Domain Scope</span>
            </div>

            <div className="exec-core">
              <motion.div
                className="exec-core__box"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="exec-core__heading">
                  Management &amp; Pre-Sales Scope
                  <PillarIcon type="team" />
                </h3>
                {managementPillars.map((pillar) => (
                  <div key={pillar.id} className="exec-core__item">
                    <h4 className="exec-core__sub">{pillar.title}</h4>
                    <p className="exec-core__desc">{pillar.description}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="exec-core__box"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="exec-core__heading">
                  Domain &amp; Architecture Stack
                  <PillarIcon type="architecture" />
                </h3>
                {domainPillars.map((pillar) => (
                  <div key={pillar.id} className="exec-core__item">
                    <h4 className="exec-core__sub">{pillar.title}</h4>
                    <p className="exec-core__desc">{pillar.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* Single Full-Width Chronological Experience */}
          <motion.section className="cv-section" {...sectionReveal}>
            <div className="cv-section__header">
              <h2 className="cv-section__title">Experience</h2>
              <span className="cv-section__tag">Chronological History</span>
            </div>

            {cvData.experience.map((item) => (
              <div key={item.title} className="role-block">
                <div className="role-block__top">
                  <div>
                    <h3 className="role-block__title">{item.title}</h3>
                    <div className="role-block__org">{item.organization}</div>
                  </div>
                  <span className="cv-section__tag">{item.period}</span>
                </div>

                <ul className="role-block__list">
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>

          {/* Technical & Metric Tags */}
          <motion.section className="cv-section" {...sectionReveal}>
            <div className="cv-section__header">
              <h2 className="cv-section__title">Technical &amp; Domain Standards</h2>
              <span className="cv-section__tag">Core Competencies</span>
            </div>

            <ul className="tag-list">
              {cvData.skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  className="tech-tag"
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.22, delay: index * 0.03 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </main>

        <footer className="footer no-print">
          Architectural Blueprint Design System · Built for Web &amp; A4 Print
        </footer>
      </div>
    </MotionConfig>
  );
}
