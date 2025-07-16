import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaFilter, FaTimes, FaSort } from 'react-icons/fa';

const ProjectFilter = ({ 
  projects, 
  onFilterChange, 
  availableTechnologies = [],
  githubStats,
  className = "" 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [sortBy, setSortBy] = useState('updated'); // updated, stars, name
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Track if component is mounted
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Extract unique technologies from projects
  const getAllTechnologies = useCallback(() => {
    const techs = new Set();
    
    if(projects && projects.length) {
      projects.forEach(project => {
      // From GitHub API languages
        if (project.languages) {
          Object.keys(project.languages).forEach(lang => techs.add(lang));
        }
        
        // From static project technologies
        if (project.technologies) {
          project.technologies.forEach(tech => techs.add(tech));
        }
        
        // From GitHub topics
        if (project.topics) {
          project.topics.forEach(topic => techs.add(topic));
        }
      });
    }
    
    return Array.from(techs).sort();
  }, [projects]);

  const technologies = availableTechnologies.length > 0 ? availableTechnologies : getAllTechnologies();

  // Filter and sort function
  const getFilteredProjects = useCallback(() => {
    if (!projects || !Array.isArray(projects)) return [];

    console.log('Filtering projects with:', { searchTerm, selectedTechnologies, sortBy, sortDirection });

    const filtered = projects.filter(project => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Technology filter
      const matchesTech = selectedTechnologies.length === 0 || 
        selectedTechnologies.some(tech => {
          return (
            project.languages && Object.keys(project.languages).includes(tech) ||
            project.technologies && project.technologies.includes(tech) ||
            project.topics && project.topics.includes(tech)
          );
        });

      return matchesSearch && matchesTech;
    });

    console.log('Filtered projects:', filtered.length, 'from', projects.length);

    // Sort filtered projects
    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'stars':
          aValue = a.stargazers_count || 0;
          bValue = b.stargazers_count || 0;
          break;
        case 'name':
          aValue = (a.name || a.title || '').toLowerCase();
          bValue = (b.name || b.title || '').toLowerCase();
          break;
        case 'updated':
        default:
          aValue = new Date(a.updated_at || a.created_at || '2020-01-01');
          bValue = new Date(b.updated_at || b.created_at || '2020-01-01');
          break;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [projects, searchTerm, selectedTechnologies, sortBy, sortDirection]);

  // Auto-filter whenever filter states change
  useEffect(() => {
    if (!isMountedRef.current || !projects || !Array.isArray(projects)) return;
    
    console.log('Filter state changed, triggering filtering...');
    const filteredProjects = getFilteredProjects();
    onFilterChange(filteredProjects);
  }, [searchTerm, selectedTechnologies, sortBy, sortDirection, projects, getFilteredProjects, onFilterChange]);

  // Handle search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Filtering will be triggered by useEffect
  };

  const handleTechnologyToggle = (tech) => {
    const newSelectedTechnologies = selectedTechnologies.includes(tech) 
      ? selectedTechnologies.filter(t => t !== tech)
      : [...selectedTechnologies, tech];
    
    setSelectedTechnologies(newSelectedTechnologies);
    // Filtering will be triggered by useEffect
  };

  const handleSortChange = (e) => {
    const [sort, direction] = e.target.value.split('-');
    setSortBy(sort);
    setSortDirection(direction);
    // Filtering will be triggered by useEffect
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTechnologies([]);
    setSortBy('updated');
    setSortDirection('desc');
    // Filtering will be triggered by useEffect with cleared values
  };

  const hasActiveFilters = searchTerm || selectedTechnologies.length > 0;
  const filteredCount = getFilteredProjects().length;

  return (
    <div className={`mb-8 ${className}`}>
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-colors duration-200"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              showFilters || hasActiveFilters
                ? 'bg-primary-light dark:bg-primary-dark text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <FaFilter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-white dark:bg-gray-800 text-primary-light dark:text-primary-dark rounded-full px-2 py-1 text-xs font-medium">
                {selectedTechnologies.length + (searchTerm ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={`${sortBy}-${sortDirection}`}
              onChange={handleSortChange}
              className="appearance-none pl-8 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent transition-colors duration-200"
            >
              <option value="updated-desc">Recently Updated</option>
              <option value="stars-desc">Most Stars</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
            <FaSort className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filter by Technology
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <FaTimes className="w-3 h-3" />
                Clear All
              </button>
            )}
          </div>

          {/* Technology Filter */}
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <button
                key={tech}
                onClick={() => handleTechnologyToggle(tech)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedTechnologies.includes(tech)
                    ? 'bg-primary-light dark:bg-primary-dark text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredCount} of {projects?.length || 0} projects
            {githubStats && (
              <span className="ml-4">
                • {githubStats.public_repos} total repositories
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilter; 