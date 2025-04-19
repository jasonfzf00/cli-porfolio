import React from 'react';
import { Typography, Container, Stack } from '@mui/material';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { projects } from '../data/projects';
import './Pages.css';

const Projects: React.FC = () => {
  return (
    <Container className="page projects-page">
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ borderBottom: '1px solid #444', pb: 1 }}
      >
        Projects
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        Here are some of my recent projects:
      </Typography>
      
      <Stack spacing={2.5} className="projects-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Stack>
    </Container>
  );
};

export default Projects; 