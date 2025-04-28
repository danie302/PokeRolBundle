import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTranslation } from 'react-i18next';

interface TeamDescriptionProps {
  description: string;
}

const TeamDescription: React.FC<TeamDescriptionProps> = ({ description }) => {
  const { t } = useTranslation();
  
  if (!description) return null;
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 2,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <DescriptionIcon sx={{ mr: 1, color: '#3B4CCA' }} />
        <Typography variant="h6" fontWeight="500" color="#3B4CCA">
          {t('team.description')}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
        {description}
      </Typography>
    </Paper>
  );
};

export default TeamDescription; 