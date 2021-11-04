import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButton() {
  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };
  return (
    <Box sx={fabStyle}>
      <Fab color="primary" aria-label="add" href="/feedbacks/create">
        <AddIcon />
      </Fab>
    </Box>
  );
}
