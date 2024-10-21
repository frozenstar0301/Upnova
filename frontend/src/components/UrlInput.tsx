import React from 'react';
import { TextField, Button, Box } from '@mui/material';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  handleScrap: () => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl, handleScrap }) => (
    <Box my={2}>
      <TextField
        label="Shopify Product URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mb: 2 }} // Adds margin-bottom to the input field
      />
      <Button variant="contained" color="primary" onClick={handleScrap}>
        Scrap
      </Button>
    </Box>
  );
  

export default UrlInput;
