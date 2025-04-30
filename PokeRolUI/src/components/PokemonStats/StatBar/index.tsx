import { Box, Typography } from "@mui/material";

interface StatBarProps {
    stat: string;
    value: number;
    maxValue: number;
}

const StatBar = ({ stat, value, maxValue }: StatBarProps) => {
    const percentage = (value / maxValue) * 100;

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 1,
            width: '100%',
        }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Typography 
                    variant="subtitle1" 
                    sx={{ 
                        fontWeight: 'bold',
                        color: 'black',
                        textTransform: 'capitalize',
                    }}
                >
                    {stat}
                </Typography>
                <Typography 
                    variant="subtitle1" 
                    sx={{ 
                        fontWeight: 'bold',
                        color: 'black',
                    }}
                >
                    {value}
                </Typography>
            </Box>
            
            <Box sx={{ 
                position: 'relative',
                height: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
            }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${percentage}%`,
                        backgroundColor: '#F44336',
                        transition: 'all 0.3s ease',
                    }}
                />
            </Box>
        </Box>
    );
};

export default StatBar;