import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
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
              <div className="text-center border-b-4 border-gray-200 pb-6 mb-6">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">Chris Kenrick</h1>
                <h2 className="text-xl text-gray-600 mb-4">Software Developer</h2>
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
                </div>
              </div>
              <div className="pb-4 mb-4">
                <h3 className="text-2xl font-bold text-yellow-400 text-center mb-6">About</h3>
                <div className="pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">  
                  <p className="text-sm text-gray-600">
                    Experienced Frontend Software Engineer and
                    certified Scrum Master, with a demonstrated
                    history of working in the education,
                    environmental finance, & nonprofit industries.
                    Proficient in multiple programming languages,
                    frameworks, and libraries, with a current focus
                    on VueJS, Vite, Pinia, and Vuetify. Always eager
                    to learn new languages.
                  </p>
                </div>
              </div>
              
              
              {/* Employment Section */}
              <div className="border-t-4 border-gray-200 pt-6">
                <h3 className="text-2xl font-bold text-yellow-400 text-center mb-6">Employment</h3>
                
                <StaggeredList 
                  className="space-y-6"
                  animation="fadeInUp"
                  staggerDelay={200}
                  duration={600}
                >
                  <div className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-700">Renaissance Learning - eduCLIMBER</h4>
                      <span className="text-sm text-gray-500">2018 - 2025</span>
                    </div>
                    <h5 className="text-base font-medium text-gray-600 mb-3">Frontend Software Engineer & Scrum Master</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Implemented new SPA with VueJS, Vite, Pinia, and Vuetify</li>
                      <li>• Major contributor to internal component library</li>
                      <li>• Lead the transfer of legacy pages from extJS to VueJS</li>
                      <li>• Owned product backlog and lead team using Agile project management as Scrum Master</li>
                      <li>• Lead releases of frontend Github repositories using Github Actions and Rundeck</li>
                    </ul>
                  </div>
                  
                  <div className="border-b border-gray-200 pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-700">IO Education/Illuminate Education</h4>
                      <span className="text-sm text-gray-500">2014 - 2018</span>
                    </div>
                    <h5 className="text-base font-medium text-gray-600 mb-3">Frontend Software Engineer</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Implemented product functionality using knowledge of backend data warehouse data structures</li>
                      <li>• Converted outdated frontend code of flagship product to the ReactJS library</li>
                      <li>• Lead frontend development of central dashboard for five separate company products</li>
                      <li>• Maintained legacy codebase and implemented new features as the sole developer</li>
                      <li>• Created new sql queries to support new features and to improve performance</li>
                    </ul>
                  </div>
                  
                  <div className="pb-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-700">The Environmental Finance Center, UNC-CH</h4>
                      <span className="text-sm text-gray-500">2012 - 2014</span>
                    </div>
                    <h5 className="text-base font-medium text-gray-600 mb-3">Research Assistant</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Implemented design and development of new information visualization tools</li>
                      <li>• Experimented with new dashboard interface through multiple programming languages</li>
                      <li>• Assisted with organizational transition to database centered system</li>
                      <li>• Created multiple utility rates dashboards</li>
                      <li>• Updated financial analysis tools available for public use</li>
                      <li>• Conducted research for Nationwide Small Systems Energy Audit Project</li>
                    </ul>
                  </div>
                </StaggeredList>
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
                
                {/* Skills */}
                <div className="border-b border-white pb-6">
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">Skills</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-200">
                    <div className="hover:text-yellow-400 transition-colors duration-200">HTML/5</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">SASS/SCSS/CSS</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Javascript/ECMAScript</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Typescript</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Vite</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Pinia</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Vuetify</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">React</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Vue.js</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Node.js</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">npm/pnpm/npx</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Express</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Lodash</div>                    
                    <div className="hover:text-yellow-400 transition-colors duration-200">jQuery</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Git</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Webpack</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Yarn</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Tailwind CSS</div>
                  </div>
                </div>
                
                {/* Programs/Tools */}
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 text-center mb-4">Programs/Tools</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm text-gray-200">
                    <div className="hover:text-yellow-400 transition-colors duration-200">Cursor</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Visual Studio Code</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">GitHub Desktop</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Gemini/Claude/GPT</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Jira</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Rundeck</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Github Actions</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Docker</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Figma</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Miro</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Affinity Suite</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Adobe Creative Suite</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Tableau</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">WordPress</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">Drupal</div>
                    <div className="hover:text-yellow-400 transition-colors duration-200">SPSS</div>
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