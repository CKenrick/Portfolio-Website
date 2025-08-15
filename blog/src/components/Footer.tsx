import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-600 ">
              © 2025 Chris Kenrick. All rights reserved.
            </p>
            <p className="text-sm text-gray-500  mt-1">
              Frontend Developer & Scrum Master
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/christopherkenrick/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600  hover:text-primary-light  transition-colors duration-200"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/CKenrick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600  hover:text-primary-light  transition-colors duration-200"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="mailto:your-email@example.com"
              className="text-gray-600  hover:text-primary-light  transition-colors duration-200"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}