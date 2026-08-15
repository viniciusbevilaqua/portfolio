import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  Terminal,
  Workflow,
  X,
} from 'lucide-react';
import {
  Link,
  Route,
  Router as WouterRouter,
  Switch,
  useLocation,
  useParams,
} from 'wouter';
import NotFound from '@/pages/not-found';

type Language = 'pt' | 'en';
type Localized = { pt: string; en: string };
type MaybeLocalized = string | Localized;

const queryClient = new QueryClient();

const personal = {
  name: 'Vinícius Bevilaqua',
  title: 'Computer Science Student / Java Developer',
  email: 'vinicius257500@gmail.com',
  phone: '(85) 98558-7004',
  phoneFull: '+5585985587004',
  linkedin: 'https://www.linkedin.com/in/vinicius-bevil%C3%A1qua-9a52522b0',
  github: 'https://github.com/viniciusbevilaqua',
  cv: '/assets/cv/cv-vinicius-bevilaqua.pdf',
};

const projects = [
  {
    id: 'accessibility-app',
    name: 'Accessibility App',
    type: { pt: 'Projeto Acadêmico', en: 'Academic Project' },
    description: {
      pt: 'Aplicativo mobile para identificação, avaliação e consulta de condições de acessibilidade em espaços urbanos. Desenvolvido em equipe de 5 estudantes de Ciência da Computação.',
      en: 'Mobile app for identifying, evaluating, and consulting accessibility conditions in urban spaces. Developed by a team of 5 Computer Science students.',
    },
    context: {
      pt: 'Um exercício de transformar uma necessidade urbana real em uma experiência mobile simples de consultar e alimentar. O projeto foi desenvolvido em equipe durante a graduação.',
      en: 'An exercise in turning a real urban need into a mobile experience that is simple to browse and contribute to. The project was built as a team during the degree.',
    },
    tech: ['JavaScript', 'React Native', 'Expo', 'Firebase'],
    contributions: { pt: 'Login · Ranking · Configurações · Integração geral', en: 'Login · Ranking · Settings · General integration' },
    note: { pt: 'Repositório público contém versão intermediária.', en: 'Public repository contains an intermediate version.' },
    highlights: {
      pt: ['Fluxos de autenticação e entrada', 'Ranking de contribuições', 'Avaliação de espaços urbanos', 'Integração geral do aplicativo'],
      en: ['Authentication and onboarding flows', 'Contribution ranking', 'Urban space evaluation', 'Overall application integration'],
    },
    github: 'https://github.com/viniciusbevilaqua/accessibility-app',
    image: '/assets/images/accessibility-app.svg',
  },
  {
    id: 'academic-mobility',
    name: 'Academic Mobility System',
    type: { pt: 'Projeto Acadêmico', en: 'Academic Project' },
    description: {
      pt: 'Sistema web para auxiliar estudantes no processo de candidatura a programas de intercâmbio e mobilidade acadêmica.',
      en: 'Web system to assist students in the application process for exchange and academic mobility programs.',
    },
    context: {
      pt: 'Uma interface web pensada para organizar um processo cheio de etapas: descobrir oportunidades, registrar dados e acompanhar uma candidatura de mobilidade acadêmica.',
      en: 'A web interface designed to organize a multi-step process: discover opportunities, enter details, and follow an academic mobility application.',
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    highlights: {
      pt: ['Fluxo de candidatura guiado', 'Persistência com LocalStorage', 'Interface responsiva', 'Organização de informações acadêmicas'],
      en: ['Guided application flow', 'LocalStorage persistence', 'Responsive interface', 'Structured academic information'],
    },
    github: 'https://github.com/viniciusbevilaqua/academic-mobility-system',
    image: '/assets/images/academic-mobility.svg',
  },
  {
    id: 'devlinks',
    name: 'DevLinks',
    type: { pt: 'Projeto Pessoal', en: 'Personal Project' },
    description: {
      pt: 'Projeto pessoal criado antes do início da faculdade, reunindo informações de perfil e links para redes sociais em uma única interface.',
      en: 'Personal project created before starting college, bringing together profile information and social media links in a single interface.',
    },
    context: {
      pt: 'Foi um dos primeiros espaços digitais em que experimentei construir uma presença própria na web. O resultado é direto: uma página de perfil com links essenciais.',
      en: 'One of the first digital spaces where I experimented with building a personal presence on the web. The result is direct: a profile page with essential links.',
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    highlights: {
      pt: ['Página de perfil centralizada', 'Links para redes sociais', 'Layout responsivo', 'Primeiro projeto pessoal publicado'],
      en: ['Centralized profile page', 'Social media links', 'Responsive layout', 'First published personal project'],
    },
    github: 'https://github.com/viniciusbevilaqua/projeto-devlinks',
    image: '/assets/images/devlinks.svg',
  },
] as const;

const learning = [
  { name: 'Java', icon: Braces, intensity: 'high', description: { pt: 'Linguagem principal de estudo e foco profissional atual', en: 'Main study language and current professional focus' } },
  { name: 'SQL', icon: Database, intensity: 'high', description: { pt: 'Banco de dados relacionais e consultas', en: 'Relational databases and queries' } },
  { name: 'JDBC', icon: Workflow, intensity: 'medium', description: { pt: 'Conexão Java com bancos de dados', en: 'Java database connectivity' } },
  { name: 'Spring Boot', icon: Terminal, intensity: 'medium', description: { pt: 'Framework para aplicações Java', en: 'Framework for Java applications' } },
  { name: { pt: 'Algoritmos', en: 'Algorithms' }, icon: Layers3, intensity: 'medium', description: { pt: 'Construção e análise de algoritmos', en: 'Algorithm design and analysis' } },
  { name: { pt: 'Estruturas de Dados', en: 'Data Structures' }, icon: Code2, intensity: 'medium', description: { pt: 'Estruturas de dados fundamentais e suas aplicações', en: 'Fundamental data structures and their applications' } },
] as const;

function text(value: MaybeLocalized, lang: Language) {
  return typeof value === 'string' ? value : value[lang];
}

function Shell({
  children,
  lang,
  setLang,
  dark,
  setDark,
}: {
  children: ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
  dark: boolean;
  setDark: (dark: boolean) => void;
}) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isProjects = location.startsWith('/projects');
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: lang === 'pt' ? 'Sobre' : 'About' },
    { href: '/projects', label: lang === 'pt' ? 'Projetos' : 'Projects' },
    { href: '/learning', label: lang === 'pt' ? 'Aprendendo' : 'Learning' },
    { href: '/cv', label: 'CV' },
  ];
  const navigateLabel = lang === 'pt' ? 'Navegação principal' : 'Main navigation';

  const changeTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('vinicius-theme', next ? 'dark' : 'light');
  };

  return (
    <div className="portfolio-shell">
      <header className="site-nav">
        <div className="nav-wrap">
          <Link href="/" className="brand-mark" aria-label="Vinícius Bevilaqua — Home" data-testid="link-brand">
            <span className="brand-dot">VB</span>
            <span className="brand-name">Vinícius Bevilaqua</span>
          </Link>
          <nav className="nav-links" aria-label={navigateLabel}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`nav-link ${(link.href === '/' ? location === '/' : link.href === '/projects' ? isProjects : location === link.href) ? 'active' : ''}`} aria-current={(link.href === '/' ? location === '/' : link.href === '/projects' ? isProjects : location === link.href) ? 'page' : undefined} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <button type="button" className="lang-btn" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} aria-label="Switch language" data-testid="button-language">
              {lang.toUpperCase()}
            </button>
            <button type="button" className="icon-btn" onClick={changeTheme} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} data-testid="button-theme">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button type="button" className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} data-testid="button-mobile-menu">
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
        <div className={`mobile-panel ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" onClick={() => setMobileOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase()}`}>
              {link.label}
            </Link>
          ))}
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Vinícius Bevilaqua</span>
        <div className="footer-links">
          <a href={personal.github} target="_blank" rel="noreferrer" data-testid="link-footer-github">GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn</a>
          <a href={`mailto:${personal.email}`} data-testid="link-footer-email">Email</a>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ lang }: { lang: Language }) {
  return (
    <main className="page-frame home-page" id="main">
      <section className="home-copy">
        <div className="home-kicker animate-rise"><span className="kicker-mark" /><span className="eyebrow">{lang === 'pt' ? 'Portfólio pessoal · Fortaleza, BR' : 'Personal portfolio · Fortaleza, BR'}</span></div>
        <h1 className="display-title home-title animate-rise delay-1">Vinícius<br /><em>Bevilaqua.</em></h1>
        <p className="body-copy home-intro animate-rise delay-2">{lang === 'pt' ? 'Estudante de Ciência da Computação e desenvolvedor Java em formação. Gosto de entender como as coisas funcionam — e de transformar essa curiosidade em software.' : 'Computer Science student and Java developer in progress. I like understanding how things work — and turning that curiosity into software.'}</p>
        <div className="home-cta-row animate-rise delay-3">
          <Link href="/projects" className="button-primary" data-testid="link-home-projects">{lang === 'pt' ? 'Explorar projetos' : 'Explore projects'} <ArrowUpRight size={15} /></Link>
          <Link href="/about" className="button-quiet" data-testid="link-home-about">{lang === 'pt' ? 'Conhecer o caminho' : 'See the journey'} <ArrowDownRight size={15} /></Link>
        </div>
        <div className="home-meta animate-rise delay-4"><span className="status-dot" /><span>{lang === 'pt' ? 'Construindo, estudando, iterando' : 'Building, studying, iterating'}</span></div>
      </section>
      <aside className="home-art animate-rise delay-2" aria-label="VB graphic">
        <div className="art-grid" />
        <div className="art-orbit" />
        <div className="art-card">
          <span className="art-initials">VB</span>
          <div className="art-caption"><span>JAVA / WEB</span><span>001—026</span></div>
        </div>
        <span className="side-note">A SMALL DIGITAL STUDIO</span>
      </aside>
    </main>
  );
}

function AboutPage({ lang }: { lang: Language }) {
  const paragraphs = lang === 'pt'
    ? ['Estudante de Ciência da Computação na Universidade de Fortaleza (UNIFOR), atualmente no 4º semestre, com interesse em desenvolvimento de software e foco atual em Java.', 'Comecei a graduação em fevereiro de 2025 e pretendo concluir o curso em dezembro de 2028. Atualmente estou aprofundando conhecimentos em Java, algoritmos, estruturas de dados, SQL e tecnologias do ecossistema Java.', 'Buscando minha primeira oportunidade profissional na área de Tecnologia da Informação.']
    : ['Computer Science student at University of Fortaleza (UNIFOR), currently in the 4th semester, with interest in software development and a current focus on Java.', 'Started my degree in February 2025 and expect to graduate in December 2028. Currently deepening my knowledge in Java, algorithms, data structures, SQL, and Java ecosystem technologies.', 'Seeking my first professional opportunity in Information Technology.'];
  return (
    <main className="page-frame" id="main">
      <div className="section-top animate-rise"><div><span className="eyebrow">01 / {lang === 'pt' ? 'O caminho' : 'The path'}</span><h1 className="headline" style={{ marginTop: 16 }}>{lang === 'pt' ? 'Sobre mim' : 'About me'}</h1></div><p className="body-copy">{lang === 'pt' ? 'Um pouco de contexto antes do código.' : 'A little context before the code.'}</p></div>
      <div className="about-layout">
        <section className="about-text animate-slide">
          {paragraphs.map((paragraph, index) => <p key={paragraph} data-testid={`text-about-${index}`}>{paragraph}</p>)}
        </section>
        <aside className="about-aside animate-rise delay-2">
          <div className="info-panel">
            <span className="info-label">{lang === 'pt' ? 'Formação' : 'Education'}</span>
            <h2 className="info-title">{lang === 'pt' ? 'Ciência da Computação' : 'Computer Science'}</h2>
            <p className="info-detail">Universidade de Fortaleza — UNIFOR</p>
            <p className="info-meta">2025 — 2028 · {lang === 'pt' ? '4º Semestre' : '4th Semester'}</p>
          </div>
          <div className="info-panel">
            <span className="info-label">{lang === 'pt' ? 'Curso adicional' : 'Additional course'}</span>
            <h2 className="info-title">Rocketseat</h2>
            <p className="info-detail">{lang === 'pt' ? 'Fundamentos da Programação Web' : 'Web Programming Fundamentals'}</p>
          </div>
          <div className="info-panel">
            <span className="info-label">{lang === 'pt' ? 'Tecnologias & ferramentas' : 'Technologies & tools'}</span>
            <div className="tools-cloud">{['Java', 'JavaScript', 'HTML', 'CSS', 'React Native', 'Expo', 'Node.js', 'Firebase', 'Git', 'GitHub', 'IntelliJ IDEA', 'VS Code'].map((tool) => <span className="tool" key={tool}>{tool}</span>)}</div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function ProjectCard({ project, index, lang }: { project: typeof projects[number]; index: number; lang: Language }) {
  return (
    <Link href={`/projects/${project.id}`} className={`project-card ${index === 0 ? 'featured' : ''} animate-rise delay-${index + 1}`} data-testid={`card-project-${project.id}`}>
      <div className="project-visual">
        <img src={project.image} alt={project.name} loading="lazy" data-testid={`img-project-${project.id}`} />
        <span className="project-number">0{index + 1}</span>
      </div>
      <div className="project-body">
        <span className="project-type">{text(project.type, lang)}</span>
        <h2 className="project-name">{project.name}</h2>
        <p className="project-description">{text(project.description, lang)}</p>
        <div className="project-footer">
          <div className="tech-list">{project.tech.map((tech) => <span className="tech" key={tech}>{tech}</span>)}</div>
          <span className="project-arrow" aria-hidden="true"><ChevronRight size={17} /></span>
        </div>
      </div>
    </Link>
  );
}

function ProjectsPage({ lang }: { lang: Language }) {
  return (
    <main className="page-frame" id="main">
      <div className="section-top animate-rise"><div><span className="eyebrow">02 / {lang === 'pt' ? 'Seleção' : 'Selected work'}</span><h1 className="headline" style={{ marginTop: 16 }}>{lang === 'pt' ? 'Projetos' : 'Projects'}</h1></div><p className="body-copy">{lang === 'pt' ? 'Projetos que registram perguntas, aprendizados e algumas boas horas de construção.' : 'Projects that record questions, lessons, and a good number of hours spent building.'}</p></div>
      <section className="project-grid" aria-label={lang === 'pt' ? 'Projetos selecionados' : 'Selected projects'}>
        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} lang={lang} />)}
      </section>
    </main>
  );
}

function ProjectDetailPage({ lang }: { lang: Language }) {
  const params = useParams<{ id: string }>();
  const project = projects.find((item) => item.id === params.id);
  if (!project) return <NotFound />;
  return (
    <main className="page-frame detail-page" id="main">
      <Link href="/projects" className="back-link" data-testid="link-back-projects"><ArrowLeft size={14} /> {lang === 'pt' ? 'Voltar para projetos' : 'Back to projects'}</Link>
      <section className="detail-hero animate-rise">
        <div><span className="eyebrow">{text(project.type, lang)}</span><h1 className="display-title detail-title" style={{ marginTop: 18 }}>{project.name}</h1></div>
        <div className="detail-visual"><img src={project.image} alt={`${project.name} preview`} data-testid={`img-detail-${project.id}`} /></div>
      </section>
      <section className="detail-body animate-rise delay-2">
        <div className="detail-copy">
          <h2>{lang === 'pt' ? 'A ideia por trás' : 'The idea behind it'}</h2>
          <p>{text(project.context, lang)}</p>
          <p>{text(project.description, lang)}</p>
          {'contributions' in project && project.contributions ? <p><strong>{lang === 'pt' ? 'Minha contribuição: ' : 'My contribution: '}</strong>{text(project.contributions, lang)}</p> : null}
          {'note' in project && project.note ? <p style={{ color: 'var(--coral)', fontFamily: 'var(--app-font-mono)', fontSize: 12 }}>{text(project.note, lang)}</p> : null}
        </div>
        <aside className="detail-aside">
          <h3>{lang === 'pt' ? 'Tecnologias' : 'Technologies'}</h3>
          <div className="tech-list">{project.tech.map((tech) => <span className="tech" key={tech}>{tech}</span>)}</div>
          <h3>{lang === 'pt' ? 'Destaques' : 'Highlights'}</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'grid', gap: 12 }}>
            {project.highlights[lang].map((highlight) => <li key={highlight} style={{ display: 'flex', gap: 9, color: 'var(--muted-foreground)', fontSize: 13, lineHeight: 1.4 }}><Check size={15} color="var(--mint)" style={{ flex: 'none', marginTop: 2 }} />{highlight}</li>)}
          </ul>
          <div className="detail-actions">
            <a href={project.github} className="button-primary" target="_blank" rel="noreferrer" data-testid={`link-github-${project.id}`}>GitHub <ExternalLink size={14} /></a>
          </div>
        </aside>
      </section>
    </main>
  );
}

function LearningPage({ lang }: { lang: Language }) {
  return (
    <main className="page-frame learning-page" id="main">
      <div className="learning-layout">
        <section className="learning-intro animate-slide">
          <span className="eyebrow">03 / {lang === 'pt' ? 'Agora' : 'Right now'}</span>
          <h1 className="headline">{lang === 'pt' ? <>Aprendendo<br /><em style={{ color: 'var(--coral)', fontStyle: 'normal' }}>atualmente.</em></> : <>Currently<br /><em style={{ color: 'var(--coral)', fontStyle: 'normal' }}>learning.</em></>}</h1>
          <p className="learning-note">{lang === 'pt' ? 'Uma parede de estudos em movimento. Cada assunto aqui é um convite para construir algo melhor no próximo projeto.' : 'A moving wall of studies. Each subject here is an invitation to build something better in the next project.'}</p>
          <div className="learning-foot">{lang === 'pt' ? 'foco atual → fundamentos sólidos' : 'current focus → solid foundations'}</div>
        </section>
        <section className="learning-board" aria-label={lang === 'pt' ? 'Tópicos de aprendizado' : 'Learning topics'}>
          {learning.map((item, index) => {
            const Icon = item.icon;
            const itemName = text(item.name, lang);
            return <article className={`learning-card animate-rise delay-${(index % 4) + 1}`} key={itemName} data-testid={`card-learning-${itemName.toLowerCase().replaceAll(' ', '-')}`}>
              <div className="learning-icon"><Icon size={20} /></div>
              <div className="intensity" aria-label={`${item.intensity} intensity`}>{[1, 2, 3].map((bar) => <i className={item.intensity === 'high' || bar < 3 ? 'active' : ''} key={bar} />)}</div>
              <h2 className="learning-name">{itemName}</h2>
              <p className="learning-description">{text(item.description, lang)}</p>
            </article>;
          })}
        </section>
      </div>
    </main>
  );
}

function CvPage({ lang }: { lang: Language }) {
  return (
    <main className="page-frame cv-page" id="main">
      <section className="cv-copy animate-slide">
        <span className="eyebrow">04 / Curriculum vitae</span>
        <h1 className="headline">{lang === 'pt' ? 'Tudo em uma página.' : 'Everything on one page.'}</h1>
        <p className="body-copy">{lang === 'pt' ? 'Veja meu currículo completo com informações sobre formação, competências e projetos.' : 'View my full resume with information about education, skills, and projects.'}</p>
        <div className="cv-actions">
          <a href={personal.cv} target="_blank" rel="noreferrer" className="button-primary" data-testid="link-view-cv"><BookOpen size={15} /> {lang === 'pt' ? 'Visualizar CV' : 'View CV'}</a>
          <a href={personal.cv} download className="button-quiet" data-testid="link-download-cv"><Download size={15} /> {lang === 'pt' ? 'Baixar CV' : 'Download CV'}</a>
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <a href={`mailto:${personal.email}`} className="back-link" style={{ margin: 0 }} data-testid="link-cv-email"><Mail size={14} /> {personal.email}</a>
          <a href={`tel:${personal.phoneFull}`} className="back-link" style={{ margin: 0 }} data-testid="link-cv-phone"><Phone size={14} /> {personal.phone}</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="back-link" style={{ margin: 0 }} data-testid="link-cv-linkedin"><Linkedin size={14} /> LinkedIn</a>
        </div>
      </section>
      <aside className="cv-sheet animate-rise delay-2" aria-label={lang === 'pt' ? 'Prévia do currículo' : 'Resume preview'}>
        <h2>Vinícius<br />Bevilaqua</h2>
        <p>Computer Science Student / Java Developer</p>
        <div className="sheet-rule" />
        <span className="info-label">Education</span>
        <div className="sheet-line" /><div className="sheet-line short" />
        <div className="sheet-rule" />
        <span className="info-label">Technologies</span>
        <div style={{ marginTop: 12 }}><span className="sheet-tag">Java</span><span className="sheet-tag">SQL</span><span className="sheet-tag">React Native</span><span className="sheet-tag">Git</span></div>
        <div className="sheet-rule" />
        <span className="info-label">Projects / 03</span>
        <div className="sheet-line" /><div className="sheet-line short" /><div className="sheet-line" />
      </aside>
    </main>
  );
}

function Router() {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('vinicius-language') as Language) || 'pt');
  const [dark, setDark] = useState(() => localStorage.getItem('vinicius-theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('vinicius-language', lang);
  }, [dark, lang]);
  return (
    <Shell lang={lang} setLang={setLang} dark={dark} setDark={setDark}>
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={() => <HomePage lang={lang} />} />
          <Route path="/about" component={() => <AboutPage lang={lang} />} />
          <Route path="/projects/:id" component={() => <ProjectDetailPage lang={lang} />} />
          <Route path="/projects" component={() => <ProjectsPage lang={lang} />} />
          <Route path="/learning" component={() => <LearningPage lang={lang} />} />
          <Route path="/cv" component={() => <CvPage lang={lang} />} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </Shell>
  );
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