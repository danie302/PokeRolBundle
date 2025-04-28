import React from 'react';

export interface SimplePokemon {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
}

export interface Team {
  id: string;
  name: string;
  pokemons: SimplePokemon[];
}

export interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTeam: (team: Omit<Team, 'id'>) => void;
}

export interface PokemonSelectorProps {
  selectedPokemons: SimplePokemon[];
  onAddPokemon: (pokemon: SimplePokemon) => void;
  onRemovePokemon: (pokemonId: string) => void;
}

export interface SelectedPokemonListProps {
  pokemons: SimplePokemon[];
  onRemove: (pokemonId: string) => void;
} 