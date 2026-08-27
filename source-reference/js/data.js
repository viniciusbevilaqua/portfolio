/**
 * ============================================================
 * PORTFOLIO DATA — Vinícius Bevilaqua
 * ============================================================
 * All content is centralized here for easy editing.
 * To update any text, link, or project info, edit this file.
 *
 * Translation format:
 *   - Bilingual: { pt: "...", en: "..." }
 *   - Universal: "same in both languages"
 *
 * To add a photo in the future:
 *   1. Place the image in assets/images/
 *   2. Uncomment the 'photo' line in personal section
 *   3. Set the correct filename
 * ============================================================
 */

const DATA = {

  // ── Meta ──────────────────────────────────────────────
  meta: {
    title: "Vinícius Bevilaqua — Computer Science Student / Java Developer",
    description: {
      pt: "Portfólio de Vinícius Bevilaqua, estudante de Ciência da Computação na UNIFOR com foco em Java.",
      en: "Portfolio of Vinícius Bevilaqua, Computer Science student at UNIFOR focused on Java development."
    }
  },

  // ── Personal Info ─────────────────────────────────────
  personal: {
    name: "Vinícius Bevilaqua",
    title: "Computer Science Student / Java Developer",
    email: "vinicius257500@gmail.com",
    phone: "(85) 98558-7004",
    phoneFull: "+5585985587004",
    linkedin: {
      url: "https://www.linkedin.com/in/vinicius-bevilaqua-9a52522b0/",
      label: "LinkedIn"
    },
    github: {
      url: "https://github.com/viniciusbevilaqua",
      label: "GitHub"
    },
    cvPath: "assets/cv/cv-vinicius-bevilaqua.pdf",
    // photo: "assets/images/profile.jpg",
  },

  // ── Navigation ────────────────────────────────────────
  nav: {
    home:     { pt: "Home",        en: "Home" },
    about:    { pt: "Sobre",       en: "About" },
    projects: { pt: "Projetos",    en: "Projects" },
    learning: { pt: "Aprendendo",  en: "Learning" },
    cv:       "CV",
  },

  // ── Hero ──────────────────────────────────────────────
  hero: {
    building: "Building",
  },

  // ── About ─────────────────────────────────────────────
  about: {
    sectionTitle: { pt: "Sobre", en: "About" },
    educationLabel: { pt: "Formação", en: "Education" },
    courseLabel: { pt: "Curso Adicional", en: "Additional Course" },
    toolsLabel: { pt: "Tecnologias & Ferramentas", en: "Technologies & Tools" },

    paragraphs: {
      pt: [
        "Estudante de Ciência da Computação na Universidade de Fortaleza (UNIFOR), atualmente no 4º semestre, com interesse em desenvolvimento de software e foco atual em Java.",
        "Comecei a graduação em fevereiro de 2025 e pretendo concluir o curso em dezembro de 2028. Atualmente estou aprofundando conhecimentos em Java, algoritmos, estruturas de dados, SQL e tecnologias do ecossistema Java.",
        "Buscando minha primeira oportunidade profissional na área de Tecnologia da Informação."
      ],
      en: [
        "Computer Science student at University of Fortaleza (UNIFOR), currently in the 4th semester, with interest in software development and a current focus on Java.",
        "Started my degree in February 2025 and expect to graduate in December 2028. Currently deepening my knowledge in Java, algorithms, data structures, SQL, and Java ecosystem technologies.",
        "Seeking my first professional opportunity in Information Technology."
      ]
    },

    education: {
      institution: "Universidade de Fortaleza — UNIFOR",
      degree:    { pt: "Ciência da Computação", en: "Computer Science" },
      period:    "2025 — 2028",
      semester:  { pt: "4º Semestre", en: "4th Semester" },
    },

    additionalCourse: {
      institution: "Rocketseat",
      name: { pt: "Fundamentos da Programação Web", en: "Web Programming Fundamentals" },
    },

    tools: [
      "Java", "JavaScript", "HTML", "CSS",
      "React Native", "Expo", "Node.js", "Firebase",
      "Git", "GitHub", "IntelliJ IDEA", "VS Code"
    ],
  },

  // ── Projects ──────────────────────────────────────────
  projects: {
    sectionTitle: { pt: "Projetos", en: "Projects" },
    viewProject: { pt: "Ver no GitHub", en: "View on GitHub" },

    items: [
      {
        id: "accessibility-app",
        name: "Accessibility App",
        featured: true,
        type: { pt: "Projeto Acadêmico", en: "Academic Project" },
        description: {
          pt: "Aplicativo mobile para identificação, avaliação e consulta de condições de acessibilidade em espaços urbanos. Desenvolvido em equipe de 5 estudantes de Ciência da Computação.",
          en: "Mobile app for identifying, evaluating, and consulting accessibility conditions in urban spaces. Developed by a team of 5 Computer Science students."
        },
        tech: ["JavaScript", "React Native", "Expo", "Firebase"],
        contributions: {
          pt: "Login · Ranking · Configurações · Integração geral",
          en: "Login · Ranking · Settings · General integration"
        },
        note: {
          pt: "Repositório público contém versão intermediária.",
          en: "Public repository contains an intermediate version."
        },
        github: "https://github.com/viniciusbevilaqua/accessibility-app",
        image: "assets/images/accessibility-app.svg",
        color: "#8b5cf6",
      },
      {
        id: "academic-mobility",
        name: "Academic Mobility System",
        type: { pt: "Projeto Acadêmico", en: "Academic Project" },
        description: {
          pt: "Sistema web para auxiliar estudantes no processo de candidatura a programas de intercâmbio e mobilidade acadêmica.",
          en: "Web system to assist students in the application process for exchange and academic mobility programs."
        },
        tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
        github: "https://github.com/viniciusbevilaqua/academic-mobility-system",
        image: "assets/images/academic-mobility.svg",
        color: "#6366f1",
      },
      {
        id: "devlinks",
        name: "DevLinks",
        type: { pt: "Projeto Pessoal", en: "Personal Project" },
        description: {
          pt: "Projeto pessoal criado antes do início da faculdade, reunindo informações de perfil e links para redes sociais em uma única interface.",
          en: "Personal project created before starting college, bringing together profile information and social media links in a single interface."
        },
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/viniciusbevilaqua/projeto-devlinks",
        image: "assets/images/devlinks.svg",
        color: "#a78bfa",
      }
    ]
  },

  // ── Currently Learning ────────────────────────────────
  learning: {
    sectionTitle: { pt: "Aprendendo Atualmente", en: "Currently Learning" },

    items: [
      {
        name: "Java",
        description: {
          pt: "Linguagem principal de estudo e foco profissional atual",
          en: "Main study language and current professional focus"
        },
        intensity: "high",
        icon: "☕",
      },
      {
        name: "SQL",
        description: {
          pt: "Banco de dados relacionais e consultas",
          en: "Relational databases and queries"
        },
        intensity: "high",
        icon: "🗄️",
      },
      {
        name: "JDBC",
        description: {
          pt: "Conexão Java com bancos de dados",
          en: "Java database connectivity"
        },
        intensity: "medium",
        icon: "🔗",
      },
      {
        name: "Spring Boot",
        description: {
          pt: "Framework para aplicações Java",
          en: "Framework for Java applications"
        },
        intensity: "medium",
        icon: "🌱",
      },
      {
        name: { pt: "Algoritmos", en: "Algorithms" },
        description: {
          pt: "Construção e análise de algoritmos",
          en: "Algorithm design and analysis"
        },
        intensity: "medium",
        icon: "⚡",
      },
      {
        name: { pt: "Estruturas de Dados", en: "Data Structures" },
        description: {
          pt: "Estruturas de dados fundamentais e suas aplicações",
          en: "Fundamental data structures and their applications"
        },
        intensity: "medium",
        icon: "🏗️",
      }
    ]
  },

  // ── CV ────────────────────────────────────────────────
  cv: {
    sectionTitle:  { pt: "Currículo",       en: "Resume" },
    description:   { pt: "Veja meu currículo completo com informações sobre formação, competências e projetos.",
                     en: "View my full resume with information about education, skills, and projects." },
    viewButton:    { pt: "Visualizar CV",   en: "View CV" },
    downloadButton:{ pt: "Baixar CV",       en: "Download CV" },
  },

  // ── Contact ───────────────────────────────────────────
  contact: {
    title:      { pt: "Vamos Conversar", en: "Let's Connect" },
    subtitle:   { pt: "Aberto a oportunidades e novas conexões",
                  en: "Open to opportunities and new connections" },
    phoneLabel: { pt: "Telefone", en: "Phone" },
  },

  // ── Footer ────────────────────────────────────────────
  footer: {
    builtBy: { pt: "Desenvolvido por", en: "Built by" },
  },
};
