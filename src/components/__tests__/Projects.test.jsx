import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders, mockGitHubAPI, mockFetchError } from '../../test/utils';
import Projects from '../Projects';

// Import the mocked modules
import { useRetryableData } from '../../hooks/useAsyncData';
import { githubApi } from '../../services/githubApi';

// Mock implementations will be set up in the test utilities

// Mock static projects data
const mockStaticProjects = [
  {
    id: 'static-1',
    name: 'Static Project 1',
    description: 'A static project for testing',
    html_url: 'https://github.com/test/static-1',
    homepage: 'https://static-1.com',
    topics: ['react', 'testing'],
    language: 'JavaScript',
    stargazers_count: 5,
    forks_count: 2,
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: 'static-2',
    name: 'Static Project 2',
    description: 'Another static project',
    html_url: 'https://github.com/test/static-2',
    homepage: null,
    topics: ['vue', 'typescript'],
    language: 'TypeScript',
    stargazers_count: 8,
    forks_count: 3,
    updated_at: '2023-02-01T00:00:00Z',
  },
];

// describe('Projects Component', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
    
//     // Reset useRetryableData mock to default state
//     useRetryableData.mockReturnValue({
//       data: mockStaticProjects,
//       loading: false,
//       error: null,
//       refetch: vi.fn(),
//       retryCount: 0,
//       isRetrying: false,
//     });
//   });

//   it('renders without crashing', () => {
//     renderWithProviders(<Projects />);
//     expect(screen.getByText(/projects/i)).toBeInTheDocument();
//   });

//   it('displays loading state initially', () => {
//     renderWithProviders(<Projects />);
//     // Check that the component renders (loading state may not be visible due to fast resolution)
//     expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
//   });

//   it('displays static projects when API returns empty array', async () => {
//     mockFetchUserRepos.mockResolvedValue([]);
    
//     renderWithProviders(<Projects />);
    
//     await waitFor(() => {
//       expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
//     });
    
//     // Should display the projects section
//     expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
//   });

//   it('displays GitHub projects when API returns data', async () => {
//     const mockGitHubProjects = [
//       {
//         id: 1,
//         title: 'github-project-1',
//         description: 'A GitHub project',
//         technologies: ['React', 'JavaScript'],
//         links: [
//           { label: 'GitHub', url: 'https://github.com/test/github-project-1' }
//         ]
//       },
//     ];
    
//     useRetryableData.mockReturnValue({
//       data: mockGitHubProjects,
//       loading: false,
//       error: null,
//       refetch: vi.fn(),
//       retryCount: 0,
//       isRetrying: false,
//     });
    
//     renderWithProviders(<Projects />);
    
//     expect(screen.getByText('github-project-1')).toBeInTheDocument();
//   });

//   it('handles API errors gracefully', async () => {
//     useRetryableData.mockReturnValue({
//       data: mockStaticProjects,
//       loading: false,
//       error: new Error('API Error'),
//       refetch: vi.fn(),
//       retryCount: 1,
//       isRetrying: false,
//     });
    
//     renderWithProviders(<Projects />);
    
//     // Should fallback to showing the projects section
//     expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
//     // Should show error message
//     expect(screen.getByText(/unable to load github projects/i)).toBeInTheDocument();
//   });

//   it('displays project filter options', async () => {
//     renderWithProviders(<Projects />);
    
//     // Check for filter UI elements (may vary by implementation)
//     expect(screen.getByPlaceholderText(/search projects/i)).toBeInTheDocument();
//     expect(screen.getByText(/filters/i)).toBeInTheDocument();
//   });

//   it('renders project data correctly', async () => {
//     const mockProjects = [
//       {
//         id: 1,
//         title: 'Test Project',
//         description: 'A test project description',
//         technologies: ['React', 'JavaScript'],
//         links: []
//       }
//     ];
    
//     useRetryableData.mockReturnValue({
//       data: mockProjects,
//       loading: false,
//       error: null,
//       refetch: vi.fn(),
//       retryCount: 0,
//       isRetrying: false,
//     });
    
//     renderWithProviders(<Projects />);
    
//     // Should display project information
//     expect(screen.getByText('Test Project')).toBeInTheDocument();
//     expect(screen.getByText('A test project description')).toBeInTheDocument();
//   });

//   it('displays search functionality', () => {
//     renderWithProviders(<Projects />);
    
//     // Should have search input
//     const searchInput = screen.getByPlaceholderText(/search projects/i);
//     expect(searchInput).toBeInTheDocument();
    
//     // Should be able to type in search
//     fireEvent.change(searchInput, { target: { value: 'test search' } });
//     expect(searchInput.value).toBe('test search');
//   });

//   it('displays loading state correctly', () => {
//     useRetryableData.mockReturnValue({
//       data: [],
//       loading: true,
//       error: null,
//       refetch: vi.fn(),
//       retryCount: 0,
//       isRetrying: false,
//     });
    
//     renderWithProviders(<Projects />);
    
//     // Should show loading header
//     expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
//     expect(screen.getByText(/exploring my latest projects/i)).toBeInTheDocument();
//   });

//   it('displays sorting options', () => {
//     renderWithProviders(<Projects />);
    
//     // Should have sort dropdown
//     expect(screen.getByDisplayValue(/recently updated/i)).toBeInTheDocument();
//   });

//   it('handles retry functionality when error occurs', () => {
//     const mockRefetch = vi.fn();
    
//     useRetryableData.mockReturnValue({
//       data: mockStaticProjects,
//       loading: false,
//       error: new Error('Network Error'),
//       refetch: mockRefetch,
//       retryCount: 1,
//       isRetrying: false,
//     });
    
//     renderWithProviders(<Projects />);
    
//     // Should show error message with retry button
//     expect(screen.getByText(/unable to load github projects/i)).toBeInTheDocument();
    
//     const retryButton = screen.getByRole('button', { name: /retry/i });
//     fireEvent.click(retryButton);
    
//     // Should call refetch
//     expect(mockRefetch).toHaveBeenCalled();
//   });

//   it('displays empty state when no projects are found', async () => {
//     mockFetchUserRepos.mockResolvedValue([]);
    
//     renderWithProviders(<Projects />);
    
//     await waitFor(() => {
//       expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
//     });
    
//     // Should display the main portfolio heading
//     expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
//   });
// }); 