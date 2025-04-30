import { Box, Typography, Paper } from "@mui/material";
import { capitalizeFirstLetter } from "../../utils/utils";
import { typeColors } from "../TeamDetails/constants/typeColors";

interface PokemonAbilityProps {
    name: string;
    description: string;
    type: string;
}

const PokemonAbility = ({ name, description, type }: PokemonAbilityProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                paddingRight: 0,
                mt: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Decorative elements */}
            <Box sx={{
                position: 'absolute',
                right: -20,
                top: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(59, 76, 202, 0.05)',
                zIndex: 0
            }} />
            <Box sx={{
                position: 'absolute',
                left: -30,
                bottom: -30,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'rgba(59, 76, 202, 0.03)',
                zIndex: 0
            }} />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: 'black',
                        fontWeight: 'bold',
                        mb: 2,
                        textTransform: 'capitalize',
                        display: 'flex',
                        alignItems: 'center',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        gap: 1,
                    }}
                >
                    {capitalizeFirstLetter(name)}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                        position: 'relative',
                        pl: 2,
                        borderLeft: `3px solid ${typeColors[type]}`,
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Paper>
    );
};

export default PokemonAbility;