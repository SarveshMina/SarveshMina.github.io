export const defaultProjects = [
  {
    active: true,
    order: 0,
    slug: "calendify",
    title: "Calendify \u2013 A Group Calendar App",
    duration: "Oct 2024 \u2013 Jan 2025",
    description:
      "A collaborative event scheduling app using Vue.js and Azure. Features include user authentication, event management, dynamic calendar views, and real-time notifications.",
    details:
      "Calendify is designed to streamline group scheduling by providing a seamless interface for creating, managing, and sharing events. It integrates with various calendar services and offers real-time updates to ensure all participants are on the same page.",
    skills: [
      "Vue.js",
      "Azure",
      "JavaScript",
      "CSS",
      "HTML",
      "Authentication",
      "Real-time Notifications",
    ],
    video: "/vids/Calendify.mp4",
    liveDemo: "https://sarveshmina.github.io/CAD-gwc-frontend/",
    repoFrontend: "https://github.com/SarveshMina/CAD-gwc-frontend",
    repoBackend: "https://github.com/SarveshMina/CAD-gcw-backend",
    repo: "https://github.com/SarveshMina/CAD-gwc-frontend",
    buttonText: "Live Demo",
  },
  {
    active: true,
    order: 1,
    slug: "cuberun3d",
    title: "Cube Runner 3D",
    duration: "Apr 2022 \u2013 Oct 2022",
    description:
      "An endless 3D runner game built with Unity and C#. Features procedural level generation, adaptive AI difficulty, and smooth performance optimizations.",
    details:
      "Cube Runner 3D offers an immersive gaming experience where players navigate through dynamically generated levels. The game adapts to the player's skill level, ensuring a challenging yet enjoyable experience.",
    skills: [
      "Unity",
      "C#",
      "Procedural Generation",
      "AI",
      "Game Optimization",
    ],
    video: "/vids/CubeRunner3D.mp4",
    liveDemo: "https://sarveshmina.github.io/games/cube_runner_3d/",
    repo: "https://github.com/SarveshMina/Cube_Runner_3D",
    buttonText: "Play Game",
  },
  {
    active: true,
    order: 2,
    slug: "runwayrt",
    title: "Runway Redeclaration Tool",
    duration: "Oct 2023 \u2013 March 2023",
    description:
      "Developed a tool to modernize aviation safety protocols. Implemented TODA and ASDA calculations for flight safety, designed a user-friendly interface, and integrated mathematical models for accurate predictions.",
    details:
      "The Runway Redeclaration Tool enhances aviation safety by providing precise calculations for Takeoff Distance Available (TODA) and Accelerate-Stop Distance Available (ASDA). Its intuitive interface allows users to input various parameters and obtain accurate safety assessments.",
    skills: [
      "Java",
      "Mathematical Modeling",
      "UI/UX Design",
      "Safety Protocols",
    ],
    video: "/vids/RunwayRedeclaration.mp4",
    liveDemo: "/downloads/RunwayRedeclaration.jar",
    repo: "https://github.com/bryanvullo/RunwayRedeclaration",
    buttonText: "Download JAR",
  },
  {
    active: true,
    order: 3,
    slug: "tetrecs",
    title: "TetrECS \u2013 A Tetris-Based Game",
    duration: "Jan 2025 \u2013 Present",
    description:
      "A fast-paced Java-based Tetris game with improved mechanics. Originally a university coursework project, now enhanced with new features and multiplayer support under development.",
    details:
      "TetrECS brings a fresh twist to the classic Tetris game by introducing enhanced mechanics and multiplayer capabilities. Players can compete in real-time, collaborate on levels, and enjoy an optimized gaming experience.",
    skills: ["Java", "Game Development", "Multiplayer Integration", "JavaFX"],
    video: "/vids/TetrECS.mp4",
    liveDemo: "/downloads/TetrECS.jar",
    repo: "https://github.com/SarveshMina/TetrECS",
    buttonText: "Download JAR",
  },
]

export const defaultSkills = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Java', icon: ['fab', 'java'], url: 'https://www.java.com/' },
      { name: 'Python', icon: ['fab', 'python'], url: 'https://www.python.org/' },
      { name: 'C++', icon: ['fas', 'code'], url: 'https://isocpp.org/' }
    ]
  },
  {
    name: 'Frontend Development',
    skills: [
      { name: 'HTML5', icon: ['fab', 'html5'], url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      { name: 'CSS3', icon: ['fab', 'css3-alt'], url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
      { name: 'JavaScript', icon: ['fab', 'js'], url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', icon: ['fab', 'js'], url: 'https://www.typescriptlang.org/' },
      { name: 'Vue.js', icon: ['fab', 'vuejs'], url: 'https://vuejs.org/' },
      { name: 'React', icon: ['fab', 'react'], url: 'https://reactjs.org/' }
    ]
  },
  {
    name: 'DevOps & Tools',
    skills: [
      { name: 'Git', icon: ['fab', 'git'], url: 'https://git-scm.com/' },
      { name: 'GitHub', icon: ['fab', 'github'], url: 'https://github.com/' },
      { name: 'Docker', icon: ['fab', 'docker'], url: 'https://www.docker.com/' },
      { name: 'AWS', icon: ['fab', 'aws'], url: 'https://aws.amazon.com/' },
      { name: 'VS Code', icon: ['fas', 'laptop-code'], url: 'https://code.visualstudio.com/' }
    ]
  }
]

export const defaultEducation = [
  {
    active: true,
    order: 0,
    degree: "MEng Computer Science with Year in Industry",
    institution: "University of Southampton",
    duration: "September 2022 \u2013 June 2027",
    grade: "Expected 1:1",
    modules:
      "Machine Learning Technologies, Cloud Application Development, Research Project, Engineering Management, Computational Biology and Security of Cyber Physical Systems.",
  },
  {
    active: true,
    order: 1,
    degree: "A-Levels",
    institution: "Podar International School, Aurangabad, India",
    duration: "2019 \u2013 2020",
    grades: "Mathematics (A), Computer Science (A), Physics (A)",
  },
]

export const defaultExperience = [
  {
    active: true,
    order: 0,
    title: "Assistant Engineer \u2013 Software & Electrical Engineering",
    company: "Foster + Partners",
    location: "London / Southampton, UK",
    duration: "September 2024 \u2013 Present",
    points: [
      "Developed internal software tools and automation to support BIM-driven architectural projects.",
      "Automated Revit workflows using pyRevit and Dynamo scripting, improving drawing speed, consistency, and QA/QC.",
      "Designed data-driven workflows integrating engineering data with Revit models to reduce manual errors.",
      "Produced and coordinated electrical layouts, schedules, and technical drawings within Revit.",
      "Supported the design and coordination of building electrical and ICT systems on large-scale projects.",
      "Collaborated with multidisciplinary teams to ensure designs met project standards, compliance, and delivery timelines.",
    ],
  },
  {
    active: true,
    order: 1,
    title: "Tech Manager",
    company: "Google Developer Group Southampton",
    location: "Southampton, UK",
    duration: "October 2024 – Present",
    points: [
      "Organized workshops on Google technologies.",
      "Hosted talks and panels with industry experts.",
      "Led a team to run technical operations smoothly.",
      "Maintained the society\u2019s digital infrastructure.",
    ],
  },
  {
    active: true,
    order: 2,
    title: "Head of Education",
    company: "Artificial Intelligence Society Southampton",
    location: "Southampton, UK",
    duration: "July 2023 \u2013 September 2024",
    points: [
      "Led AI and coding workshops for students.",
      "Coached hackathon teams, boosting their confidence.",
      "Expanded educational offerings, increasing attendance.",
      "Delivered presentations on AI and programming.",
      "Engaged with industry professionals for mentorship.",
    ],
  },
  {
    active: true,
    order: 3,
    title: "Head of Technology",
    company: "Fish on Toast",
    location: "Southampton, UK",
    duration: "September 2024 \u2013 Present",
    points: [
      "Managed website operations and provided technical support.",
      "Collaborated with teams to enhance user experience.",
    ],
  },
  {
    active: true,
    order: 4,
    title: "Virtual Support Ambassador",
    company: "University of Southampton",
    location: "Southampton, UK",
    duration: "September 2024 \u2013 Present",
    points: [
      "Managed CRM communications and Gecko system integrations.",
      "Provided troubleshooting support and coordinated with admissions teams.",
    ],
  },
]
