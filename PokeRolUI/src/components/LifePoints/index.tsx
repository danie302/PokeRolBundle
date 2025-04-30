import { Box, Typography, Slider } from "@mui/material";
import { useState, useEffect } from "react";

interface LifePointsProps {
    maxLifePoints: number;
}

const LifePoints = ({ maxLifePoints }: LifePointsProps) => {
    const [currentLifePoints, setCurrentLifePoints] = useState(maxLifePoints);
    
    // Update currentLifePoints when maxLifePoints changes
    useEffect(() => {
        setCurrentLifePoints(maxLifePoints);
    }, [maxLifePoints]);

    // Prevent division by zero and handle initial state
    const percentage = maxLifePoints > 0 ? (currentLifePoints / maxLifePoints) * 100 : 0;

    const getLifeBarColor = () => {
        if (percentage > 60) return '#4CAF50'; // Green
        if (percentage > 30) return '#FFC107'; // Yellow
        return '#F44336'; // Red
    };

    if (maxLifePoints === 0) {
        return (
            <Box sx={{
                display: 'flex',
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
                    sx={{ 
                        fontWeight: 'bold',
                        color: '#3B4CCA',
                        textAlign: 'center',
                        mb: 2,
                    }}
                >
                    Loading...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
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
                sx={{ 
                    fontWeight: 'bold',
                    color: `${getLifeBarColor()}`,
                    textAlign: 'center',
                    mb: 2,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
            >
                Life Points
            </Typography>
            
            <Box sx={{ 
                position: 'relative',
                height: 30,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 15,
                overflow: 'hidden',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
            }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${percentage}%`,
                        backgroundColor: getLifeBarColor(),
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'white',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                            position: 'absolute',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        {currentLifePoints}/{maxLifePoints}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Slider
                    value={currentLifePoints}
                    onChange={(_, newValue) => setCurrentLifePoints(newValue as number)}
                    min={0}
                    max={maxLifePoints}
                    sx={{
                        color: getLifeBarColor(),
                        '& .MuiSlider-thumb': {
                            width: 20,
                            height: 20,
                            backgroundColor: '#3B4CCA',
                            '&:hover': {
                                boxShadow: '0 0 0 8px rgba(59, 76, 202, 0.16)',
                            },
                        },
                        '& .MuiSlider-track': {
                            backgroundColor: getLifeBarColor(),
                        },
                        '& .MuiSlider-rail': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default LifePoints;