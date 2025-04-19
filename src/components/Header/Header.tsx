import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import './Header.css';

interface HeaderProps {
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <Box component="header" className="header">
      {/* <h1 className="header-title">Jason Fu</h1> */}
      <Box component="nav" className="header-nav">
        <Tabs 
          className="nav-tabs"
          value={activeTab}
          onChange={(_, newValue) => handleTabClick(newValue)}
          variant="fullWidth"
          slotProps={{ indicator: { style: { backgroundColor: '#5af78e' } }}}
        >
          <Tab 
            className="nav-tab"
            value="home"
            label="Home"
            disableRipple
          />
          <Tab 
            className="nav-tab"
            value="projects"
            label="Projects"
            disableRipple
          />
            <Tab 
            className="nav-tab"
            value="blog"
            label="Blog"
            disableRipple
          />
          <Tab 
            className="nav-tab"
            value="resume"
            label="Resume"
            disableRipple
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default Header; 