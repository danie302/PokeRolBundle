import React from 'react';
import { Box, TextField, Button, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isSearching
}) => {
  const { t } = useTranslation();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ mb: 3, mt: 3 }}>
      <TextField
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={t('search.pokemonNameOrId')}
        helperText={t('search.typeToSearch')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton 
                size="small" 
                onClick={() => setSearchQuery('')}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          sx: { 
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(59, 76, 202, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(59, 76, 202, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B4CCA',
            }
          }
        }}
        disabled={isSearching}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={!searchQuery.trim() || isSearching}
          startIcon={isSearching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          sx={{ 
            bgcolor: '#3B4CCA',
            borderRadius: 2,
            px: 3,
            '&:hover': {
              bgcolor: '#2A3A9B'
            }
          }}
        >
          {isSearching ? t('search.searching') : t('search.search')}
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar; 