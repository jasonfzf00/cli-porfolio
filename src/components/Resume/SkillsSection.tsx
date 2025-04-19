import React from 'react';
import { 
  Typography, 
  Box, 
  Chip,
  Stack,
  Paper
} from '@mui/material';

interface FrameworkLibrary {
  name: string;
}

interface ProgrammingLanguage {
  name: string;
  frameworks?: FrameworkLibrary[];
}

interface SkillCategory {
  title: string;
  skills: string[];
}

interface SkillsSectionProps {
  programmingLanguages: ProgrammingLanguage[];
  databases: string[];
  cloud: string[];
  devOps: string[];
  aiTools: string[];
  others: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ 
  programmingLanguages,
  databases,
  cloud,
  devOps,
  aiTools,
  others
}) => {
  
  const renderSkillCategory = (title: string, skills: string[]) => (
    <Box sx={{ mb: 2 }}>
      <Typography 
        variant="subtitle1" 
        component="h4" 
        sx={{ mb: 1 }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill, index) => (
          <Chip 
            key={index} 
            label={skill} 
            sx={{ bgcolor: '#3a3a3a' }} 
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box className="resume-section">
      <Typography 
        variant="h6" 
        component="h3" 
        color="secondary"
        sx={{ mb: 2 }}
      >
        Skills
      </Typography>

      <Stack spacing={2}>
        {/* Programming Languages with frameworks/libraries */}
        <Box>
          <Typography 
            variant="subtitle1" 
            component="h4" 
            sx={{ mb: 1 }}
          >
            Programming Languages
          </Typography>
          
          {programmingLanguages.map((lang, index) => (
            <Paper 
              key={index}
              elevation={0} 
              sx={{ 
                bgcolor: 'transparent', 
                pl: 2, 
                mb: 2,
                borderLeft: '2px solid #444',
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Typography 
                  variant="body2" 
                  component="h5" 
                  color="secondary"
                >
                  {lang.name}
                </Typography>
              </Box>
              
              {lang.frameworks && lang.frameworks.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, pl: 1 }}>
                    {lang.frameworks.map((framework, idx) => (
                      <Chip 
                        key={idx} 
                        label={framework.name} 
                        size="small"
                        sx={{ bgcolor: '#2a2a2a' }} 
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Paper>
          ))}
        </Box>

        {renderSkillCategory('Databases', databases)}
        {renderSkillCategory('Cloud', cloud)}
        {renderSkillCategory('DevOps', devOps)}
        {renderSkillCategory('AI & Tools', aiTools)}
        {renderSkillCategory('Others', others)}
      </Stack>
    </Box>
  );
};

export default SkillsSection; 