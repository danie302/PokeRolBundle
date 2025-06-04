import { Box, Typography } from "@mui/material";
import { Pokemon } from "../../types/pokemon";
import StatBar from "./StatBar";
interface PokemonStatsProps {
    pokemon: Pokemon;
}

const PokemonStats = ({ pokemon }: PokemonStatsProps) => {
    const { stats, ivs, evs } = pokemon;

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 2,
            marginTop: 2,
            justifyContent: 'space-between',
        }}>
            {/* Stats */}
            <Box sx={{
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                width: {
                    xs: '100%',
                    md: '30%',
                },
                gap: 2,
                p: 3,
                marginTop: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',

            }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                    Stats
                </Typography>
                <StatBar stat="HP" value={stats.hp} maxValue={400} />
                <StatBar stat="Attack" value={stats.attack} maxValue={400} />
                <StatBar stat="Special Attack" value={stats.specialAttack} maxValue={400} />
                <StatBar stat="Defense" value={stats.defense} maxValue={400} />
                <StatBar stat="Special Defense" value={stats.specialDefense} maxValue={400} />
                <StatBar stat="Speed" value={stats.speed} maxValue={400} />
            </Box>
            {/* IVs */}
            <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                gap: 2,
                p: 3,
                marginTop: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',

            }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                    IVs
                </Typography>
                <StatBar stat="HP" value={ivs.hp} maxValue={31} />
                <StatBar stat="Attack" value={ivs.attack} maxValue={31} />
                <StatBar stat="Special Attack" value={ivs.specialAttack} maxValue={31} />
                <StatBar stat="Defense" value={ivs.defense} maxValue={31} />
                <StatBar stat="Special Defense" value={ivs.specialDefense} maxValue={31} />
                <StatBar stat="Speed" value={ivs.speed} maxValue={31} />
            </Box>
            {/* EVs */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: 2,
                p: 3,
                marginTop: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',

            }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                    EVs
                </Typography>
                <StatBar stat="HP" value={evs.hp} maxValue={255} />
                <StatBar stat="Attack" value={evs.attack} maxValue={255} />
                <StatBar stat="Special Attack" value={evs.specialAttack} maxValue={255} />
                <StatBar stat="Defense" value={evs.defense} maxValue={255} />
                <StatBar stat="Special Defense" value={evs.specialDefense} maxValue={255} />
                <StatBar stat="Speed" value={evs.speed} maxValue={255} />
            </Box>
        </Box>
    );
};

export default PokemonStats;