export const cvData = {
  name: 'Ngoc Khanh Chu',
  role: 'BA Team Manager',
  company: 'NashTech',
  location: 'Hanoi, Vietnam',
  phone: '+84 869 628 692',
  phoneHref: 'tel:+84869628692',
  email: 'khanhcn.299@gmail.com',
  linkedin: 'https://www.linkedin.com/in/khanhchungoc/',
  linkedinLabel: 'khanhchungoc',

  summary: [
    'Business Analyst Manager with 10+ years in financial services, mainly international insurance and global asset management.',
    'Leads a 23-BA department in Hanoi: BA standards, project recovery, pre-sales, and AI‑native BA workflows.',
    'In parallel, works full-time as a Delivery BA Lead, covering both system integration and business functionality.',
  ],

  timeline: [
    {
      id: 'tl-bam',
      company: 'NashTech',
      companyMeta: 'Hanoi · Oct 2017 - Present',
      isCompanyStart: true,
      period: 'May 2024 - Present',
      role: 'Hanoi BA Manager & BA Lead',
      badge: '23-BA Department',
      icon: 'users',
      trackTitle: 'BA Department Leadership',
      bullets: [
        {
          lead: 'Team Management:',
          text: 'Lead 23 BAs while staying on full-time delivery. Set BA review standards, review deliverables side-by-side, mentor junior BAs to independence, and run KPIs and career progression.',
        },
        {
          lead: 'Project Recovery (SWAT):',
          text: 'Step into at-risk projects across the company. Audit requirement quality and work with solution architects, PMs, and engineering leads to clarify scope and system boundaries; coach teams on AI adoption.',
        },
        {
          lead: 'Staffing & Hiring:',
          text: 'Plan workload and staffing with the Resource Management Office (RMO); lead BA hiring, Fresher bootcamps, and QA-to-BA cross-skilling.',
        },
        {
          lead: 'Pre-Sales:',
          text: 'Support bids across business domains: turn client problems into MVP scope, build interactive prototypes, and estimate BA effort.',
        },
        {
          lead: 'BA AI Workflow & Harness:',
          text: 'Built an internal BA workflow, usable by BAs and AI agents, that covers the full BA lifecycle with Definition of Ready (DoR) gates between stages:',
          subBullets: [
            {
              lead: 'Discovery & Analysis:',
              text: 'project/product knowledge bases, stakeholder interviews, requirement elicitation and analysis.',
            },
            {
              lead: 'Specification & Design:',
              text: 'epics, user stories, UI prototypes, system diagrams, and API specs.',
            },
            {
              lead: 'Developer Handoff:',
              text: 'DoR-checked specs and project context for engineering.',
            },
          ],
          tagsLabel: 'Design principles',
          tags: [
            'Human-owned decisions',
            'Fast daily operation',
            'Token optimization',
            'Monitoring & improvement loop',
          ],
        },
      ],
    },
    {
      id: 'tl-insurtech',
      company: 'NashTech',
      period: 'Mar 2021 - Present',
      role: 'Senior BA → BA Lead',
      badge: 'UK Insurance · Concurrent',
      icon: 'shield',
      trackTitle: 'UK Non-Life Insurtech Platform (Top-10 UK Insurance Broker)',
      bullets: [
        {
          lead: 'Delivery BA Lead (2024 - Present):',
          text: 'Full-time on delivery alongside department management. Write epics, user stories, API specs, and E2E automation scenarios; maintain the project knowledge base; roll out BA AI workflows; review team output and track progress.',
        },
        {
          lead: 'Account Growth & Proxy PO (2021 - 2024):',
          text: 'Helped grow the account from ~20 to 40+ members. As Proxy PO, worked with client product and delivery leads on release priorities, functional slicing, and backlog traceability.',
        },
        {
          lead: 'Quote & Buy Journeys:',
          text: 'Defined the multi-brand Quote & Buy journeys (~20 brand/product combinations) behind a team result of conversion up 200%, cost per quote down 75%, and new launches cut from 6 months to weeks.',
        },
        {
          lead: 'Platform Services & APIs:',
          text: "Agreed microservice boundaries and API contracts with solution architects across the platform's core services (such as policy, payment, vehicle, and address), shared by B2B partners, Quote & Buy, and the self-service portal.",
        },
        {
          lead: 'UI Design System:',
          text: 'Defined component scope, documentation, and the designer-developer workflow for a WCAG AA UI Design System shared by both portals, with built-in analytics and A/B testing.',
        },
        {
          lead: 'Delivery Automation (pre-AI):',
          text: 'Built automated Excel project reporting and Jira workflow and monitoring rules for cross-team handoffs.',
        },
      ],
    },
    {
      id: 'tl-aum',
      company: 'NashTech',
      period: 'Oct 2017 - Feb 2021',
      role: 'Business Analyst',
      badge: 'Global Asset Management',
      icon: 'database',
      trackTitle: 'Enterprise Reporting & EDW Migration (Top-50 Global AUM)',
      bullets: [
        {
          lead: 'Enterprise Reporting:',
          text: 'Delivered custom, internal, and external financial reports. Elicited reporting logic from stakeholders, migrated and automated reports, reconciled data discrepancies and trial-balance breaks, triaged defects, and provided L3 incident support.',
        },
        {
          lead: 'EDW Migration (Oracle → SQL Server):',
          text: 'Reverse-engineered the legacy Oracle DW (documentation, data structures, data meanings) by interviewing stakeholders and upstream/downstream data owners; wrote ETL specs, source-to-target mappings, stored procedure specs, and datamart specs for the SQL Server migration.',
        },
        {
          lead: 'Global Coordination:',
          text: 'Coordinated requirement sign-offs, QA test case reviews, and BA onboarding on a ~100-member account across 5 time zones (UK, US, Taiwan, India, Vietnam).',
        },
      ],
    },
    {
      id: 'tl-etc',
      company: 'ETC Technology Systems JSC',
      companyMeta: 'Hanoi · Aug 2014 - Sep 2016',
      isCompanyStart: true,
      period: 'Aug 2014 - Sep 2016',
      role: 'Project Coordinator / BA',
      badge: 'Commercial Banking',
      icon: 'building',
      trackTitle: 'Collateral & Credit Limit Management System (Commercial Bank)',
      bullets: [
        {
          lead: 'Functional Specs (URD/FSD):',
          text: 'Analyzed User Requirement Documents (URDs), wrote Functional Specification Documents (FSDs), and obtained client sign-off on core banking interface mappings.',
        },
        {
          lead: 'Scope & Coordination:',
          text: 'Agreed scope boundaries with bank stakeholders, tracked milestones, cleared documentation bottlenecks, and coordinated resources for each phase.',
        },
        {
          lead: 'Testing:',
          text: 'Ran functional testing and automated regression suites (Sahi) before banking UAT sign-off.',
        },
      ],
    },
  ],

  sideProjects: [
    {
      name: 'craft-agent-skill',
      url: 'https://github.com/khanhchungoc/craft-agent-skill',
      description:
        'Open-source framework for building, auditing, and refining AI agents and skills across runtimes, with shared principles, templates, and a feedback loop.',
    },
    {
      name: 'ultimate-diagraming-skill',
      url: 'https://github.com/khanhchungoc/ultimate-diagraming-skill',
      description:
        'Open-source tool that generates lightweight, shareable HTML diagrams (swimlane flowcharts, sequence diagrams) that people and AI tools can both edit.',
    },
  ],

  skillGroups: [
    {
      category: 'Methodologies & AI Stack',
      icon: 'cpu',
      items: [
        'SAFe · Agile · Scrum · Kanban',
        'AWS AI-DLC',
        'VS Code · GitHub Copilot · Claude Code · Codex · Antigravity',
      ],
    },
    {
      category: 'Modeling, Data & Delivery Tools',
      icon: 'compass',
      items: [
        'Camunda (BPMN) · Visio',
        'Figma · Balsamiq',
        'Postman · SoapUI',
        'SQL · Power BI',
        'Jira · Confluence · Azure DevOps',
        'Microsoft Office Suite',
      ],
    },
  ],

  education: [
    {
      school: 'Hasselt University (Belgium) · Graduated with Distinction',
      degree: "Master's Degree in Business Process Management",
      period: '2016 - 2017',
    },
    {
      school: 'Banking Academy of Vietnam',
      degree: "Bachelor's Degree in Corporate Finance",
      period: '2010 - 2014',
    },
  ],

  certifications: [
    {
      name: 'IIBA® Certification in Business Data Analytics',
      period: '2023',
      url: 'https://badges.iiba.org/8d9064d9-b989-4437-ab2e-67056d963cc5',
    },
    {
      name: 'IELTS Academic · Overall Band 8.0',
    },
    {
      name: 'BA of the Year 2019 & 2018 (Nomination)',
      period: 'NashTech',
    },
  ],
};
