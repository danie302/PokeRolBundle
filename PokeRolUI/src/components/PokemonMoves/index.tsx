import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Move } from "../../types/pokemon";
import { typeColors } from "../TeamDetails/constants/typeColors";
import { capitalizeFirstLetter } from "../../utils/utils";

interface PokemonMovesProps {
    moves: Move[];
}

const PokemonMoves = ({ moves }: PokemonMovesProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
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

            <Box sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: 'black',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        fontWeight: 'bold',
                        mb: 2,
                        textTransform: 'capitalize',
                    }}
                >
                    Moves
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Power</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Accuracy</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {moves.map((move, index) => (
                                <TableRow 
                                    key={index}
                                    sx={{ 
                                        '&:nth-of-type(odd)': { 
                                            backgroundColor: 'rgba(0, 0, 0, 0.02)' 
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(59, 76, 202, 0.05)',
                                        }
                                    }}
                                >
                                    <TableCell sx={{ textTransform: 'capitalize' }}>
                                        {capitalizeFirstLetter(move.name)}
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: 'inline-block',
                                                width: '70px',
                                                textAlign: 'center',
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1,
                                                backgroundColor: typeColors[move.type] || '#A8A77A',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                textTransform: 'capitalize',
                                                textShadow: '1px 1px 5px rgba(0,0,0,0.2)',
                                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.82)',
                                            }}
                                        >
                                            {move.type}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{move.power || '-'}</TableCell>
                                    <TableCell>{move.accuracy || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
};

export default PokemonMoves;