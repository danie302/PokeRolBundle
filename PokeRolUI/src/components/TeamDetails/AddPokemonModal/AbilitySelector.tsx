import React, { useState, useEffect, useCallback, memo } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Paper,
  Tooltip,
  CircularProgress
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface Ability {
  name: string;
  description: string;
  is_hidden: boolean;
}

interface AbilitySelectorProps {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }[];
  selectedAbility: Ability | null;
  onSelectAbility: (ability: Ability) => void;
}

// Create a stable version of the ability option to prevent re-renders
const AbilityOption = memo(({ 
  ability, 
  isSelected, 
  t 
}: { 
  ability: Ability, 
  isSelected: boolean,
  t: (key: string) => string
}) => (
  <Box 
    key={ability.name}
    sx={{
      mb: 1.5,
      border: '1px solid',
      borderColor: isSelected ? '#3B4CCA' : 'rgba(0,0,0,0.1)',
      borderRadius: 1,
      p: 1,
      bgcolor: isSelected ? 'rgba(59, 76, 202, 0.05)' : 'transparent',
      transition: 'all 0.2s ease'
    }}
  >
    <FormControlLabel
      value={ability.name}
      control={<Radio sx={{ color: '#3B4CCA' }} />}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="body1" 
            sx={{ 
              textTransform: 'capitalize',
              fontWeight: 'medium'
            }}
          >
            {ability.name.replace('-', ' ')}
          </Typography>
          {ability.is_hidden && (
            <Typography 
              variant="caption" 
              sx={{ 
                ml: 1, 
                bgcolor: 'rgba(59, 76, 202, 0.1)', 
                px: 1, 
                py: 0.3, 
                borderRadius: 1,
                color: '#3B4CCA'
              }}
            >
              {t('pokemon.hiddenAbility')}
            </Typography>
          )}
        </Box>
      }
      sx={{ width: '100%', m: 0 }}
    />
    <Typography 
      variant="body2" 
      color="text.secondary" 
      sx={{ 
        ml: 4, 
        mt: 0.5, 
        display: 'flex', 
        alignItems: 'flex-start' 
      }}
    >
      {ability.description}
    </Typography>
  </Box>
));

const AbilitySelector: React.FC<AbilitySelectorProps> = ({
  abilities,
  selectedAbility,
  onSelectAbility
}) => {
  const { t } = useTranslation();
  const [abilitiesWithDescription, setAbilitiesWithDescription] = useState<Ability[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Memoize the handling of ability selection
  const handleAbilityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = abilitiesWithDescription.find(a => a.name === e.target.value);
    if (selected) onSelectAbility(selected);
  }, [abilitiesWithDescription, onSelectAbility]);

  // Initialize abilities once when the component mounts or when abilities prop changes
  useEffect(() => {
    let isMounted = true;
    
    const fetchAbilityDescriptions = async () => {
      setLoading(true);
      try {
        const abilityPromises = abilities.map(async (abilityItem) => {
          const response = await axios.get(abilityItem.ability.url);
          
          // Find English description
          const englishDescription = response.data.effect_entries.find(
            (entry: any) => entry.language.name === 'en'
          );
          
          return {
            name: abilityItem.ability.name,
            description: englishDescription ? englishDescription.effect : t('pokemon.noDescriptionAvailable'),
            is_hidden: abilityItem.is_hidden
          };
        });
        
        const abilitiesData = await Promise.all(abilityPromises);
        
        if (isMounted) {
          setAbilitiesWithDescription(abilitiesData);
          
          // Auto-select the first ability if none is selected
          if (!selectedAbility && abilitiesData.length > 0) {
            onSelectAbility(abilitiesData[0]);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching ability descriptions:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    if (abilities.length > 0) {
      fetchAbilityDescriptions();
    } else {
      setAbilitiesWithDescription([]);
      setLoading(false);
    }
    
    return () => {
      isMounted = false;
    };
  }, [abilities, onSelectAbility, t]); // Remove selectedAbility from dependency array

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <CircularProgress size={24} sx={{ color: '#3B4CCA' }} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {t('pokemon.loadingAbilities')}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mt: 2, 
        bgcolor: 'rgba(0,0,0,0.02)',
        borderRadius: 2
      }}
    >
      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
        {t('pokemon.selectAbility')}
      </Typography>
      
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup 
          value={selectedAbility?.name || ''}
          onChange={handleAbilityChange}
        >
          {abilitiesWithDescription.map((ability) => (
            <AbilityOption 
              key={ability.name}
              ability={ability}
              isSelected={selectedAbility?.name === ability.name}
              t={t}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default memo(AbilitySelector); 