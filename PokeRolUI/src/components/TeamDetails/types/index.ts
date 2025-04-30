export interface PokemonSearchResult {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  nature: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
};

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface AddPokemonModalProps {
  open: boolean;
  teamId: string;
  onClose: () => void;
  onPokemonAdded: () => void;
}

export interface PokemonCardProps {
  pokemon: PokemonSearchResult;
  selected: boolean;
  onSelect: (pokemon: PokemonSearchResult) => void;
}

export interface PokemonDetailsSectionProps {
  selectedPokemon: PokemonSearchResult | null;
  nickname: string;
  setNickname: (value: string) => void;
  level: number;
  setLevel: (value: number) => void;
  handleAddToTeam: () => void;
  loading: boolean;
} 