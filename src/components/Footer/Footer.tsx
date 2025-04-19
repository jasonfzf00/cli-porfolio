import React from 'react';
import './Footer.css';
import { Typography, Paper, Container, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
    <div>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <EmailIcon onClick={() => window.open('mailto:zffu12@gmail.com', '_blank')} fontSize="small" />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <LinkedInIcon onClick={() => window.open('https://www.linkedin.com/in/jasonzefengfu/', '_blank')} fontSize="small" />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <GitHubIcon onClick={() => window.open('https://github.com/jasonfzf00', '_blank')} fontSize="small" />
          </Box>
        </Box>
    </div>
      <div className="container">
        <p>© {new Date().getFullYear()} Jason Fu. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 