import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaExclamationTriangle } from 'react-icons/fa';
import { SiReact, SiSass, SiTailwindcss, SiVuedotjs, SiJavascript } from 'react-icons/si';
import { githubApi } from '../services/githubApi.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectFilter from './ProjectFilter.jsx';
import { ProjectSkeletonGrid } from './ProjectSkeleton.jsx';
import StaggeredList from './animations/StaggeredList.jsx';

// Static projects (moved outside component to prevent recreation)
const STATIC_PROJECTS = [
  {
    id: 'portfolio-website',
    title: 'ChristopherKenrick.com',
    description: 'A modern, responsive portfolio website showcasing my work and skills as a Frontend Software Engineer. Built with React 19, Vite, and Tailwind CSS 4 with dark mode support.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'SCSS'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/CKenrick/github-portfolio',
        icon: <FaGithub className="w-4 h-4" />
      },
      {
        label: 'Live Site',
        url: 'https://christopherkenrick.com',
        icon: <FaExternalLinkAlt className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'frontend-expertise',
    title: 'Frontend Development Expertise',
    description: 'Specialized in modern JavaScript frameworks and responsive web design with a focus on user experience, performance optimization, and accessibility.',
    technologies: ['Vue.js', 'React', 'JavaScript', 'TypeScript', 'Vite', 'Webpack'],
    links: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/christopherkenrick/',
        icon: <FaExternalLinkAlt className="w-4 h-4" />
      }
    ]
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(STATIC_PROJECTS); // Start with static projects
  const [filteredProjects, setFilteredProjects] = useState(STATIC_PROJECTS);
  const [loading, setLoading] = useState(false); // Start as not loading
  const [error, setError] = useState(null);
  const [githubStats, setGithubStats] = useState(null);

  // Debug logging
  console.log('Projects component rendered, loading:', loading, 'projects:', projects.length);

  useEffect(() => {
    console.log('useEffect running - will fetch GitHub data');
    
    const fetchGitHubData = async () => {
      try {
        console.log('Starting GitHub data fetch...');
        setLoading(true);
        setError(null);
        
        console.log('Fetching repositories...');
        const repos = await githubApi.getFeaturedRepositories();
        console.log('Repositories fetched:', repos.length);

        console.log('Fetching profile...');
        const profile = await githubApi.getProfile().catch((err) => {
          console.warn('Profile fetch failed:', err);
          return null;
        });
        console.log('Profile fetched:', !!profile);

        // Set GitHub stats
        if (profile) {
          setGithubStats(profile);
        }

        // Combine GitHub repos with static projects
        const allProjects = [...repos, ...STATIC_PROJECTS];
        console.log('All projects combined:', allProjects.length);
        
        // Sort projects by date
        const sortedProjects = allProjects.sort((a, b) => {
          const aValue = new Date(a.updated_at || a.created_at || '2020-01-01');
          const bValue = new Date(b.updated_at || b.created_at || '2020-01-01');
          return aValue < bValue ? 1 : -1;
        });
        
        console.log('Setting projects...');
        setProjects(allProjects);
        setFilteredProjects(sortedProjects);
        console.log('Projects set successfully');
        
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err);
        // Keep static projects on error
      } finally {
        console.log('GitHub fetch complete, setting loading to false');
        setLoading(false);
      }
    };

    // Start fetching immediately
    fetchGitHubData();
  }, []); // Empty dependency array - run once on mount

  const handleFilterChange = useCallback((filtered) => {
    setFilteredProjects(filtered || []);
  }, []);

  const refetch = useCallback(() => {
    console.log('Refetch requested');
    setError(null);
    setLoading(true);
    
    const fetchGitHubData = async () => {
      try {
        console.log('Re-fetching repositories...');
        const repos = await githubApi.getFeaturedRepositories();
        console.log('Repositories re-fetched:', repos.length);

        const profile = await githubApi.getProfile().catch((err) => {
          console.warn('Profile re-fetch failed:', err);
          return null;
        });

        if (profile) {
          setGithubStats(profile);
        }

        const allProjects = [...repos, ...STATIC_PROJECTS];
        const sortedProjects = allProjects.sort((a, b) => {
          const aValue = new Date(a.updated_at || a.created_at || '2020-01-01');
          const bValue = new Date(b.updated_at || b.created_at || '2020-01-01');
          return aValue < bValue ? 1 : -1;
        });
        
        setProjects(allProjects);
        setFilteredProjects(sortedProjects);
        
      } catch (err) {
        console.error('Error re-fetching GitHub data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGitHubData();
  }, []);

  console.log('Rendering Projects component - loading:', loading, 'projects:', projects.length);

  return (
    <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Portfolio
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Exploring my latest projects and contributions to the web development community
        </p>
      </div>

      {/* Show loading skeleton only while fetching GitHub data */}
      {loading && (
        <div className="mb-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Loading GitHub projects...
            </p>
          </div>
          <ProjectSkeletonGrid count={3} />
        </div>
      )}

      {/* Show error message if GitHub fetch failed */}
      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            <div>
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                Unable to load GitHub projects
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                {error.message || 'Network error'}. Showing available projects.
              </p>
              <button
                onClick={refetch}
                className="mt-2 text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 underline text-sm"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Always show projects (static + any GitHub projects that loaded) */}
      <div className="mb-8">
        <ProjectFilter
          projects={projects}
          onFilterChange={handleFilterChange}
          githubStats={githubStats}
        />
      </div>

      <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id || project.name || index} 
            project={project}
            isGitHubProject={project.node_id !== undefined}
            index={index}
          />
        ))}
      </StaggeredList>

      {/* GitHub info */}
      {githubStats && (
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <FaGithub className="mr-1" />
              <span>{githubStats.public_repos} repositories</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              <span>{githubStats.followers} followers</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
              <span>{githubStats.following} following</span>
            </div>
          </div>
        </div>
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Debug Info:</h4>
          <div className="text-sm text-blue-700">
            <div>Projects: {projects.length}</div>
            <div>Filtered: {filteredProjects.length}</div>
            <div>Loading: {loading.toString()}</div>
            <div>Error: {error ? error.message : 'None'}</div>
            <div>GitHub Stats: {githubStats ? 'Loaded' : 'Not loaded'}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;