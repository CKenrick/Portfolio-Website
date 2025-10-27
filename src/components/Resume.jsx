import React from 'react';
import { FaLinkedinIn, FaGithub, FaBehance } from 'react-icons/fa';
import AnimatedSection from './animations/AnimatedSection.jsx';
import StaggeredList from './animations/StaggeredList.jsx';

const Resume = () => (
  <div className="min-h-screen py-8 px-4 md:px-8 pb-16">
    <div className="max-w-6xl mx-auto">
      <AnimatedSection animation="fadeInUp" delay={100}>
        <div className="resume-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Main Content */}
            <AnimatedSection 
              animation="fadeInLeft" 
              delay={200}
              className="lg:col-span-2 p-6 lg:p-8 bg-white lg:rounded-l-lg"
            >
              <div className="text-center border-b-4 border-gray-200 pb-6 mb-2">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">Christopher Kenrick</h1>
                <h2 className="text-lg text-gray-600 mb-2">Atlanta, Georgia</h2>
                <h2 className="text-xl text-gray-600 mb-4">Frontend Engineer | UX-Focused Developer | Data Visualization and Design Systems</h2>
                <div className="flex justify-center space-x-6">
                  <a 
                    href="https://www.linkedin.com/in/christopherkenrick/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
                  >
                    <FaLinkedinIn className="text-2xl" />
                  </a>

                  <a 
                    href="https://github.com/CKenrick" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-all duration-200 transform hover:scale-110"
                  >
                    <FaGithub className="text-2xl" />
                  </a>

                  <a 
                    href="https://behance.net/ChristopherKenrick" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800 transition-all duration-200 transform hover:scale-110"
                  >
                    <FaBehance className="text-2xl" />
                  </a>
                </div>
              </div>
              <div className="py-4 mb-4">
                <h3 className="text-2xl font-bold text-yellow-400 text-center mb-2">PROFESSIONAL SUMMARY</h3>
                <div className="pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">  
                  <p className="text-md leading-6 font-semibold italic text-gray-600">
                  Frontend engineer with more than 10 years of experience building human-centered interfaces that make complex
                  data clear and usable. Skilled at modernizing legacy systems into scalable React and Vue applications, creating
                  design systems, and leading cross-functional Agile teams. Recognized for fostering strong team culture, clear
                  communication, and collaborative problem-solving while delivering measurable results such as higher customer
                  retention, faster release cycles, and stronger product adoption. Seeking to contribute to mission-driven
                  organizations where design and engineering meet impact.
                  </p>
                </div>
              </div>
              
              
              {/* Employment Section */}
              <div className="border-t-4 border-gray-200 pt-6">
                <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">PROFESSIONAL EXPERIENCE</h3>
                
                <StaggeredList 
                  className="space-y-6"
                  animation="fadeInUp"
                  staggerDelay={200}
                  duration={600}
                >
                  <div className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-semibold text-gray-700 leading-6">Renaissance Learning (via acquisitions of eduCLIMBER and Illuminate Education)</p>
                      <p className="text-md text-gray-500 text-right whitespace-nowrap">Remote</p>
                    </div>
                    <p className="text-md leading-6 font-semibold italic text-gray-700 mb-2">Global leader in K-12 assessment and analytics software</p>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-md font-bold text-gray-600 mb-2">Software Engineer II & Scrum Master</p>
                      <p className="text-md text-gray-500">August 2022 - June 2025</p>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Modernized core application by migrating from ExtJS to Vue.js, Vite, and Pinia, cutting load times and
                      improving scalability.</li>
                      <li>• Increased customer retention from 87% to 94% by aligning feature delivery with client needs and
                      collaborating across 10+ large-scale projects.</li>
                      <li>• Automated CI/CD pipelines with GitHub Actions and Rundeck, reducing release times by 30% and fostering
                      a culture of efficiency and continuous improvement.</li>
                      <li>• Led an international team of 25 engineers, designers, and product managers as Scrum Master, enhancing
                      delivery predictability, communication, and mentoring junior developers through approachable leadership.</li>
                      <li>• Partnered with data engineers to integrate pipelines and visualizations, making student performance insights
                      more actionable for educators and strengthening collaboration between technical and non-technical teams.</li>
                    </ul>
                  </div>

                  <div className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-semibold text-gray-700 leading-6">Longleaf Solutions → IO Education → Illuminate Education → Renaissance Learning</p>
                      <p className="text-md text-gray-500 text-right whitespace-nowrap">Atlanta, Georgia</p>
                    </div>
                    <p className="text-md leading-6 font-semibold italic text-gray-700 mb-2">Remained through four acquisitions, providing continuity and technical leadership across evolving organizations.</p>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-md font-bold text-gray-600 mb-2">Frontend Software Engineer</p>
                      <p className="text-md text-gray-500">September 2015 - August 2022</p>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Rebuilt flagship product frontend from Ember.js to React and TypeScript, reducing maintenance overhead
                      and improving user experience.</li>
                      <li>• Launched centralized dashboard unifying five product lines into one experience post-merger, streamlining
                      workflows and strengthening adoption for thousands of educators.</li>
                      <li>• Defined coding standards and onboarding practices that shortened ramp-up time for new engineers and
                      fostered a culture of consistency and quality.</li>
                      <li>• Partnered with product managers, designers, and data engineers to deliver cross-functional features,
                      improving collaboration and ensuring seamless data flow across platforms.</li>
                      <li>• Supported smooth client transitions during acquisitions by combining technical execution with empathy and
                      clear communication, safeguarding renewal rates and customer trust.</li>
                    </ul>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-semibold text-gray-700 leading-6">Longleaf Solutions → IO Education → Illuminate Education → Renaissance Learning</p>
                      <p className="text-md text-gray-500 text-right whitespace-nowrap">Atlanta, Georgia</p>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-md font-bold text-gray-600 mb-2">Web UX Designer and Developer</p>
                      <p className="text-md text-gray-500">July 2014 - September 2015</p>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Designed and implemented cross-browser interfaces for K-12 SaaS products, ensuring compatibility across
                      Chrome, Firefox, and Internet Explorer.</li>
                      <li>• Redesigned marketing website and improved UI consistency, contributing to stronger engagement and a more
                      cohesive brand experience.</li>
                      <li>• Collaborated with sales and support teams to align product demos and onboarding with client needs, building
                      stronger relationships with educators and administrators.</li>
                    </ul>
                  </div>
                  
                  <div className="pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-semibold text-gray-700 leading-6">Environmental Finance Center, UNC-Chapel Hill</p>
                      <p className="text-md text-gray-500 text-right whitespace-nowrap">Chapel Hill, North Carolina</p>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-md font-bold text-gray-600 mb-2">Graduate Fellow</p>
                      <p className="text-md text-gray-500">August 2012 - May 2014</p>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Created interactive dashboards, including the Colorado Water Rates Dashboard, to visualize utility trends for
                      policymakers.</li>
                      <li>• Standardized data management processes to improve research accuracy and accessibility.</li>
                      <li>• Published research on information affordability and the digital divide, contributing to national policy
                      discussions.</li>
                    </ul>
                  </div>
                </StaggeredList>
              </div>

              <div className="border-t-4 border-gray-200 pt-6">
                <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">EARLIER AND ADDITIONAL CAREER EXPERIENCE</h3>
                
                <StaggeredList 
                  className="space-y-6"
                  animation="fadeInUp"
                  staggerDelay={200}
                  duration={600}
                >
                  <div className="b-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
                    <div className="pb-8">
                      <div className="flex justify-between items-start">
                        <p className="text-lg font-semibold text-gray-700 leading-6">FRIDA Inc. (nonprofit)</p>
                        <p className="text-md text-gray-500 text-right whitespace-nowrap">Remote</p>
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-md font-bold text-gray-600 mb-2">Community Outreach Director</p>
                        <p className="text-md text-gray-500">May 2010 - August 2012</p>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Recruited and trained more than 50 volunteers and interns to deliver sustainability and education programs.</li>
                        <li>• Built partnerships with schools and community organizations to expand reach.</li>
                        <li>• Coordinated fundraising events that boosted awareness and donor contributions.</li>
                      </ul>
                    </div>

                    <div className="pb-8">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-md font-bold text-gray-600 mb-2">Lead Web Developer</p>
                        <p className="text-md text-gray-500">May 2014 - August 2017</p>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Built and maintained organizational website, integrated content management tools to simplify updates for
                        non-technical staff, and designed digital campaigns that expanded fundraising reach.</li>
                        <li>• Provided technical training to staff and volunteers and supported the mission continuously while pursuing
                        graduate studies and professional engineering roles.</li>
                      </ul>
                    </div>
                  </div>
                </StaggeredList>
              </div>

              <div className="border-t-4 border-gray-200 pt-6">
                <div className="pb-4 mb-4">
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-2">CORE STRENGTHS</h3>
                  <div className="pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">  
                    <p className="text-md text-gray-600 font-semibold italic text-center">
                      Collaboration • Mentorship • Empathy in Teamwork • Agile Leadership • UX Advocacy • Adaptability • Communication
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t-4 border-gray-200 pt-6">
                <div className="pb-4 mb-4">
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-2">SELECTED PROJECTS AND PORTFOLIO HIGHLIGHTS</h3>
                  <div className="hover:bg-gray-50 px-4 pt-4 rounded-lg transition-colors duration-200 ">  
                    <p className="text-md text-gray-600 font-semibold italic">
                      Design Systems and Component Libraries
                    </p>
                    <p className="text-md text-gray-600">
                      Built Vue component library standardizing UI across edtech platforms.
                    </p>
                  </div>

                  <div className=" hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200">  
                    <p className="text-md text-gray-600 font-semibold italic">
                      Visual Design
                    </p>
                    <p className="text-md text-gray-600">
                      Created logos and t-shirt designs for community organizations and side projects.
                    </p>
                  </div>

                  <div className="hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200">  
                    <p className="text-md text-gray-600 font-semibold italic">
                      Research and Writing
                    </p>
                    <p className="text-md text-gray-600">
                      Published on digital affordability and government dashboards.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Sidebar */}
            <AnimatedSection 
              animation="fadeInRight" 
              delay={300}
              className="sidebar-section p-6 lg:p-8 text-white"
            >
              <StaggeredList 
                className="space-y-8"
                animation="fadeInUp"
                staggerDelay={150}
                duration={500}
              >
                {/* Education */}
                <div className="border-b border-white pb-6">
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">Education</h3>
                  <div className="text-center space-y-3">
                    <div className="hover:bg-white/10 p-3 rounded-lg transition-colors duration-200">
                      <h4 className="font-semibold text-gray-200">The University of North Carolina at Chapel Hill</h4>
                      <p className="text-sm text-gray-200">Master of Information Science - 2014</p>
                      <p className="text-sm text-gray-200">Master of Public Administration - 2014</p>
                    </div>
                    <div className="hover:bg-white/10 p-3 rounded-lg transition-colors duration-200">
                      <h4 className="font-semibold text-gray-200">The University of Texas-Pan American</h4>
                      <p className="text-sm text-gray-200">Bachelor of Philosophy - 2008</p>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div className="border-b border-white pb-6">
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">Languages</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-200">
                    <div className="hover:text-yellow-400 transition-colors duration-200">Javascript (ES6+)</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Typescript</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">HTML5</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">CSS3/Sass/SCSS</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">SQL</div>
                  </div>
                </div>
                
                {/* Frameworks and Libraries */}
                <div className="border-b border-white pb-6">
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">Frameworks and Libraries</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-200">
                    <div className="hover:text-yellow-400 transition-colors duration-200">React</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Vue.js</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Next.js</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Vite</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Pinia</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Redux</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Vuetify</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Tailwind CSS</div>
                  </div>
                </div>

                {/* Tools and Platforms */}
                <div className="border-b border-white pb-6">
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">Tools and Platforms</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-200">
                    <div className="hover:text-yellow-400 transition-colors duration-200">GitHub Actions</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Docker</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Rundeck</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Figma</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">JIRA</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Storybook</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">CI/CD pipelines</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">LaunchDarkly</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Datadog</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Cursor</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Visual Studio Code</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">GitHub Desktop</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Gemini/Claude/GPT</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Affinity Suite</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Adobe Creative Suite</div>
                  </div>
                </div>
                
                {/* Practices */}
                <div className="border-b border-white pb-6">
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">Practices</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-200">
                    <div className="hover:text-yellow-400 transition-colors duration-200">Agile/Scrum</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">UX/UI Design</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Data Visualization</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Design Systems</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Performance Optimization</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Accessibility (WCAG/ARIA)</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Testing (Cypress, Jest, Playwright)</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Documentation (Confluence, Storybook, README)</div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">Certifications</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-200">
                    <div className="hover:text-yellow-400 transition-colors duration-200">Certified ScrumMaster (CSM)</div>
                  </div>
                </div>
              </StaggeredList>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </div>
);

export default Resume;