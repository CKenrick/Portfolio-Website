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
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user interfaces with modern design principles, accessibility standards, and responsive design patterns.',
    technologies: ['Figma', 'Adobe Creative Suite', 'CSS', 'SCSS', 'Tailwind CSS'],
    links: []
  }
];

const Projects = () => {
  const [githubStats, setGithubStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Fetch GitHub data on mount
  useEffect(() => {
    let isFetchMounted = true;
    
    const fetchData = async () => {
      try {
        if (!isMountedRef.current) return;
        
        setLoading(true);
        setError(null);
        
        // Fetch repositories and profile in parallel
        const [repos, profile] = await Promise.all([
          githubApi.getFeaturedRepositories(),
          githubApi.getProfile().catch(() => null) // Don't fail if profile fetch fails
        ]);

        if (!isFetchMounted || !isMountedRef.current) return;

        // Fetch additional data for each repository
        const enrichedRepos = await Promise.all(
          repos.map(async (repo) => {
            try {
              const [languages, topics] = await Promise.all([
                githubApi.getRepositoryLanguages(repo.name).catch(() => ({})),
                githubApi.getRepositoryTopics(repo.name).catch(() => ({ names: [] }))
              ]);

              return {
                ...repo,
                languages,
                topics: topics.names || []
              };
            } catch (error) {
              console.warn(`Failed to fetch additional data for ${repo.name}:`, error);
              return repo;
            }
          })
        );

        if (!isFetchMounted || !isMountedRef.current) return;

        // Set GitHub stats
        if (profile) {
          setGithubStats(profile);
        }

        // Combine data and initialize both projects and filteredProjects
        const allProjects = [...enrichedRepos, ...STATIC_PROJECTS];
        
        // Sort projects by default (newest first)
        const sortedProjects = [...allProjects].sort((a, b) => {
          const aValue = new Date(a.updated_at || a.created_at || '2020-01-01');
          const bValue = new Date(b.updated_at || b.created_at || '2020-01-01');
          return aValue < bValue ? 1 : -1; // desc (newest first)
        });
        
        setProjects(allProjects);
        setFilteredProjects(sortedProjects);
        
      } catch (err) {
        if (isFetchMounted && isMountedRef.current) {
          setError(err);
          
          // Sort static projects by default (newest first)
          const sortedStatic = [...STATIC_PROJECTS].sort((a, b) => {
            const aValue = new Date(a.updated_at || a.created_at || '2020-01-01');
            const bValue = new Date(b.updated_at || b.created_at || '2020-01-01');
            return aValue < bValue ? 1 : -1; // desc (newest first)
          });
          
          setProjects(STATIC_PROJECTS);
          setFilteredProjects(sortedStatic);
        }
      } finally {
        if (isFetchMounted && isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isFetchMounted = false;
    };
  }, []);

  // Stable filter change handler - doesn't depend on anything that changes
  const handleFilterChange = useCallback((filtered) => {
    if (isMountedRef.current) {
      setFilteredProjects(filtered || []);
    }
  }, []); // Empty dependency array - completely stable

  // Refetch function
  const refetch = useCallback(() => {
    if (!isMountedRef.current) return;
    window.location.reload();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Exploring my latest projects and contributions
          </p>
        </div>
        <ProjectSkeletonGrid count={6} />
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Portfolio
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          A collection of my latest projects, open source contributions, and technical experiments. 
          Each project represents a learning journey and a step forward in my development career.
        </p>
        
        {/* GitHub Stats */}
        {githubStats && (
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
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            <div>
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                Unable to load GitHub projects
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                {error.message || error}. Showing static projects instead.
              </p>
              <button
                onClick={refetch}
                className="mt-2 text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 underline text-sm"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Filter */}
      <ProjectFilter
        projects={projects}
        onFilterChange={handleFilterChange}
      />

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <StaggeredList 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          animation="scaleIn"
          staggerDelay={150}
          duration={500}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || project.title || index}
              project={project}
              isGitHubProject={!!project.html_url}
            />
          ))}
        </StaggeredList>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <FaGithub className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Want to collaborate on a project or have questions about my work?
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/CKenrick"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <FaGithub className="mr-2" />
            View All Repositories
          </a>
          <a
            href="mailto:christopher.kenrick@gmail.com?Subject=Project%20Collaboration"
            className="inline-flex items-center px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:bg-primary-dark dark:hover:bg-primary-light transition-colors duration-200"
          >
            <FaExternalLinkAlt className="mr-2" />
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;