import { MotionConfig, motion } from 'motion/react';
import { cvData } from './data/cvData';
import { HeroIllustration, PillarIcon } from './components/Illustrations';
import profilePhoto from './assets/profile.jpg';

const sectionReveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.35, ease: 'easeOut' },
};

function PillarColumn({ heading, iconType, items }) {
  return (
    <motion.div
      className="exec-core__box"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="exec-core__heading">
        {heading}
        <PillarIcon type={iconType} />
      </h3>
      {items.map((pillar) => (
        <div key={pillar.id} className="exec-core__item">
          <h4 className="exec-core__sub">{pillar.title}</h4>
          <p className="exec-core__desc">{pillar.description}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function App() {
  const managementPillars = cvData.pillars.slice(0, 2);
  const domainPillars = cvData.pillars.slice(2, 4);

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-shell">
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
          {/* 1. Full-width Warm Cream Header Banner */}
          <motion.section
            className="hero"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
          >
            <div>
              <p className="hero__eyebrow">
                {cvData.company} · {cvData.location}
              </p>
              <h1 className="hero__name">{cvData.name}</h1>
              <p className="hero__title">{cvData.role}</p>
              <p className="hero__quote">“{cvData.quote}”</p>
              <p className="hero__summary">{cvData.summary}</p>
              <div className="hero__meta">
                <a href={cvData.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/khanhchungoc
                </a>
                <span aria-hidden="true">·</span>
                <a href={`mailto:${cvData.email}`}>{cvData.email}</a>
                <span aria-hidden="true">·</span>
                <a href={cvData.phoneHref}>{cvData.phone}</a>
                <span aria-hidden="true">·</span>
                <span>DOB: {cvData.dob}</span>
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero__photo-frame">
                <img
                  src={profilePhoto}
                  alt={cvData.name}
                  className="hero__photo"
                />
              </div>
              <div className="hero__illustration">
                <HeroIllustration />
              </div>
            </div>
          </motion.section>

          {/* 2. 2-Column Executive Core Summary Block */}
          <motion.section className="cv-section" {...sectionReveal}>
            <div className="cv-section__header">
              <h2 className="cv-section__title">Executive Core</h2>
              <span className="cv-section__tag">Leadership &amp; Domain Scope</span>
            </div>

            <div className="exec-core">
              <PillarColumn
                heading="Management, AI & Pre-Sales Scope"
                iconType="team"
                items={managementPillars}
              />
              <PillarColumn
                heading="Domain & Architecture Stack"
                iconType="architecture"
                items={domainPillars}
              />
            </div>
          </motion.section>

          {/* 3. 2D Vertical Experience Architecture (Option 1) */}
          <motion.section className="cv-section" {...sectionReveal}>
            <div className="cv-section__header">
              <h2 className="cv-section__title">Experience</h2>
              <span className="cv-section__tag">2D Progression &amp; Workstreams</span>
            </div>

            {/* NashTech Company Header */}
            <div className="company-block">
              <div className="role-block__top">
                <div>
                  <h3 className="role-block__title">{cvData.nashtech.company}</h3>
                  <div className="role-block__org">{cvData.nashtech.location}</div>
                </div>
                <span className="cv-section__tag">{cvData.nashtech.period}</span>
              </div>

              {/* Dimension 1: Role Progression Spine */}
              <div className="dimension-panel">
                <div className="dimension-label">Dimension 1 · Role Progression Spine</div>
                <ol className="spine">
                  {cvData.nashtech.progression.map((step, index) => (
                    <li key={step.title} className="spine__item">
                      <span
                        className={`spine__dot ${index === 0 ? 'spine__dot--active' : ''}`}
                        aria-hidden="true"
                      />
                      <div className="spine__content">
                        <div className="spine__head">
                          <span className="spine__title">{step.title}</span>
                          <span className="cv-section__tag">{step.period}</span>
                        </div>
                        <p className="spine__summary">{step.summary}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Dimension 2: Full-Width Vertical Workstream Cards */}
              <div className="tracks-block">
                <div className="dimension-label">Dimension 2 · Core Workstream Tracks</div>
                <div className="track-list">
                  {cvData.nashtech.tracks.map((track) => (
                    <article key={track.id} className="track-card">
                      <header className="track-card__header">
                        <h4 className="track-card__title">{track.title}</h4>
                        <div className="badge-row">
                          {track.badges.map((badge) => (
                            <span
                              key={badge.label}
                              className={`meta-badge ${badge.accent ? 'meta-badge--accent' : ''}`}
                            >
                              {badge.label}
                            </span>
                          ))}
                        </div>
                      </header>

                      {track.context && (
                        <p className="track-card__context">{track.context}</p>
                      )}

                      <ul className="role-block__list">
                        {track.highlights.map((item) => (
                          <li key={item.lead}>
                            <strong>{item.lead}:</strong> {item.text}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Earlier Experience */}
            {cvData.earlierExperience.map((item) => (
              <div key={item.title} className="role-block">
                <div className="role-block__top">
                  <div>
                    <h3 className="role-block__title">{item.title}</h3>
                    <div className="role-block__org">{item.organization}</div>
                  </div>
                  <span className="cv-section__tag">{item.period}</span>
                </div>
                {item.project && <p className="role-block__project">{item.project}</p>}
                <ul className="role-block__list">
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>

          {/* 4. Grouped Competencies & Tooling */}
          <motion.section className="cv-section" {...sectionReveal}>
            <div className="cv-section__header">
              <h2 className="cv-section__title">Skills &amp; Tools</h2>
              <span className="cv-section__tag">BA Manager Competency Map</span>
            </div>

            <div className="skill-groups">
              {cvData.skillGroups.map((group) => (
                <div key={group.category} className="skill-group">
                  <h3 className="skill-group__title">{group.category}</h3>
                  <ul className="tag-list">
                    {group.items.map((skill) => (
                      <li key={skill} className="tech-tag">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 5. Credentials, Education, Honors & Languages */}
          <motion.section className="cv-section" {...sectionReveal}>
            <div className="cv-section__header">
              <h2 className="cv-section__title">Credentials, Education &amp; Recognition</h2>
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
                            {cert.name}
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
                        <div className="cred-list__sub">Skills: {cert.skills}</div>
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

                <h3 className="cred-box__heading cred-box__heading--spaced">Languages</h3>
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
          Architectural Blueprint Design System · Built for Web &amp; A4 Print
        </footer>
      </div>
    </MotionConfig>
  );
}
