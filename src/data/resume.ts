import { Language } from "@mui/icons-material";

// Resume data types
export interface FrameworkLibrary {
  name: string;
}

export interface ProgrammingLanguage {
  name: string;
  frameworks?: FrameworkLibrary[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

// Resume data
export const resumeData = {
  programmingLanguages: [
    {
      name: 'JavaScript/TypeScript',
      frameworks: [
        { name: 'React' },
        { name: 'Node.js' },
        { name: 'Next.js' }
      ]
    },
    {
      name: 'Python',
      frameworks: [
        { name: 'FastAPI' },
        { name: 'Django' },
        { name: 'Flask' },
      ]
    },
    {
      name: 'Java',
      frameworks: [
        { name: 'Spring Boot' },
      ]
    }
  ],
  databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  cloud: ['Alibaba Cloud', 'Google Cloud', 'AWS'],
  devOps: ['Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins'],
  aiTools: ['LangChain', 'Ollama', 'PyTorch'],
  others: ['Git', 'REST API', 'GraphQL', 'Microservices'],
  languages: ['English', 'Mandarin Chinese', 'Japanese'],
  experiences: [
    {
      title: 'Full Stack Software Engineer',
      company: 'Start Smart Learning Center',
      period: '01/2025 - Present',
      responsibilities: [
        'Designed and developed core features for nycsmart.org, an educational platform used by 50+ students.',
        'Built secure authentication and role-based access control system to ensure multi-tiered data protection.',
        'Developed AI-powered tools including a voice-enabled English chatbot and a dynamic Math question generator, leveraging LangChain, Ollama, qwen2.5-7b, and Alibaba\'s qwen-vl-max.',
        'Implemented DevOps pipelines using GitHub Actions and Alibaba Cloud for CI/CD and scalable deployment.',
        'Mentored high school interns, leading agile sprints and conducting code reviews to maintain quality and learning.'
      ]
    }
  ],
  educations: [
   {
      institution: 'Fordham University',
      degree: 'Master of Science in Computer Science',
      period: '08/2023 - 12/2024'
    },
    {
      institution: 'Kenyon College',
      degree: 'Bachelor of Arts in Japanese, minor in Mathematics',
      period: '08/2018 - 05/2022'
    }
  ]
};

// Generate formatted text for terminal display
export const generateResumeText = {
  // Generate skills section text for terminal display
  skills: (): string => {
    let output = '**Skills**\n\n';
    
    // Programming Languages
    output += '**Programming Languages**\n';
    resumeData.programmingLanguages.forEach(lang => {
      output += `• ${lang.name}\n`;
      if (lang.frameworks && lang.frameworks.length > 0) {
        output += `  Frameworks & Libraries: ${lang.frameworks.map(f => f.name).join(', ')}\n`;
      }
    });
    
    // Other categories
    output += '\n**Databases**\n';
    output += `• ${resumeData.databases.join(', ')}\n`;
    
    output += '\n**Cloud**\n';
    output += `• ${resumeData.cloud.join(', ')}\n`;
    
    output += '\n**DevOps**\n';
    output += `• ${resumeData.devOps.join(', ')}\n`;
    
    output += '\n**AI & Tools**\n';
    output += `• ${resumeData.aiTools.join(', ')}\n`;
    
    output += '\n**Others**\n';
    output += `• ${resumeData.others.join(', ')}\n`;
    
    return output;
  },
  
  // Generate experience section text for terminal display
  experience: (): string => {
    let output = '**Work Experience**\n\n';
    
    resumeData.experiences.forEach(exp => {
      output += `**${exp.title}**\n`;
      output += `${exp.company} | ${exp.period}\n\n`;
      output += 'Responsibilities:\n';
      exp.responsibilities.forEach(resp => {
        output += `• ${resp}\n`;
      });
      output += '\n';
    });
    
    return output;
  },
  
  // Generate education section text for terminal display
  education: (): string => {
    let output = '**Education**\n\n';
    
    resumeData.educations.forEach(edu => {
      output += `**${edu.degree}**\n`;
      output += `${edu.institution} | ${edu.period}\n\n`;
    });
    
    return output;
  },
  
  // Generate summary of all sections
  summary: (): string => {
    return '**Resume**\n\nUse cat command to view specific sections:\n\n' +
           '• skills.txt - View technical skills\n' +
           '• experience.txt - View work experience\n' +
           '• education.txt - View educational background\n';
  }
};
