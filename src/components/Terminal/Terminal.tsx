import React, { useState, useRef, useEffect } from 'react';
import { parseCommand, getCurrentPathString } from '../../utils/commandParser';
import { getCurrentDirectory } from '../../data/content';
import './Terminal.css';
// Import MUI icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';

type HistoryItem = {
  command: string;
  output: string;
  path: string;
  isError?: boolean;
  isFormatted?: boolean;
};

// Regular expressions for content formatting
const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const HIGHLIGHT_REGEX = /\*\*(.*?)\*\*/g;
const ICON_REGEX = /:([a-zA-Z]+):/g;

// Icon mapping to display icons
const ICON_MAP: Record<string, React.ReactNode> = {
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
  email: <EmailIcon />,
  twitter: <TwitterIcon />,
};

const Terminal: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { 
      command: '', 
      output: 'Welcome to my personal website! Type **help** to see available commands.', 
      path: '~',
      isError: false,
      isFormatted: true
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // List of available commands
  const availableCommands = ['ls', 'cat', 'cd', 'grep', 'echo', 'help'];

  // Format content with highlighting, links, and icons
  const formatContent = (content: string): React.ReactNode => {
    if (!content) return null;
    
    // Split the content by regex matches to preserve order
    const parts: React.ReactNode[] = [];
    
    // First, handle highlight markers
    const highlightedContent = content.replace(HIGHLIGHT_REGEX, '<span class="highlight">$1</span>');
    
    // Then handle URLs and convert them to clickable links
    const tempContent = highlightedContent.replace(URL_REGEX, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="terminal-link">${url}</a>`;
    });
    
    // Finally, handle icons
    const contentWithIcons = tempContent.split(ICON_REGEX);
    if (contentWithIcons.length === 1) {
      // No icons, just return the content with links and highlights
      return <span dangerouslySetInnerHTML={{ __html: tempContent }} />;
    }
    
    // If we have icons, build the content part by part
    for (let i = 0; i < contentWithIcons.length; i++) {
      if (i % 2 === 0) {
        // Text part
        if (contentWithIcons[i]) {
          parts.push(
            <span key={`text-${i}`} dangerouslySetInnerHTML={{ __html: contentWithIcons[i] }} />
          );
        }
      } else {
        // Icon part
        const iconName = contentWithIcons[i].toLowerCase();
        if (ICON_MAP[iconName]) {
          parts.push(
            <span key={`icon-${i}`} className="terminal-icon">
              {ICON_MAP[iconName]}
            </span>
          );
        } else {
          parts.push(<span key={`icon-${i}`}>:{iconName}:</span>);
        }
      }
    }
    
    return <>{parts}</>;
  };

  // Auto-focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto-scroll to terminal body bottom when new text prompted
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({
        top: bodyRef.current.scrollHeight,
      });
    }
  }, [history,suggestions]);

  // Generate suggestions based on current input
  const generateSuggestions = (input: string): string[] => {
    // Split by space to get command and arguments
    const parts = input.split(' ');
    const currentWord = parts[parts.length - 1];
    
    // If we're on the first word, suggest commands
    if (parts.length === 1) {
      return availableCommands.filter(cmd => cmd.startsWith(currentWord));
    }
    
    // For commands that need file/directory suggestions
    const command = parts[0];
    const currentDir = getCurrentDirectory();
    
    // Get all files and directories in current directory
    const files = currentDir
      .filter(item => item.type === 'file')
      .map(item => item.name);
    
    const dirs = currentDir
      .filter(item => item.type === 'directory')
      .map(item => item.name);
    
    // For display purposes, we add trailing slash to directories
    const dirsWithSlash = dirs.map(d => d + '/');
    
    // Combine files and directories, filter by current input
    const fileAndDirs = [...files, ...dirsWithSlash].filter(item => 
      item.startsWith(currentWord)
    );
    
    // For specific commands, filter suggestions accordingly
    switch (command) {
      case 'cd':
        return dirsWithSlash.filter(dir => dir.startsWith(currentWord));
      case 'cat':
      case 'grep':
        return files.filter(file => file.startsWith(currentWord));
      default:
        return fileAndDirs;
    }
  };

  // Handle tab key for autocomplete
  const handleTabCompletion = () => {
    const parts = inputValue.split(' ');
    const currentWord = parts[parts.length - 1];
    
    const suggestions = generateSuggestions(inputValue);
    
    if (suggestions.length === 1) {
      // If only one suggestion, autocomplete directly
      parts[parts.length - 1] = suggestions[0];
      setInputValue(parts.join(' '));
      setSuggestions([]);
      setShowSuggestions(false);
    } else if (suggestions.length > 1) {
      // Find common prefix among suggestions for partial completion
      const commonPrefix = findCommonPrefix(suggestions);
      
      if (commonPrefix.length > currentWord.length) {
        parts[parts.length - 1] = commonPrefix;
        setInputValue(parts.join(' '));
      }
      
      // Show all available suggestions
      setSuggestions(suggestions);
      setShowSuggestions(true);
    }
  };
  
  // Find common prefix among suggestions
  const findCommonPrefix = (strings: string[]): string => {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];
    
    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      let j = 0;
      while (j < prefix.length && j < strings[i].length && prefix[j] === strings[i][j]) {
        j++;
      }
      prefix = prefix.substring(0, j);
      if (prefix === '') break;
    }
    
    return prefix;
  };

  // Handle command execution
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    let commandToExecute = inputValue;
    
    // Remove trailing slash from directory names for cd command
    const parts = inputValue.split(' ');
    if (parts[0].toLowerCase() === 'cd' && parts.length > 1 && parts[1].endsWith('/')) {
      parts[1] = parts[1].slice(0, -1); // Remove trailing slash
      commandToExecute = parts.join(' ');
    }
    
    const currentPath = getCurrentPathString();
    const result = parseCommand(commandToExecute);
    
    // Update command history with the original input value
    setCommandHistory(prev => [...prev, inputValue]);
    
    // Update terminal history with the original input value
    setHistory(prev => [
      ...prev,
      {
        command: inputValue,
        output: result.output,
        path: currentPath,
        isError: result.isError,
        isFormatted: result.shouldFormat
      }
    ]);
    
    // Reset input and history navigation
    setInputValue('');
    setHistoryIndex(-1);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle keyboard navigation through command history and tab completion
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    const parts = inputValue.split(' ');
    parts[parts.length - 1] = suggestion;
    setInputValue(parts.join(' '));
    setSuggestions([]);
    setShowSuggestions(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal" onClick={handleTerminalClick} ref={terminalRef}>
      <div className="terminal-header">
        <div className="terminal-button close"></div>
        <div className="terminal-button minimize"></div>
        <div className="terminal-button maximize"></div>
        <div className="terminal-title">jason@portfolio: ~</div>
      </div>
      
      <div className="terminal-body" ref={bodyRef}>
        {history.map((item, index) => (
          <div key={index} className="history-item">
            {item.command && (
              <div className="command-line">
                <span className="prompt">{item.path} $</span> {item.command}
              </div>
            )}
            {item.output && (
              <div className={`output-line ${item.isError ? 'error' : ''}`}>
                {item.isFormatted 
                  ? formatContent(item.output)
                  : <span dangerouslySetInnerHTML={{ __html: item.output }} />
                }
              </div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="input-line">
          <span className="prompt">{getCurrentPathString()} $</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="command-input"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </form>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal; 