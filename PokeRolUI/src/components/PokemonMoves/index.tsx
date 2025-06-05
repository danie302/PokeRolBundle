import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Chip } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, Shield as PhysicalIcon, Star as SpecialIcon, Healing as StatusIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { Move } from "../../types/pokemon";
import { typeColors } from "../TeamDetails/constants/typeColors";
import { capitalizeFirstLetter } from "../../utils/utils";

interface PokemonMovesProps {
    moves: Move[];
}

const movePower = (power: number) => {
    return Math.ceil(power / 25);
}

const DamageClassIcon = ({ damageClass }: { damageClass: string }) => {
    switch (damageClass?.toLowerCase()) {
        case 'physical':
            return <PhysicalIcon fontSize="small" sx={{ color: '#C03028' }} titleAccess="Físico" />;
        case 'special':
            return <SpecialIcon fontSize="small" sx={{ color: '#6890F0' }} titleAccess="Especial" />;
        case 'status':
            return <StatusIcon fontSize="small" sx={{ color: '#78C850' }} titleAccess="Estado" />;
        default:
            return null;
    }
};

const PokemonMovesRow = ({ move }: { move: Move }) => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <TableRow 
                sx={{ 
                    '&:nth-of-type(odd)': { 
                        backgroundColor: 'rgba(0, 0, 0, 0.02)' 
                    },
                    '& > *': { borderBottom: 'unset' },
                    '&:hover': {
                        backgroundColor: 'rgba(59, 76, 202, 0.05)',
                    }
                }}
            >
                <TableCell sx={{ width: '50px' }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize', fontWeight: 'medium' }}>
                    {capitalizeFirstLetter(move.name.replace(/-/g, ' '))}
                </TableCell>
                <TableCell>
                    <Chip 
                        label={move.type}
                        size="small"
                        sx={{
                            backgroundColor: typeColors[move.type.toLowerCase()] || '#A8A77A',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            fontSize: '0.75rem',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                            minWidth: '65px',
                            height: '22px'
                        }}
                    />
                </TableCell>
                <TableCell align="center">
                    {move.power ? (
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {movePower(move.power)}
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="text.secondary">-</Typography>
                    )}
                </TableCell>
                <TableCell align="center">
                    {move.accuracy ? (
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {move.accuracy}%
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="text.secondary">-</Typography>
                    )}
                </TableCell>
                <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        <DamageClassIcon damageClass={move.damage_class} />
                        <Typography variant="caption" sx={{ textTransform: 'capitalize', display: { xs: 'none', sm: 'block' } }}>
                            {move.damage_class}
                        </Typography>
                    </Box>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, p: 2, backgroundColor: 'rgba(0,0,0,0.01)', borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom component="div" sx={{ fontWeight: 'bold', color: '#3B4CCA' }}>
                                Descripción:
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', lineHeight: 1.5 }}>
                                {move.description || 'Descripción no disponible.'}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
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
                    <Table aria-label="collapsible table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '50px', py: 1 }} /> 
                                <TableCell sx={{ fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)', py: 1 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)', py: 1 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)', py: 1, textAlign: 'center' }}>Power</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)', py: 1, textAlign: 'center' }}>Accuracy</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'black', textShadow: '1px 1px 2px rgba(0,0,0,0.2)', py: 1, textAlign: 'center' }}>Class</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(moves || []).map((move, index) => (
                                <PokemonMovesRow key={`${move.name}-${index}`} move={move} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
};

export default PokemonMoves;