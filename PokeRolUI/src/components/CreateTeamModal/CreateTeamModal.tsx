import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';
import { SimplePokemon } from './types';
import { PokemonSelector } from './PokemonSelector';

export interface CreateTeamModalProps {
  open: boolean;
  onClose: () => void;
  onTeamCreated: (team: { name: string, description: string, pokemons: SimplePokemon[] }) => void;
}

export function CreateTeamModal({ open, onClose, onTeamCreated }: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [selectedPokemons, setSelectedPokemons] = useState<SimplePokemon[]>([]);
  
  const handleAddPokemon = (pokemon: SimplePokemon) => {
    if (selectedPokemons.length < 6 && !selectedPokemons.some(p => p.id === pokemon.id)) {
      setSelectedPokemons([...selectedPokemons, pokemon]);
    }
  };

  const handleRemovePokemon = (pokemonId: string) => {
    setSelectedPokemons(selectedPokemons.filter(p => p.id !== pokemonId));
  };

  const handleCreateTeam = async () => {
    // Validation
    if (!teamName.trim()) {
      alert('Please enter a team name');
      return;
    }
    
    if (selectedPokemons.length === 0) {
      alert('Please select at least one Pokémon');
      return;
    }
    
    try {
      // Reset state
      setTeamName('');
      setTeamDescription('');
      setSelectedPokemons([]);
      
      // Notify parent component
      onTeamCreated({
        name: teamName,
        description: teamDescription,
        pokemons: selectedPokemons
      });
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Failed to create team:', error);
      alert('Failed to create team. Please try again.');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          minWidth: '700px',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle>Create New Team</DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Team Name</Typography>
          <TextField
            fullWidth
            value={teamName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamName(e.target.value)}
            placeholder="Enter team name"
          />
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Description (Optional)</Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            value={teamDescription}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamDescription(e.target.value)}
            placeholder="Enter team description"
          />
        </Box>
        
        <PokemonSelector
          selectedPokemons={selectedPokemons}
          onAddPokemon={handleAddPokemon}
          onRemovePokemon={handleRemovePokemon}
        />
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCreateTeam}>
          Create Team
        </Button>
      </DialogActions>
    </Dialog>
  );
} 