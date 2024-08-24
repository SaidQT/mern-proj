import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login"); // Navigate back to the previous page
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mr: 1 }} />
        <Typography variant="h4" component="h1" color="error">
          Access Denied
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mb: 4 }}>
        You do not have the necessary permissions to view this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ textTransform: 'none' }}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default AccessDenied;