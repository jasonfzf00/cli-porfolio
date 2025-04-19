import React from 'react';
import { 
  Typography, 
  Box, 
  Paper,
} from '@mui/material';

interface Education {
  degree: string;
  institution: string;
  period: string;
}

interface EducationSectionProps {
  educations: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ educations }) => {
  return (
    <Box className="resume-section">
      <Typography 
        variant="h6" 
        component="h3" 
        color="secondary"
        sx={{ mb: 2 }}
      >
        Education
      </Typography>
      
      {educations.map((education, index) => (
        <Paper 
          key={index}
          elevation={0} 
          sx={{ 
            bgcolor: 'transparent', 
            pl: 2, 
            borderLeft: '2px solid #444',
            mb: index < educations.length - 1 ? 2 : 0
          }}
        >
          <Typography 
            variant="h6" 
            component="h4" 
            sx={{ mb: 0.5 }}
          >
            {education.institution}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
          >
            {education.degree} | {education.period}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default EducationSection; 