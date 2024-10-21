import React from 'react';
import { Switch, Typography, Box } from '@mui/material';

interface SwitchViewProps {
  showJson: boolean;
  setShowJson: (value: boolean) => void;
}

const SwitchView: React.FC<SwitchViewProps> = ({ showJson, setShowJson }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
    <Switch checked={showJson} onChange={() => setShowJson(!showJson)} color="primary" />
    <Typography variant="body1" sx={{ ml: 2 }}>
      Components View / Toggle JSON
    </Typography>
  </Box>
);

export default SwitchView;
