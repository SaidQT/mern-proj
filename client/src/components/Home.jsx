import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faJsSquare, faJava, faReact, faNodeJs, faPython } from '@fortawesome/free-brands-svg-icons';
import styles from './Home.module.css'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/user/dashboard")
  }
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5 }}
      className={styles.heroSection} 
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: 'white',
        backgroundSize: 'cover',
      }}
    >
      <Typography
        variant="h2"
        component={motion.h2}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className={styles.headline} 
      >
        <Typewriter
          options={{
            strings: ["Test Your Knowledge of Coding Skills!", "Master the Web, One Quiz at a Time."],
            autoStart: true,
            loop: true,
            typeSpeed: 40,
            backSpeed: 50,
          }}
        />
      </Typography>
      
      {/* Robot Image and Speech Bubble */}
      <Box className={styles.robotContainer}>
      {/* <div className={styles.speechBubble}>
          <p>Hello There!</p>
        </div> */}
      <img src="https://i.gifer.com/3q63.gif" alt="Robot" className={styles.robotImage} />
        <div className={styles.speechBubble}>
          <p>Hello There!</p>
        </div>
      </Box>

      <Typography
        variant="h6"
        component={motion.p}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className={styles.subheadline}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <FontAwesomeIcon icon={faHtml5} size="3x" color="#e44d26" title="HTML" />
          <FontAwesomeIcon icon={faCss3Alt} size="3x" color="#1572b6" title="CSS" />
          <FontAwesomeIcon icon={faJsSquare} size="3x" color="#f7df1e" title="JavaScript" />
          <FontAwesomeIcon icon={faJava} size="3x" color="#007396" title="Java" />
          <FontAwesomeIcon icon={faReact} size="3x" color="#61dafb" title="React" />
          <FontAwesomeIcon icon={faNodeJs} size="3x" color="#8CC84B" title="Node.js" />
          <FontAwesomeIcon icon={faPython} size="3x" color="#3776AB" title="Python" />
        </Box>
      </Typography>
      
      <Button
        
        component={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        variant="contained"
        color="secondary"
        className={styles.ctaButton} 
        onClick={handleClick}
      >
        Go to Quiz Room
      </Button>
    </Box>
  );
};

export default Home;
