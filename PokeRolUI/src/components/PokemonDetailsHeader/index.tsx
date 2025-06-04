import { Box, Typography, IconButton } from "@mui/material";
import { getBackgroundGradient, capitalizeFirstLetter } from "../../utils/utils";
import { Pokemon } from "../../types/pokemon";
import PokemonImage from "../PokemonImage";
import { typeColors } from "../TeamDetails/constants/typeColors";
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';

interface PokemonDetailsHeaderProps {
    pokemon: Pokemon;
    onEdit?: () => void;
}

const PokemonDetailsHeader = ({ pokemon, onEdit }: PokemonDetailsHeaderProps) => {
    if (!pokemon.name) {
        return null;
    }

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            background: getBackgroundGradient(pokemon),
            color: 'white',
            paddingTop: 4,
            paddingBottom: 4,
            position: 'relative',
            boxShadow: 3,
        }}>
            <IconButton 
                onClick={onEdit}
                sx={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 16,
                    right: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                }}
            >
                <EditIcon sx={{ zIndex: 1000 }}/>
            </IconButton>
            <Box sx={{
                position: 'absolute',
                right: -20,
                top: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 0
            }} />
            <Box sx={{
                position: 'absolute',
                left: -30,
                bottom: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                zIndex: 0
            }} />
            <Box sx={{
                display: 'flex',
                width: '90%',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                }}>
                    {pokemon.isShiny && <StarIcon sx={{ color: 'yellow', marginTop: 1 }} />}
                    <Typography
                        variant="h3"
                        sx={{ fontWeight: 'bold', color: '#FFDE00', fontFamily: '"Pokemon Solid", sans-serif', textShadow: '3px 3px 0 #3B4CCA' }}
                    >
                        {capitalizeFirstLetter(pokemon.name)} lv.{pokemon.level}
                    </Typography>
                </Box>
                <Box sx={{
                    width: 200,
                    height: 200,
                }}>
                    <PokemonImage {...pokemon} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                }}>
                    <Box sx={{
                        backgroundColor: typeColors[pokemon.type[0]],
                        borderRadius: 2,
                        padding: 1,
                        boxShadow: 6,
                        width: 100,
                        height: 30,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Typography variant="h6" sx={{ color: 'white', textShadow: '1px 2px 10px rgba(0, 0, 0, 0.89)' }}>{capitalizeFirstLetter(pokemon.type[0])}</Typography>
                    </Box>
                    {pokemon.type.length > 1 && (
                        <Box sx={{
                            backgroundColor: typeColors[pokemon.type[1]],
                            borderRadius: 2,
                            padding: 1,
                            boxShadow: 6,
                            width: 100,
                            height: 30,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Typography variant="h6" sx={{ color: 'white', textShadow: '1px 2px 10px rgba(0, 0, 0, 0.89)' }}>{capitalizeFirstLetter(pokemon.type[1])}</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default PokemonDetailsHeader;