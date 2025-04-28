import { Pokemon } from '../../types/pokemon';

export interface Team {
  id: string;
  name: string;
  pokemons: Pokemon[];
}

export interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTeam: (team: Omit<Team, 'id'>) => void;
}

export interface PokemonSelectorProps {
  selectedPokemons: Pokemon[];
  onAddPokemon: (pokemon: Pokemon) => void;
  onRemovePokemon: (pokemonId: string) => void;
}

export interface SelectedPokemonListProps {
  pokemons: Pokemon[];
  onRemove: (pokemonId: string) => void;
} 