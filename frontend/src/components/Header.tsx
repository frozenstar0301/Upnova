import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => (
  <AppBar position="static" sx={{ background: 'linear-gradient(to right, #2196F3, #21CBF3)' }}>
    <Toolbar>
      <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
        Shopify Scraper
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
