import React from 'react';
import { Typography, Paper, Container, Box, useMediaQuery, useTheme } from '@mui/material';
import './Pages.css';
import Terminal from '../components/Terminal/Terminal';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Container className="page home-page">
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ borderBottom: '1px solid #444', pb: 1 }}
      >
        Jason Fu
      </Typography>
      
      <Paper 
        elevation={3} 
        className="intro-section" 
        sx={{ p: 2.5, mt: 2.5 }}
      >
        <Typography variant="body1">
          I'm a full-stack software engineer currently based in New York City. I specialize in building scalable web applications, integrating AI solutions, and creating tech-driven tools that improve learning and productivity.
        </Typography>
        
        <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
          Feel free to reach out to me or check out my social media!
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
            <EmailIcon 
              onClick={() => window.open('mailto:zffu12@gmail.com', '_blank')} 
              fontSize="small" 
              sx={{ alignSelf: isMobile ? 'flex-start' : 'center' }}
            />
            <Typography variant="body2" component="a" href="mailto:zffu12@gmail.com" sx={{color: '#5af78e'}}>zffu12@gmail.com</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
            <LinkedInIcon 
              onClick={() => window.open('https://www.linkedin.com/in/jasonzefengfu/', '_blank')} 
              fontSize="small" 
              sx={{ alignSelf: isMobile ? 'flex-start' : 'center' }}
            />
            <Typography variant="body2" component="a" href="https://www.linkedin.com/in/jasonzefengfu/" sx={{color: '#5af78e'}}>Jason Fu</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
            <GitHubIcon 
              onClick={() => window.open('https://github.com/jasonfzf00', '_blank')} 
              fontSize="small" 
              sx={{ alignSelf: isMobile ? 'flex-start' : 'center' }}
            />
            <Typography variant="body2" component="a" href="https://github.com/jasonfzf00" sx={{color: '#5af78e'}}>jasonfzf00</Typography>
          </Box>
        </Box>
      </Paper>
      
      <Box sx={{ mt: 3 }}>
        <Terminal/>
      </Box>
    </Container>
  );
};

export default Home; 