import React from 'react';
import { List, ListItem, ListItemText, Collapse, Typography } from '@mui/material';
import { FontInfo } from '../store/stylesSlice';

interface FontListProps {
  fonts: FontInfo[];
}

const FontList: React.FC<FontListProps> = ({ fonts }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <List>
        <ListItem onClick={() => setOpen(!open)} sx={{ '&:hover': { bgcolor: 'primary.light' } }}>
          <ListItemText primary={<Typography variant="h6">Fonts ({fonts.length})</Typography>} />
        </ListItem>
      </List>
      <Collapse in={open}>
        <List>
          {fonts.map((font, index) => (
            <ListItem key={index} sx={{ '&:hover': { bgcolor: 'grey.100' } }}>
              <ListItemText
                primary={<Typography variant="body1">{font.family}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2">Variants: {font.variants}</Typography>
                    <Typography variant="body2">URL: {font.url}</Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default FontList;
