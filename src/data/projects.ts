export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  github?: string;
  year: number;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "nyc-smart",
    title: "NYCSmart.org",
    description: "An online platform designed to manage students, provide mock exam systems, English prounciation practice for non-native speakers, and more.",
    technologies: ["Python", "JavaScript", "React", "FastAPI", "SQL", "Redis", "Docker", "Cloud", "LangChain", "LLM"],
    link: "https://nycsmart.org",
    // github: "https://github.com/username/task-manager",
    year: 2025,
    featured: true
  },
  {
    id: "mock-exam",
    title: "Mock Exam System",
    description: "An mock exam system to help students (k12, highschool) get used to and practice computer-based tests such as New York State Tests, SHSAT, SAT etc. Use ant design charts to provide visualized analysis of students' performance, and help teachers to better mentor students.",
    technologies: ["React", "FastAPI", "Ant Design Charts"],
    link: "https://nycsmart.org/test-sampler",
    // github: "https://github.com/username/task-manager",
    year: 2025,
    featured: true
  },
  {
    id: "cli-portfolio",
    title: "CLI Portfolio",
    description: "This is the website you're looking at right now. This is an interactive portfolio website with a command-line interface. Built with React and TypeScript.",
    technologies: ["React", "TypeScript", "CSS", "Material UI"],
    link: "https://jasonfzf.com",
    github: "https://github.com/jasonfzf00/cli-portfolio",
    year: 2025,
    featured: true
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};
