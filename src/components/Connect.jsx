import React, { useState } from 'react';
import { FaLinkedinIn, FaEnvelope, FaGithub, FaComments, FaHandshake } from 'react-icons/fa';
import ContactForm from './ContactForm.jsx';

const Connect = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <section id="Connect" className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Let's Connect
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Ready to collaborate on your next project? I'd love to hear about your ideas and explore how we can work together to bring them to life.
        </p>
      </div>

      {!showContactForm ? (
        <div className="space-y-12">
          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <a 
                href="https://www.linkedin.com/in/christopherkenrick/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-blue-600 dark:bg-blue-700 rounded-full p-8 mx-auto w-24 h-24 flex items-center justify-center group-hover:bg-blue-700 dark:group-hover:bg-blue-600 transition-colors duration-300 transform group-hover:scale-110 shadow-lg">
                  <FaLinkedinIn className="text-white text-3xl" />
                </div>
                <h3 className="text-primary-light dark:text-primary-dark mt-4 text-xl font-semibold group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors duration-300">
                  LinkedIn
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  Connect professionally
                </p>
              </a>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setShowContactForm(true)}
                className="block group w-full"
              >
                <div className="bg-primary-light dark:bg-primary-dark rounded-full p-8 mx-auto w-24 h-24 flex items-center justify-center group-hover:bg-primary-dark dark:group-hover:bg-primary-light transition-colors duration-300 transform group-hover:scale-110 shadow-lg">
                  <FaComments className="text-white text-3xl" />
                </div>
                <h3 className="text-primary-light dark:text-primary-dark mt-4 text-xl font-semibold group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors duration-300">
                  Send Message
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  Use the contact form
                </p>
              </button>
            </div>
            
            <div className="text-center">
              <a 
                href="https://github.com/CKenrick" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-gray-800 dark:bg-gray-700 rounded-full p-8 mx-auto w-24 h-24 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-gray-600 transition-colors duration-300 transform group-hover:scale-110 shadow-lg">
                  <FaGithub className="text-white text-3xl" />
                </div>
                <h3 className="text-primary-light dark:text-primary-dark mt-4 text-xl font-semibold group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors duration-300">
                  GitHub
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  View my repositories
                </p>
              </a>
            </div>
          </div>

          {/* Direct Contact Options */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <FaHandshake className="text-4xl text-primary-light dark:text-primary-dark mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to Start a Project?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I'm always excited to work on new and challenging projects. Let's discuss your ideas!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <button
                onClick={() => setShowContactForm(true)}
                className="flex items-center justify-center px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-200 transform hover:scale-105"
              >
                <FaComments className="mr-2" />
                Send a Message
              </button>
            </div>
          </div>

          {/* Skills and Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What I Can Help With
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Frontend Development (React, Vue.js)</li>
                <li>• UI/UX Design & Implementation</li>
                <li>• Web Application Architecture</li>
                <li>• Performance Optimization</li>
                <li>• Code Review & Mentoring</li>
                <li>• Technical Consulting</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Current Availability
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-400">Available for new projects</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-400">Response time: Within 24 hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-600 dark:text-gray-400">Located in EST timezone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => setShowContactForm(false)}
              className="inline-flex items-center text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
            >
              ← Back to contact options
            </button>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      )}
    </section>
  );
};

export default Connect;