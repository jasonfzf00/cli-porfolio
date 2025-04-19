import React from 'react';
import { Typography, Card, Box, Stack, Chip, Button, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  elevation?: number;
  borderColor?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  elevation = 3, 
  borderColor = '#5af78e' 
}) => {
  return (
    <Card 
      elevation={elevation} 
      className="project-item" 
      sx={{ 
        p: 2.5, 
        borderLeft: `3px solid ${borderColor}`,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }
      }}
    >
      <Typography 
        variant="h6" 
        component="h3" 
        color="primary" 
        gutterBottom 
      >
        {project.title}
      </Typography>
      
      <Typography variant="body2">
        {project.description}
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, mb: 2 }}>
        {project.technologies.map((tech, index) => (
          <Chip 
            key={index}
            label={tech} 
            size="small" 
            sx={{ bgcolor: '#4a4a4a', color: 'secondary.main' }} 
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
        {project.github && (
          <Button 
            startIcon={<GitHubIcon />} 
            size="small" 
            variant="outlined" 
            color="secondary"
            component={Link}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </Button>
        )}
        {project.link && (
          <Button 
            startIcon={<LaunchIcon />} 
            size="small" 
            variant="contained" 
            color="primary"
            component={Link}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default ProjectCard; 