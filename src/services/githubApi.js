const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'CKenrick'; // Your GitHub username

// Cache for storing API responses
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

class GitHubAPIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'GitHubAPIError';
    this.status = status;
  }
}

const fetchWithCache = async (url, options = {}) => {
  const cacheKey = url;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new GitHubAPIError(
        `GitHub API error: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    
    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Failed to fetch from GitHub API', 500);
  }
};

export const githubApi = {
  // Get user profile
  async getProfile() {
    const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`;
    return await fetchWithCache(url);
  },

  // Get user repositories
  async getRepositories(options = {}) {
    const {
      sort = 'updated',
      direction = 'desc',
      per_page = 30,
      type = 'owner'
    } = options;

    const params = new URLSearchParams({
      sort,
      direction,
      per_page: per_page.toString(),
      type,
    });

    const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?${params}`;
    return await fetchWithCache(url);
  },

  // Get featured repositories (manually curated list)
  async getFeaturedRepositories() {
    try {
      console.log('Fetching all repositories...');
      const allRepos = await this.getRepositories({ per_page: 100 });
      console.log('All repositories fetched:', allRepos.length);
      
      if (!allRepos || allRepos.length === 0) {
        console.log('No repositories found, returning empty array');
        return [];
      }
      
      // Filter for interesting repos (not forks, has description, updated recently)
      const featured = allRepos.filter(repo => {
        const isNotFork = !repo.fork;
        const hasDescription = repo.description && repo.description.length > 10;
        const isPublic = !repo.private;
        const isNotArchived = !repo.archived;
        
        console.log(`Repo ${repo.name}: fork=${repo.fork}, desc=${!!repo.description}, public=${!repo.private}, archived=${repo.archived}`);
        
        return isNotFork && hasDescription && isPublic && isNotArchived;
      });

      console.log('Featured repositories after filtering:', featured.length);
      
      // Sort by updated date and take top 6
      const sortedFeatured = featured.sort((a, b) => 
        new Date(b.updated_at) - new Date(a.updated_at)
      ).slice(0, 6);

      console.log('Final featured repositories:', sortedFeatured.map(r => r.name));
      return sortedFeatured;
      
    } catch (error) {
      console.error('Error fetching featured repositories:', error);
      return [];
    }
  },

  // Get repository details
  async getRepository(repoName) {
    const url = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`;
    return await fetchWithCache(url);
  },

  // Get repository languages
  async getRepositoryLanguages(repoName) {
    const url = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`;
    return await fetchWithCache(url);
  },

  // Get repository topics
  async getRepositoryTopics(repoName) {
    const url = `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/topics`;
    return await fetchWithCache(url, {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json',
      },
    });
  },
};

// Utility function to get language color
export const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C#': '#239120',
    PHP: '#4F5D95',
    CSS: '#1572B6',
    HTML: '#e34c26',
    Vue: '#4FC08D',
    React: '#61DAFB',
    'C++': '#f34b7d',
    C: '#555555',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Ruby: '#701516',
    Shell: '#89e051',
    Dockerfile: '#384d54',
    SCSS: '#c6538c',
    Sass: '#a53b70',
  };
  
  return colors[language] || '#686868';
}; 