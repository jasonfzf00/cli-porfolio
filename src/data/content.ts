// Data to be displayed and interacted with through terminal commands
import { generateResumeText } from './resume';
import { projects } from './projects';

export interface ContentItem {
  name: string;
  content: string;
  type: 'file' | 'directory';
  children?: ContentItem[];
}

// Transform projects data into terminal-friendly format
const generateProjectFiles = (): ContentItem[] => {
  return projects.map(project => ({
    name: `${project.id}.txt`,
    type: 'file',
    content: `**${project.title}**
${project.description}

**Technologies**: ${project.technologies.join(', ')}
**Year**: ${project.year}

${project.link ? `**Live Demo**: ${project.link}` : ''}
${project.github ? `**GitHub**: ${project.github}` : ''}
`
  }));
};

export const fileSystem: ContentItem[] = [
  {
    name: 'about.txt',
    type: 'file',
    content: `Hi there! I'm **Jason**, a passionate developer who enjoys building innovative web applications.
I specialize in frontend development with **React** and have experience with various backend technologies.
Welcome to my CLI-inspired personal website! Try using Linux commands to navigate around.`
  },
  {
    name: 'skills.txt',
    type: 'file',
    content: `**Programming Languages**: JavaScript, TypeScript, HTML, CSS, Python
**Frameworks/Libraries**: React, Node.js, Express
**Tools**: Git, Docker, AWS
**Other**: Responsive Design, RESTful APIs, GraphQL`
  },
  {
    name: 'resume',
    type: 'directory',
    content: 'Directory containing resume information',
    children: [
      {
        name: 'summary.txt',
        type: 'file',
        content: generateResumeText.summary()
      },
      {
        name: 'skills.txt',
        type: 'file',
        content: generateResumeText.skills()
      },
      {
        name: 'experience.txt',
        type: 'file',
        content: generateResumeText.experience()
      },
      {
        name: 'education.txt',
        type: 'file',
        content: generateResumeText.education()
      }
    ]
  },
  {
    name: 'projects',
    type: 'directory',
    content: 'Directory containing project information',
    children: generateProjectFiles()
  },
  {
    name: 'contact.txt',
    type: 'file',
    content: `**Email**: :email: zffu12@gmail.com
**GitHub**: :github: https://github.com/jasonfzf00
**LinkedIn**: :linkedin: https://www.linkedin.com/in/jasonzefengfu/`
  },
  {
    name: 'help.txt',
    type: 'file',
    content: `**Available commands**:
- **ls**: List all files and directories
- **cat [filename]**: Display the content of a file
- **cd [directory]**: Change directory
- **grep [pattern] [filename]**: Search for a pattern in a file
- **echo [message]**: Display a message
- **help**: Display available commands

**Tips**:
- Try navigating to the **projects/** directory to see my portfolio
- Use \`cd projects\` to navigate to the projects directory
- Use \`cat [project-name].txt\` to see details about a specific project
- Project links are clickable in the terminal!`
  }
];

// Function to find an item in the file system
export const findItem = (path: string[] = [], currentDir: ContentItem[] = fileSystem): ContentItem | null => {
  if (path.length === 0) {
    return null;
  }
  
  const targetName = path[0];
  
  for (const item of currentDir) {
    if (item.name === targetName) {
      if (path.length === 1) {
        return item;
      } else if (item.type === 'directory' && item.children) {
        return findItem(path.slice(1), item.children);
      }
    }
  }
  
  return null;
};

// Current directory path handling
export let currentPath: string[] = [];

export const getCurrentDirectory = (): ContentItem[] => {
  if (currentPath.length === 0) {
    return fileSystem;
  }
  
  let current = fileSystem;
  for (const dir of currentPath) {
    const foundDir = current.find(item => item.name === dir && item.type === 'directory');
    if (foundDir && foundDir.children) {
      current = foundDir.children;
    } else {
      return fileSystem; // Fallback to root if path is invalid
    }
  }
  
  return current;
};

export const setCurrentPath = (path: string[]) => {
  currentPath = path;
}; 