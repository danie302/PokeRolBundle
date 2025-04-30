import { Box } from "@mui/material";
import { Pokemon } from "../../types/pokemon";

const PokemonImage = (pokemon: Pokemon) => {

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.isShiny ? 'shiny/' : ''}${pokemon.pokeApiId}.png`;
    return (
        <Box>
            <img src={imageUrl} alt={pokemon.name} />
        </Box>
    );
};

export default PokemonImage;