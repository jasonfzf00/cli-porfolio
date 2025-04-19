import { findItem, getCurrentDirectory, setCurrentPath, currentPath, fileSystem, ContentItem } from '../data/content';

type CommandResult = {
  output: string;
  isError?: boolean;
  shouldFormat?: boolean;
};

// Execute the LS command
const executeLS = (): CommandResult => {
  const currentDir = getCurrentDirectory();
  const items = currentDir.map((item: ContentItem) => {
    if (item.type === 'directory') {
      return `<span class="directory">${item.name}/</span>`;
    }
    return `<span class="file">${item.name}</span>`;
  });
  
  return {
    output: items.join('    ')
  };
};

// Execute the CAT command
const executeCAT = (args: string[]): CommandResult => {
  if (args.length === 0) {
    return { output: 'cat: missing file operand', isError: true };
  }
  
  const filename = args[0];
  const currentDir = getCurrentDirectory();
  const file = currentDir.find((item: ContentItem) => item.name === filename && item.type === 'file');
  
  if (!file) {
    return { output: `cat: ${filename}: No such file or directory`, isError: true };
  }
  
  return { 
    output: file.content,
    shouldFormat: true 
  };
};

// Execute the CD command
const executeCD = (args: string[]): CommandResult => {
  if (args.length === 0) {
    setCurrentPath([]);
    return { output: '' };
  }
  
  const dirName = args[0];
  
  // Handle special cases
  if (dirName === '..') {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    }
    return { output: '' };
  }
  
  if (dirName === '.') {
    return { output: '' };
  }
  
  if (dirName === '/') {
    setCurrentPath([]);
    return { output: '' };
  }
  
  // Handle directory navigation
  const currentDir = getCurrentDirectory();
  const targetDir = currentDir.find((item: ContentItem) => item.name === dirName && item.type === 'directory');
  if (!targetDir) {
    return { output: `cd: ${dirName}: No such directory`, isError: true };
  }
  
  setCurrentPath([...currentPath, dirName]);
  return { output: '' };
};

// Execute the GREP command
const executeGREP = (args: string[]): CommandResult => {
  if (args.length < 2) {
    return { output: 'grep: missing pattern and/or filename', isError: true };
  }
  
  const pattern = args[0];
  const filename = args[1];
  
  const currentDir = getCurrentDirectory();
  const file = currentDir.find((item: ContentItem) => item.name === filename && item.type === 'file');
  
  if (!file) {
    return { output: `grep: ${filename}: No such file or directory`, isError: true };
  }
  
  try {
    const regex = new RegExp(pattern, 'g');
    const lines = file.content.split('\n');
    const matches = lines.filter((line: string) => regex.test(line));
    
    if (matches.length === 0) {
      return { output: '' };
    }
    
    return { 
      output: matches.join('\n'),
      shouldFormat: true 
    };
  } catch (error) {
    return { output: 'grep: invalid regular expression', isError: true };
  }
};

// Execute the ECHO command
const executeECHO = (args: string[]): CommandResult => {
  return { 
    output: args.join(' '),
    shouldFormat: true
  };
};

// Execute the HELP command
const executeHELP = (): CommandResult => {
  const helpItem = fileSystem.find((item: ContentItem) => item.name === 'help.txt');
  if (helpItem) {
    return { 
      output: helpItem.content,
      shouldFormat: true 
    };
  }
  return { 
    output: `**Available commands**:
- **ls**: List all files and directories
- **cat [filename]**: Display the content of a file
- **cd [directory]**: Change directory
- **grep [pattern] [filename]**: Search for a pattern in a file
- **echo [message]**: Display a message
- **help**: Display available commands`,
    shouldFormat: true
  };
};

// Parse and execute command
export const parseCommand = (input: string): CommandResult => {
  const trimmedInput = input.trim();
  
  if (!trimmedInput) {
    return { output: '' };
  }
  
  const parts = trimmedInput.split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).filter(arg => arg !== '');
  
  switch (command) {
    case 'ls':
      return executeLS();
    case 'cat':
      return executeCAT(args);
    case 'cd':
      return executeCD(args);
    case 'grep':
      return executeGREP(args);
    case 'echo':
      return executeECHO(args);
    case 'help':
      return executeHELP();
    default:
      return {
        output: `${command}: command not found`,
        isError: true
      };
  }
};

// Get the current path as a string for display
export const getCurrentPathString = (): string => {
  if (currentPath.length === 0) {
    return '~';
  }
  return `~/${currentPath.join('/')}`;
}; 