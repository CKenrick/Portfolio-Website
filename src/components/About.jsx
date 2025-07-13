import React, { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage.jsx';
import { profileImg } from '../images/optimized/index.js';

const About = () => {
  const [placeholderDataURL, setPlaceholderDataURL] = useState('');

  useEffect(() => {
    // Load the blur placeholder
    profileImg.placeholder.placeholder().then(setPlaceholderDataURL);
  }, []);

  return (
    <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="section-title text-center text-4xl font-bold text-gray-900 dark:text-white">About</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        <div className="md:col-span-1 flex justify-center">
          <OptimizedImage
            src={profileImg.medium.jpg}
            webpSrc={profileImg.medium.webp}
            alt="Christopher Kenrick"
            className="profile-img max-w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            width={640}
            height={640}
            blurDataURL={placeholderDataURL}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            lazy={true}
            priority={false}
          />
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            As an experienced Frontend Software Engineer and certified Scrum Master, I have a demonstrated history of working in the education, environmental finance, and nonprofit industries. My expertise lies in a variety of programming languages, frameworks, and libraries, with a current focus on VueJS, Vite, Pinia, and Vuetify. I am always eager to expand my knowledge and learn new languages.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            My career has provided me with the opportunity to contribute to impactful projects. At Renaissance Education&apos;s eduCLIMBER, I implemented a new SPA using VueJS, Vite, Pinia, and Vuetify and was a major contributor to the internal component library. I also took the lead in transferring legacy pages from extJS to VueJS and managed the product backlog as a Scrum Master, leading the team using Agile project management. Before that, at IO Education, I converted outdated frontend code to the ReactJS library and led the frontend development of a central dashboard for five separate company products.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            I hold a Master of Science in Information Science and a Master of Public Administration from The University of North Carolina at Chapel Hill, as well as a Bachelor of Arts in Philosophy from The University of Texas Pan American.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;