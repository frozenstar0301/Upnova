import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

interface ButtonDetailsProps {
  primaryButton: any;
}

const ButtonDetails: React.FC<ButtonDetailsProps> = ({ primaryButton }) => (
  <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
    {primaryButton && (
      <Card elevation={3}>
        <CardContent>
          {Object.entries(primaryButton).map(([key, value]) => (
            <Typography key={key} variant="body1" sx={{ mb: 1 }}>
              <strong>{key}:</strong> {value != null ? value.toString() : 'N/A'}
            </Typography>
          ))}
        </CardContent>
      </Card>
    )}
  </Box>
);

export default ButtonDetails;
