import React from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          width: '100%',
          bgcolor: 'rgba(108, 18, 108, 0.9)',
          color: 'white',
          py: 2,
          textAlign: 'center',
          position: 'relative',
          bottom: 0,
        }}
      >
        <Container>
          <Typography variant="body2" sx={{ mb: 1 }}>
            © 2024 Quizzes Hub. All rights reserved.
          </Typography>
          <Typography variant="body2">
            Follow us on:
          </Typography>
          <Box sx={{ mt: 1 }}>
            <IconButton 
              color="inherit" 
              href="https://facebook.com" 
              aria-label="Facebook"
              sx={{ 
                '&:hover': {
                  color: '#4267B2',
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                }
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              href="https://twitter.com" 
              aria-label="Twitter"
              sx={{ 
                '&:hover': {
                  color: '#1DA1F2',
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                }
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              href="https://linkedin.com" 
              aria-label="LinkedIn"
              sx={{ 
                '&:hover': {
                  color: '#0077B5',
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                }
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Footer;
