import { Box, Typography, Paper, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

interface PokemonNotesProps {
    notes: string;
    onNotesChange?: (notes: string) => void;
    editable?: boolean;
    isLoading?: boolean;
}

const PokemonNotes = ({ 
    notes, 
    onNotesChange, 
    editable = false,
    isLoading = false 
}: PokemonNotesProps) => {
    const [content, setContent] = useState(notes);

    // Update content when notes prop changes
    useEffect(() => {
        setContent(notes);
    }, [notes]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = event.target.value;
        setContent(newContent);
        if (onNotesChange) {
            onNotesChange(newContent);
        }
    };

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
                        fontWeight: 'bold',
                        mb: 2,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                    }}
                >
                    Notes
                </Typography>

                {isLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '200px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <CircularProgress size={24} />
                    </Box>
                ) : editable ? (
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        value={content}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Add your notes here..."
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'rgba(0, 0, 0, 0.1)',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#3B4CCA',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3B4CCA',
                                },
                            },
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            p: 2,
                            minHeight: '200px',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            '& a': {
                                color: '#3B4CCA',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        {content || 'No notes available'}
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default PokemonNotes;