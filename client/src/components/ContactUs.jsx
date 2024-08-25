import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error for the specific field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setErrors({}); // Clear all previous errors

    axios.post('/api/contact', formData)
      .then((response) => {
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          console.log('Errors from backend:', error.response.data.errors); // Debugging line
          setErrors(error.response.data.errors);
        } else {
          setErrorMessage('There was an error sending your message. Please try again.');
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            helperText={errors.name}
            FormHelperTextProps={{ style: { color: 'red' } }} // Style the error text in red
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            helperText={errors.email}
            FormHelperTextProps={{ style: { color: 'red' } }} // Style the error text in red
          />
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            helperText={errors.subject}
            FormHelperTextProps={{ style: { color: 'red' } }} // Style the error text in red
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
            variant="outlined"
            helperText={errors.message}
            FormHelperTextProps={{ style: { color: 'red' } }} 
          />
        <Button
             type="submit"
              variant="contained"
            fullWidth
            sx={{ 
            mt: 3, 
         backgroundColor: 'rgba(108, 18, 108, 0.9)', 
          color: 'white', 
            '&:hover': {
             backgroundColor: '#c6b200', 
             color:'black'
    }
  }}
>
  Send Message
</Button>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>
            Our Contact Information
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <FaPhoneAlt />
            <Typography variant="body1" sx={{ ml: 2 }}>
             +970598963708
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <FaEnvelope />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Quizy@gmail.com
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <FaMapMarkerAlt />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Masayef , Ramallah , Palestine
            </Typography>
          </Box>
        </Box>
       
        <Box sx={{ mt: 5 }}>
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      </Container>
    </motion.div>
  );
};

export default ContactUs;
