import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import error from '../assets/error.png';
const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      bgcolor="#f0f0f0"
      padding={3}
      textAlign="center"
    >
      <Box
        component="img "
        src={error}
        alt="404 Error"
        sx={{ maxWidth: '80%', height: '60%', marginBottom: 4 }}
      />
      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{
          textTransform: 'none',
          borderRadius: '20px',
          padding: '10px 20px',
          backgroundColor: 'rgba(108, 18, 108, 0.9)',
          '&:hover': {
            backgroundColor: 'rgba(108, 18, 108, 0.7)',
          },
        }}
      >
        Go to Home Page
      </Button>
    </Box>
  );
};

export default NotFound;
