import React from 'react';
import About from './About.jsx';
import Connect from './Connect.jsx';
import Projects from './Projects.jsx';
import AnimatedSection from './animations/AnimatedSection.jsx';

const Home = () => (
  <div className="min-h-screen pb-16">
    <div className="space-y-16">
      <AnimatedSection 
        id="about" 
        animation="fadeInUp" 
        delay={200}
        className="scroll-mt-20"
      >
        <About />
      </AnimatedSection>
      
      <AnimatedSection 
        id="projects" 
        animation="fadeInUp" 
        delay={400}
        className="scroll-mt-20"
      >
        <Projects />
      </AnimatedSection>
      
      <AnimatedSection 
        id="connect" 
        animation="fadeInUp" 
        delay={600}
        className="scroll-mt-20"
      >
        <Connect />
      </AnimatedSection>
    </div>
  </div>
);

export default Home;