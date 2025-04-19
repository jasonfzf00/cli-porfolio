# CLI Portfolio

A command-line interface inspired interactive portfolio website built with React, TypeScript, and Material-UI. This project provides a unique, terminal-like experience for viewers to explore my work, resume, and skills.

## 🚀 Features

- **Interactive Terminal Interface**: A command line interface that you're familiar with.
- **Custom Command Parsing**: Supports commands like `ls`, `cd`, `cat`, `help`, and other similar bash commands.
- **Resume and Projects**: User friendly display of your projects, blogs, and resume.

## 📋 Available Commands for Terminal

- `help` - Display available commands
- `ls` - List files and directories in the current location
- `cd [directory]` - Change to a different directory
- `cat [file]` - View the contents of a file
- `grep [pattern] [file]` - Search for specific text in files
- `echo [text]` - Display text in the terminal
- More to be added

## 🛠️ Technologies Used

- **React 19** 
- **TypeScript** 
- **Material UI 7** 

## 📦 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/cli-portfolio.git
   cd cli-portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## 🔨 Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Running Tests

```bash
npm test
```

## 🎨 Customization

You can customize the portfolio by modifying the files in:
- `src/data/` - Content files for projects, resume, etc.
- `src/components/Terminal/Terminal.tsx` - Terminal behavior
- `src/utils/commandParser.js` - Command parsing logic

## 📝 License

MIT License
