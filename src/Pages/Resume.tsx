import React from 'react';
import { 
  Typography, 
  Container,
  Stack,
  Divider 
} from '@mui/material';
import './Pages.css';
import { 
  SkillsSection, 
  ExperienceSection, 
  EducationSection 
} from '../components/Resume';
import { resumeData } from '../data/resume';

const Resume: React.FC = () => {
  return (
    <Container className="page resume-page">
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ borderBottom: '1px solid #444', pb: 1 }}
      >
        Jason Zefeng Fu
      </Typography>
      
      <Stack spacing={4}>
        <EducationSection educations={resumeData.educations} />
        
        <Divider sx={{ borderColor: '#444' }} />
        
        <ExperienceSection experiences={resumeData.experiences} />
        
        <Divider sx={{ borderColor: '#444' }} />

        <SkillsSection 
          programmingLanguages={resumeData.programmingLanguages}
          databases={resumeData.databases}
          cloud={resumeData.cloud}
          devOps={resumeData.devOps}
          aiTools={resumeData.aiTools}
          others={resumeData.others}
        />

      </Stack>
    </Container>
  );
};

export default Resume; 