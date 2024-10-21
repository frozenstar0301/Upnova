import React, { useState } from 'react';
import { Typography, Paper, Collapse, Button, Box } from '@mui/material';

interface Font {
  family: string;
  variants: string;
  letterSpacings: string;
  fontWeight: string;
  url: string;
}

interface ResultViewProps {
  fonts: Font[];
  primaryButton: Record<string, any>;
  showJson: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({ fonts, primaryButton, showJson }) => {
  // Create an array of booleans to manage the open/closed state for each font
  const [openStates, setOpenStates] = useState<boolean[]>(Array(fonts.length).fill(false));

  const handleToggle = (index: number) => {
    setOpenStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index]; // Toggle the specific index
      return newStates;
    });
  };

  return (
    <Box sx={{ mt: 3 }}>
      {showJson ? (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">JSON Format</Typography>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify({ fonts, primaryButton }, null, 2)}
          </pre>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Fonts</Typography>
            {fonts.length > 0 ? (
              fonts.map((font, index) => (
                <Box key={index} sx={{ marginBottom: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleToggle(index)} // Call toggle handler
                    sx={{ width: '100%', justifyContent: 'flex-start' }} // Full width button
                  >
                    {font.family} <span style={{ marginLeft: 'auto' }}>{openStates[index] ? '−' : '+'}</span>
                  </Button>
                  <Collapse in={openStates[index]}>
                    <Box sx={{ padding: 1, border: '1px solid #ccc', borderRadius: '4px', marginTop: 1 }}>
                      <Typography variant="body1">
                        <strong>Family:</strong> {font.family}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Variants:</strong> {font.variants}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Letter Spacings:</strong> {font.letterSpacings}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Font Weight:</strong> {font.fontWeight}
                      </Typography>
                      <Button variant="contained" color="primary" href={font.url} target="_blank">
                        View Font
                      </Button>
                    </Box>
                  </Collapse>
                </Box>
              ))
            ) : (
              <Typography>No fonts found.</Typography>
            )}
          </Paper>

          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Primary Button Styles</Typography>
            <Box sx={{ padding: 1, border: '1px solid #ccc', borderRadius: '4px' }}>
              {Object.entries(primaryButton).map(([key, value]) => (
                <Typography key={key} variant="body2">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default ResultView;
