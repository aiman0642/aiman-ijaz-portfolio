import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, ExternalLink, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Project = {
  number: string;
  title: string;
  type: string;
  year: string;
  description: string;
  visual: string;
  detail: string;
  tech: string[];
};

type Certificate = {
  number: string;
  name: string;
  issuer: string;
  year: string;
  link: string;
};

// Replace the three URLs below with Aiman's real profiles when ready.
const profileLinks = {
  linkedin: 'https://www.linkedin.com/in/aiman-ijaz',
  github: 'https://github.com/aiman-ijaz',
  email: 'mailto:aiman.ijaz@gmail.com',
};

const projects: Project[] = [
  {
    number: '01',
    title: 'CampusConnect',
    type: 'Full-stack web application',
    year: '2024',
    description: 'A student event platform that helps campus communities discover, save, and organize what is happening around them.',
    visual: 'compiler',
    detail: 'CampusConnect was built to make fragmented campus event information easier to find. I designed the information architecture, implemented the responsive interface, and connected role-based event creation to a lightweight API.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
  },
  {
    number: '02',
    title: 'RouteWise',
    type: 'Data structures · Transit planner',
    year: '2023',
    description: 'A route planner that compares graph paths and explains the trade-off between speed, stops, and transfers.',
    visual: 'transit',
    detail: 'RouteWise turns graph traversal into an understandable interface. I implemented weighted shortest-path algorithms, built a visual route comparison, and focused on making technical results legible to a non-technical user.',
    tech: ['Python', 'Dijkstra', 'Graph theory', 'JavaScript'],
  },
  {
    number: '03',
    title: 'Focusboard',
    type: 'Productivity tool · UI engineering',
    year: '2023',
    description: 'A focused study workspace combining task planning, session timing, and simple progress feedback.',
    visual: 'study',
    detail: 'Focusboard started as a frontend engineering exercise and grew into a useful daily tool. It uses local persistence, keyboard-friendly interactions, and a small component system designed for clarity rather than feature overload.',
    tech: ['TypeScript', 'React', 'CSS', 'Local storage'],
  },
];

const skillGroups = [
  { label: 'Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'] },
  { label: 'Web / frameworks', skills: ['React', 'Node.js', 'Express', 'HTML & CSS', 'REST APIs'] },
  { label: 'Tools', skills: ['Git & GitHub', 'Figma', 'Postman', 'VS Code', 'Vercel'] },
  { label: 'Core CS', skills: ['Data structures', 'Algorithms', 'OOP', 'Databases', 'Computer networks'] },
];

const professionalCertificates: Certificate[] = [
  { number: '01', name: 'Meta Front-End Developer', issuer: 'Coursera / Meta', year: '2024', link: '#' },
  { number: '02', name: 'CS50x: Introduction to Computer Science', issuer: 'Harvard University', year: '2023', link: '#' },
  { number: '03', name: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', year: '2023', link: '#' },
];

const extracurricularCertificates: Certificate[] = [
  { number: '01', name: 'Hackathon Finalist', issuer: 'University Innovation Challenge', year: '2024', link: '#' },
  { number: '02', name: 'Community Tech Volunteer', issuer: 'Code for Community', year: '2023', link: '#' },
  { number: '03', name: 'Student Leadership Certificate', issuer: 'Computer Science Society', year: '2022', link: '#' },
];

function scrollToId(id: string, onDone?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  onDone?.();
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  return (
    <main className="site-shell">
      <header className="site-nav" data-testid="site-header">
        <div className="container-wide nav-inner">
          <button
            className="wordmark"
            type="button"
            onClick={() => scrollToId('top', () => setMenuOpen(false))}
            data-testid="button-home"
            aria-label="Back to top"
          >
            <span className="wordmark-mark" aria-hidden="true">AI</span>
            <span>Aiman Ijaz</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={23} strokeWidth={1.5} /> : <Menu size={23} strokeWidth={1.5} />}
          </button>
          <nav id="main-navigation" className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <button className="nav-link" type="button" onClick={() => scrollToId('projects', () => setMenuOpen(false))} data-testid="link-projects">Projects</button>
            <button className="nav-link" type="button" onClick={() => scrollToId('skills', () => setMenuOpen(false))} data-testid="link-skills">Skills</button>
            <button className="nav-link" type="button" onClick={() => scrollToId('about', () => setMenuOpen(false))} data-testid="link-about">About</button>
            <button className="nav-link" type="button" onClick={() => scrollToId('contact', () => setMenuOpen(false))} data-testid="link-contact">Contact</button>
            <a className="nav-link nav-cta" href={profileLinks.email} data-testid="link-start-a-conversation">Let's talk</a>
          </nav>
        </div>
      </header>

      <section className="hero container-wide" id="top" aria-labelledby="hero-title">
        <div className="hero-grid">
          <div className="stagger">
            <p className="hero-kicker"><span className="status-dot" aria-hidden="true" /> Computer Science student · Developer</p>
            <h1 className="display-xl hero-heading" id="hero-title">
              Aiman <em>Ijaz.</em>
            </h1>
            <p className="body-lg">I build reliable software with a clear interface and a curious mind.</p>
            <div className="hero-links" aria-label="Professional profile links">
              <a className="quick-link" href={profileLinks.linkedin} target="_blank" rel="noreferrer" data-testid="link-linkedin-hero">
                <Linkedin size={14} /> LinkedIn <ExternalLink size={12} />
              </a>
              <a className="quick-link" href={profileLinks.github} target="_blank" rel="noreferrer" data-testid="link-github-hero">
                <Github size={14} /> GitHub <ExternalLink size={12} />
              </a>
              <a className="quick-link" href={profileLinks.email} data-testid="link-gmail-hero">
                <Mail size={14} /> Gmail
              </a>
            </div>
          </div>
          <div className="hero-copy stagger">
            <div className="profile-placeholder" role="img" aria-label="Profile photo placeholder for Aiman Ijaz. Add your photo here." data-testid="profile-photo-placeholder">
              <div className="profile-placeholder-label">
                <span>Add your photo here</span>
                <span>Replace this placeholder<br />with a professional headshot.</span>
              </div>
            </div>
            <button className="text-link" type="button" onClick={() => scrollToId('projects')} data-testid="button-see-projects">
              Explore projects <ArrowDown size={14} />
            </button>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><i /> Scroll to explore</div>
      </section>

      <section className="section container-wide" id="projects" aria-labelledby="projects-title">
        <div className="section-heading reveal">
          <p className="eyebrow">01 / Projects</p>
          <div>
            <h2 className="display-lg" id="projects-title">Things I have built to learn by doing.</h2>
            <p>Selected academic and personal work. Each one is a chance to understand a system, make a useful interface, and ship something real.</p>
          </div>
        </div>
        <div className="project-list reveal" data-testid="list-projects">
          {projects.map((project) => (
            <button
              className="project-card"
              type="button"
              key={project.number}
              onClick={() => setSelectedProject(project)}
              data-testid={`button-project-${project.number}`}
              aria-label={`Read more about ${project.title}`}
            >
              <div className={`project-visual ${project.visual}`} aria-hidden="true" />
              <span className="project-num">{project.number}</span>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-meta">
                {project.type}<br />{project.year}<span className="project-arrow">↗</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="section navy-band" id="skills" aria-labelledby="skills-title">
        <div className="container-wide">
          <div className="skills-grid">
            <div className="reveal">
              <p className="eyebrow">02 / Skills</p>
              <h2 className="display-lg" id="skills-title">Tools for turning ideas into working software.</h2>
            </div>
            <div className="skills-list reveal" data-testid="list-skills">
              {skillGroups.map((group) => (
                <div className="skill-group" key={group.label}>
                  <span className="skill-group-label">{group.label}</span>
                  <div className="skill-group-list">
                    {group.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section container-wide" id="certificates" aria-labelledby="certificates-title">
        <div className="certificates-grid">
          <div className="reveal">
            <p className="eyebrow">03 / Certificates</p>
            <h2 className="display-lg" id="certificates-title">Proof of a habit of learning.</h2>
          </div>
          <div className="reveal">
            <div className="certificate-categories" data-testid="list-certificates">
              <div className="certificate-category">
                <h3 className="certificate-category-title">Professional & academic</h3>
                <div className="certificate-list" data-testid="list-professional-certificates">
                  {professionalCertificates.map((certificate) => (
                    <article className="certificate-item" key={certificate.number}>
                      <span className="certificate-index">{certificate.number}</span>
                      <div>
                        <h4>{certificate.name}</h4>
                        <p>{certificate.issuer}</p>
                        <a className="certificate-link" href={certificate.link} data-testid={`link-professional-certificate-${certificate.number}`}>
                          Add certificate link <ArrowUpRight size={11} />
                        </a>
                      </div>
                      <time className="certificate-year">{certificate.year}</time>
                    </article>
                  ))}
                </div>
              </div>
              <div className="certificate-category">
                <h3 className="certificate-category-title">Extracurricular</h3>
                <div className="certificate-list" data-testid="list-extracurricular-certificates">
                  {extracurricularCertificates.map((certificate) => (
                    <article className="certificate-item" key={certificate.number}>
                      <span className="certificate-index">{certificate.number}</span>
                      <div>
                        <h4>{certificate.name}</h4>
                        <p>{certificate.issuer}</p>
                        <a className="certificate-link" href={certificate.link} data-testid={`link-extracurricular-certificate-${certificate.number}`}>
                          Add certificate link <ArrowUpRight size={11} />
                        </a>
                      </div>
                      <time className="certificate-year">{certificate.year}</time>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <p className="certificate-add">Editable lists — add study-related certificates to <code>professionalCertificates</code> and activities to <code>extracurricularCertificates</code>.</p>
          </div>
        </div>
      </section>

      <section className="section container-wide" id="about" aria-labelledby="about-title">
        <div className="about-grid">
          <div className="about-intro reveal">
            <p className="eyebrow">04 / About & education</p>
            <h2 className="display-lg" id="about-title">Still learning. Already building.</h2>
          </div>
          <div className="reveal">
            <p className="about-copy">I am a <em>Computer Science student</em> who enjoys the space between a hard problem and a useful answer.</p>
            <p className="about-detail">My work combines software fundamentals with an eye for thoughtful product experiences. I am currently looking for internships and junior opportunities where I can contribute to a real team, strengthen my engineering practice, and keep asking good questions. The details below are ready to replace with my current academic information.</p>
            <div className="education-card" data-testid="card-education">
              <p className="eyebrow">Education</p>
              <h3>Bachelor of Science in Computer Science</h3>
              <p>University name · Expected graduation 2026<br />Relevant study: algorithms, databases, software engineering, web development.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="container-wide">
          <p className="eyebrow">05 / Contact</p>
          <h2 className="display-xl" id="contact-title">Let's build something useful.</h2>
          <p className="body-lg" style={{ maxWidth: '25rem' }}>Open to internships, junior roles, and thoughtful collaborations.</p>
          <a className="contact-link" href={profileLinks.email} data-testid="link-gmail-contact">
            <Mail size={16} /> aiman.ijaz@gmail.com <ArrowUpRight size={17} />
          </a>
          <div className="contact-orbit" aria-hidden="true" />
          <footer className="footer">
            <p className="footer-copy">© 2025 Aiman Ijaz — Computer Science student & developer</p>
            <div className="footer-links" aria-label="Professional profile links">
              <a href={profileLinks.linkedin} target="_blank" rel="noreferrer" data-testid="link-linkedin-footer">LinkedIn</a>
              <a href={profileLinks.github} target="_blank" rel="noreferrer" data-testid="link-github-footer">GitHub</a>
              <a href={profileLinks.email} data-testid="link-gmail-footer">Gmail</a>
            </div>
          </footer>
        </div>
      </section>

      {selectedProject && (
        <div className="project-dialog-backdrop" role="presentation" onMouseDown={() => setSelectedProject(null)}>
          <article
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
            data-testid="dialog-project-detail"
          >
            <button className="dialog-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details" data-testid="button-close-project">×</button>
            <p className="eyebrow">{selectedProject.type} · {selectedProject.year}</p>
            <h2 id="project-dialog-title">{selectedProject.title}</h2>
            <p>{selectedProject.detail}</p>
            <div className="dialog-tags">
              {selectedProject.tech.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </article>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;