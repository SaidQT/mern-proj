import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters long';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Email is invalid';
        } else if (value.length < 5) {
          error = 'Email must be at least 5 characters long';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value.length < 6) {
          error = 'Confirmation password must be at least 6 characters long';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const isFormValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key])
    );

    if (!isFormValid) return; // Stop submission if validation fails

    try {
      // Clear any existing errors
      setErrors({});

      // Sending form data to the backend
      await axios.post('http://localhost:8000/api/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Redirect to login on successful registration
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMsg = error.response.data.message;

        // Handle backend validation errors
        if (errorMsg.includes('Username')) {
          setErrors((prevErrors) => ({ ...prevErrors, username: errorMsg }));
        } else if (errorMsg.includes('Email')) {
          setErrors((prevErrors) => ({ ...prevErrors, email: errorMsg }));
        } else if (errorMsg.includes('Password')) {
          setErrors((prevErrors) => ({ ...prevErrors, password: errorMsg }));
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center' style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
      <MDBCard className='text-black w-100' style={{ borderRadius: '15px', maxWidth: '800px' }}>
        <MDBRow className='g-0'>

          <MDBCol md='6' className='d-none d-lg-flex align-items-center justify-content-center' style={{ backgroundColor: 'rgb(123, 44, 123)', borderRadius: '15px 0 0 15px' }}>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' 
            fluid 
            className='w-100' 
            style={{ 
              maxHeight: '100%', 
              objectFit: 'cover', 
              borderRadius: '15px 0 0 15px',
              maxWidth: '100%',
            }}/>
          </MDBCol>

          <MDBCol md='6' className='d-flex flex-column align-items-center justify-content-center p-5'>
            <p className="text-center h1 fw-bold mb-3">Sign up</p>

            <div style={{ width: '100%', maxWidth: '450px', overflowY: 'auto', maxHeight: '70vh' }}>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput 
                    label='Username' 
                    id='form1' 
                    type='text' 
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-100 ${errors.username ? 'is-invalid' : ''}`}
                    size='md' 
                    style={{ height: '45px', fontSize: '1rem' }}
                  />
                </div>
                <div className="text-danger mb-2" style={{ fontSize: '0.9rem', minHeight: '1.2rem' }}>
                  {errors.username}
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput 
                    label='Your Email' 
                    id='form2' 
                    type='email' 
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-100 ${errors.email ? 'is-invalid' : ''}`}
                    size='md' 
                    style={{ height: '45px', fontSize: '1rem' }}
                  />
                </div>
                <div className="text-danger mb-2" style={{ fontSize: '0.9rem', minHeight: '1.2rem' }}>
                  {errors.email}
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput 
                    label='Password' 
                    id='form3' 
                    type='password' 
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-100 ${errors.password ? 'is-invalid' : ''}`}
                    size='md' 
                    style={{ height: '45px', fontSize: '1rem' }}
                  />
                </div>
                <div className="text-danger mb-2" style={{ fontSize: '0.9rem', minHeight: '1.2rem' }}>
                  {errors.password}
                </div>

                <div className="d-flex flex-row align-items-center mb-3">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput 
                    label='Repeat your password' 
                    id='form4' 
                    type='password' 
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-100 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    size='md' 
                    style={{ height: '45px', fontSize: '1rem' }}
                  />
                </div>
                <div className="text-danger mb-2" style={{ fontSize: '0.9rem', minHeight: '1.2rem' }}>
                  {errors.confirmPassword}
                </div>

                <div className="d-flex justify-content-center">
                  <MDBBtn 
                    className='mb-4' 
                    size='md' 
                    type='submit' 
                    style={{ width: '60%', padding: '10px', borderRadius: '5px',   backgroundColor: 'rgba(108, 18, 108, 0.9)', color:'white' }}>
                    Register
                  </MDBBtn>
                </div>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
