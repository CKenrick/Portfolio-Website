import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaEye, FaCalendarAlt } from 'react-icons/fa';
import { getLanguageColor } from '../services/githubApi.js';

const ProjectCard = ({ project, isGitHubProject = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTopLanguages = (languages) => {
    if (!languages) return [];
    
    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    return Object.entries(languages)
      .map(([lang, bytes]) => ({
        name: lang,
        percentage: ((bytes / total) * 100).toFixed(1),
        color: getLanguageColor(lang)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);
  };

  if (isGitHubProject) {
    const topLanguages = getTopLanguages(project.languages);
    
    return (
      <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300">
              {project.name}
            </h3>
            <div className="flex items-center space-x-2">
              {project.stargazers_count > 0 && (
                <div className="flex items-center text-yellow-500 text-sm">
                  <FaStar className="mr-1" />
                  {project.stargazers_count}
                </div>
              )}
              {project.forks_count > 0 && (
                <div className="flex items-center text-blue-500 text-sm">
                  <FaCodeBranch className="mr-1" />
                  {project.forks_count}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {project.description || 'No description provided'}
          </p>
          
          {/* Languages */}
          {topLanguages.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {topLanguages.map(lang => (
                  <span
                    key={lang.name}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: lang.color }}
                    />
                    {lang.name} ({lang.percentage}%)
                  </span>
                ))}
              </div>
              
              {/* Language bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="flex h-2 rounded-full overflow-hidden">
                  {topLanguages.map(lang => (
                    <div
                      key={lang.name}
                      className="h-2"
                      style={{
                        backgroundColor: lang.color,
                        width: `${lang.percentage}%`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {project.topics.slice(0, 4).map(topic => (
                  <span
                    key={topic}
                    className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
                {project.topics.length > 4 && (
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                    +{project.topics.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaCalendarAlt className="mr-1" />
              Updated {formatDate(project.updated_at)}
            </div>
            
            <div className="flex items-center space-x-3">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
                aria-label="View on GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
                  aria-label="View live site"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for non-GitHub projects (your existing static projects)
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="inline-block px-3 py-1 text-sm bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {project.links && (
          <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            {project.links.map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
              >
                {link.icon}
                <span className="ml-1 text-sm">{link.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 