import React from 'react';
import { 
  Typography, 
  Box, 
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <Box className="resume-section">
      <Typography 
        variant="h6" 
        component="h3" 
        color="secondary"
        sx={{ mb: 2 }}
      >
        Experience
      </Typography>
      
      {experiences.map((experience, index) => (
        <Paper 
          key={index}
          elevation={0} 
          sx={{ 
            bgcolor: 'transparent', 
            pl: 2, 
            borderLeft: '2px solid #444',
            mb: index < experiences.length - 1 ? 3 : 0
          }}
        >
          <Typography 
            variant="h6" 
            component="h4" 
            sx={{ mb: 0.5 }}
          >
            {experience.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 1.5 }}
          >
            {experience.company} | {experience.period}
          </Typography>
          
          <List dense disablePadding>
            {experience.responsibilities.map((item, i) => (
              <ListItem key={i} sx={{ pl: 0 }}>
                <ListItemText 
                  primary={item}
                  slotProps={{primary: {variant: 'body2'}}}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Box>
  );
};

export default ExperienceSection; 