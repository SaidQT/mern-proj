import React, { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Laith from './laith.png';
import Ola from './ola.png';
import Moon from './moon.webp';
import background2 from './background2.jpeg';

const About = () => {
  const ref = useRef();


  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Parallax pages={4} ref={ref}>
        {/* Background Layer 1 */}
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Moon})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            width: '100vw',
            height: '100vh'
          }}
        >
          <h1 style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -30%)',
            color: '#fff',
            fontSize: '5rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            padding:'2rem',
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), #ffff",
            borderRadius:'3rem'

          }}>
            About Us
          </h1>
        </ParallaxLayer>
  
        {/* Our Mission Section */}
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem 2rem',
            textAlign: 'center',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            width:'600px',
            marginLeft:'500px',border:'1px solid black',
          }}
        >
          <div>
          <h2>Our Mission</h2>
          <p>At our core, we aim to provide high-quality quizzes to help individuals enhance their skills in web development technologies like HTML, CSS, JavaScript, React, and MERN stack. Our goal is to make learning engaging and effective through interactive quizzes.</p>
          </div>
         
        </ParallaxLayer>

        {/* Our Services Section */}
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem 2rem',
            textAlign: 'center',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            width:'600px',
            marginLeft:'500px',border:'1px solid black',
          }}
        >
          <div>
          
            <h2>Our Services</h2>
            <p>We offer a range of quizzes and resources tailored to various development technologies. Whether you're looking to test your knowledge in HTML, CSS, JavaScript, React, or the MERN stack, we provide comprehensive quizzes to help you master these skills.</p>
            </div>
          
         
        </ParallaxLayer>
  
        {/* Background Layer 2 */}
        <ParallaxLayer
          offset={3}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `url(${background2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            width: '100vw',
            height: '100vh'
          }}
        />

        <ParallaxLayer
          sticky={{ start: 1, end: 2.5 }}
          style={{ textAlign: 'left' , marginLeft: 100}}
        >
          {/* <img src={cat} alt="Cat" style={{ width: '400px', margin: '0 auto' }} /> */}
        </ParallaxLayer>

        {/* Final Section with Team */}
        <ParallaxLayer
          offset={3.5}
          speed={2}
          style={{ textAlign: 'center', zIndex: 1, padding: '2rem' }}
        >
          <h2>Our Team</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
       
            <div style={{ textAlign: 'center' }}>
              <img
                src={Laith}
                alt="Laith"
                style={{ width: '150px', borderRadius: '10px' }}
              />
              <p>Laith Amer</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img
                src={Ola}
                alt="Ola"
                style={{ width: '150px', borderRadius: '10px' }}
              />
              <p>Ola Jaafreh</p>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default About;
