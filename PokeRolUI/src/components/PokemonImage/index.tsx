import { Box } from "@mui/material";
import { Pokemon } from "../../types/pokemon";

const PokemonImage = (pokemon: Pokemon) => {

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.isShiny ? 'shiny/' : ''}${pokemon.pokeApiId}.png`;
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
        }}>
            <img src={imageUrl} alt={pokemon.name} style={{ width: '100%', height: '100%' }} />
        </Box>
    );
};

export default PokemonImage;