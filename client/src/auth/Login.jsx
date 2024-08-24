import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { OutlinedInput, Button, Typography, Box, FormControl, InputLabel, FormHelperText, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ usernameOrEmail: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', { email: usernameOrEmail, password: password });
            const { message, token, role } = response.data;
            console.log(response.data);

            // Clear any existing errors
            setErrors({ usernameOrEmail: '', password: '' });

            // Store the token in localStorage (or cookies)
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Redirect to the appropriate dashboard based on role
            if (role === 'admin') {
                navigate('/admin/dashboard'); // Ensure route exists
            } else if (role === 'user') {
                navigate('/'); // Ensure route exists
            } else {
                console.error('Unknown role:', role); // Handle unknown role
                navigate('/login');
            }

        } catch (error) {
            // Extract the error message and set the error state
            const errorMsg = error.response?.data?.message || error.message;

            // Handle specific error messages for each field
            if (errorMsg.includes('email')) {
                setErrors((prevErrors) => ({ ...prevErrors, usernameOrEmail: errorMsg }));
            } else if (errorMsg.includes('password')) {
                setErrors((prevErrors) => ({ ...prevErrors, password: errorMsg }));
            } else {
                console.error('Unexpected error:', errorMsg);
            }
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            />

            <Box sx={{
                maxWidth: 400,
                mx: 'auto',
                mt: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                mb: '130px',
            }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Log In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Tooltip title="Enter your registered email address" arrow>
                        <FormControl fullWidth margin="normal" variant="outlined" >
                            <InputLabel htmlFor="username-or-email" shrink={true}>Email</InputLabel>
                            <OutlinedInput
                                id="username-or-email"
                                type="email"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                                label="Email"
                                notched
                            />
                        </FormControl>
                    </Tooltip>
                    <Tooltip title="Enter your account password" arrow>
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel htmlFor="password" shrink={true}>Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                notched
                            />
                            {errors && <FormHelperText sx={{color:'red', textAlign:'center'}}>{errors.usernameOrEmail}</FormHelperText>}
                        </FormControl>
                    </Tooltip>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{
                                mt: 2,
                                backgroundColor: 'rgba(108, 18, 108, 0.9)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#e6d600',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
}

export default Login;