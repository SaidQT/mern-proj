import React from 'react';
import { motion } from 'framer-motion';
import './Curtain.css';

const Curtain = ({ onCurtainComplete }) => {
  return (
    <div className="curtain">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        onAnimationComplete={onCurtainComplete}
        className="curtain-left"
      ></motion.div>

      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="curtain-right"
      ></motion.div>
    </div>
  );
};

export default Curtain;
