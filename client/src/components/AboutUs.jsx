
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import laith from './laith.png';
import Sajeda from './Sajeda.jpg';
import profile from './profile.jpg';
import CountUp from 'react-countup';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './About.module.css';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Example chart data
const chartData = {
  labels: ['Visitors', 'Users', 'New Sign-ups', 'Feedbacks'],
  datasets: [
    {
      label: 'Statistics',
      data: [1000, 500, 300, 150],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const AboutContainer = styled.div`
  padding: 50px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: url('/path/to/purple-bubbles-background.gif') no-repeat center center fixed;
  background-size: cover;
`;

const Section = styled(motion.div)`
  margin-bottom: 70px;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 30px;
`;

const SectionContent = styled.p`
  font-size: 1.4rem;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.8;
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const TeamImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const TeamName = styled.h3`
  margin-top: 10px;
  font-size: 1.3rem;
`;


const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
`;

const ChartContainer = styled.div`
  margin-top: 50px;
  max-width: 700px;
  margin: 0 auto;
`;

// Count-up component
const CountUpItem = ({ end, startCount }) => (
  <StatItem>
    <StatNumber>
      <CountUp start={startCount} end={end} duration={2} />
    </StatNumber>
  </StatItem>
);

const AboutUs = () => {
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const statsTop = statsRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (statsTop < windowHeight) {
        setStartCount(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AboutContainer>
      <h1 className={styles.heading}>About Us</h1>
      <Section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionTitle className={styles.sectionTitle}>Our Service</SectionTitle>
        <SectionContent className={styles.sectionContent}>
          We offer interactive quizzes to test and enhance your knowledge in development languages like HTML, CSS, React, and more.
          Our platform is designed to provide a fun and engaging way to learn, ensuring that you can track your progress and improve your skills.
          Whether you're a beginner or an experienced developer, our quizzes cater to all levels.
        </SectionContent>
      </Section>

      <Section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionTitle className={styles.sectionTitle}>Our Mission</SectionTitle>
        <SectionContent className={styles.sectionContent}>
          Our mission is to make learning development languages fun and accessible to everyone through engaging quizzes.
          We aim to build a community of learners who can support each other in their coding journeys.
          Our goal is to empower individuals to achieve their full potential by providing them with the tools and resources they need to succeed.
        </SectionContent>
      </Section>

      <Section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionTitle className={styles.sectionTitle}>Our Team</SectionTitle>
        <TeamContainer>
          <TeamMember>
            <TeamImage src={laith} alt="Laith Amer" />
            <TeamName className={styles.teamName}>Laith Amer</TeamName>
          </TeamMember>
          <TeamMember>
            <TeamImage src={Sajeda} alt="Sajeda Abu Ayyash" />
            <TeamName className={styles.teamName}>Sajeda Abu Ayyash</TeamName>
          </TeamMember>
          <TeamMember>
            <TeamImage src={profile} alt="Saeed Iqtaish" />
            <TeamName className={styles.teamName}>Saeed Iqtaish</TeamName>
          </TeamMember>
        </TeamContainer>
      </Section>

      <Section ref={statsRef}>
        <SectionTitle className={styles.sectionTitle}>Our Stats</SectionTitle>
        <StatsContainer>
          <CountUpItem end={1000} startCount={startCount ? 0 : 1000} />
          <CountUpItem end={500} startCount={startCount ? 0 : 500} />
          <CountUpItem end={300} startCount={startCount ? 0 : 300} />
          <CountUpItem end={150} startCount={startCount ? 0 : 150} />
        </StatsContainer>
        <ChartContainer>
          <Line data={chartData} />
        </ChartContainer>
      </Section>
    </AboutContainer>

  );
};

export default AboutUs;