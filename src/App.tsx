import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './App.css';
import Header from './components/Header/Header';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Resume from './Pages/Resume';
import Footer from './components/Footer/Footer';
// import Blog from './Pages/Blog'; // To be added later

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5af78e',
    },
    secondary: {
      main: '#57c7ff',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2a2a2a',
    },
    text: {
      primary: '#eee',
      secondary: '#aaa',
    },
  },
  typography: {
    fontFamily: "'Fira Code', 'Courier New', monospace",
    h4: {
      color: '#5af78e',
    },
    h6: {
      color: '#eee',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1a1a1a',
          color: '#eee',
        },
      },
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'projects':
        return <Projects />;
      case 'resume':
        return <Resume />;
      case 'blog':
        // return <Blog />;
        return <div>Blog coming soon!</div>;
      default:
        return <Home />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header onTabChange={handleTabChange} />
        
        <div className="content-container">
          {renderContent()}
        </div>
        
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default App;
