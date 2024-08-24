import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const gifPaths = {
  home: 'https://img.ws.mms.shopee.co.id/id-11134207-7r990-lquha2wutivhba',
  quizzes: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2E5NHpuZ2o4MDllZnJhanlwbGwwZHAwZXFxeHBqZHhxM3E5NHg3ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cNoyNfdMdkYlQ5FpzZ/giphy.webp',
};

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: .8 }}
    >
      <AppBar position="static" sx={{ bgcolor: 'rgba(108, 18, 108, 0.9)' }}> {/* Background with opacity */}
        <Toolbar>
          <Box 
            component={Link} 
            to="/" 
            sx={{ 
              mr: 2, 
              display: 'flex',
              alignItems: 'center',
              '&:hover img': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease',
              }
            }}
          >
            <img src={gifPaths.home} alt="Home" style={{ height: 32, width: 32 }} />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Quizizz
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component={Link} 
              to="/user/dashboard" 
              sx={{ 
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                '&:hover img': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                }
              }}
            >
              <img src={gifPaths.quizzes} alt="Quizzes" style={{ height: 50, width: 100 }} />
            </Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/about"
              sx={{ 
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                },
                mr: 2,
              }}
            >
              About
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/contact"
              sx={{ 
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                },
                mr: 2,
              }}
            >
              Contact Us
            </Button>
            {token ? (
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ 
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    color: 'white',
                  },
                  mr: 2,
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{ 
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'white',
                    },
                    mr: 2,
                  }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/register"
                  sx={{ 
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'white',
                    }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
