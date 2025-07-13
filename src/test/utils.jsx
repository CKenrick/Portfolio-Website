import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Simple providers wrapper (mocks are handled in setup.js)
const AllProviders = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

// Custom render function with all providers
const customRender = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <AllProviders>{children}</AllProviders>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Custom render function with specific providers
const renderWithProviders = (ui, options = {}) => {
  return customRender(ui, options);
};

// Mock implementations
const mockFetch = (data, status = 200) => {
  global.fetch.mockResolvedValueOnce({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
  });
};

const mockFetchError = (error = 'Network Error') => {
  global.fetch.mockRejectedValueOnce(new Error(error));
};

// Mock GitHub API response
const mockGitHubAPI = (repos = []) => {
  const mockRepos = repos.length > 0 ? repos : [
    {
      id: 1,
      name: 'test-repo',
      description: 'Test repository',
      html_url: 'https://github.com/test/test-repo',
      homepage: 'https://test-repo.com',
      topics: ['react', 'javascript'],
      language: 'JavaScript',
      stargazers_count: 10,
      forks_count: 5,
      updated_at: '2023-01-01T00:00:00Z',
    },
  ];

  mockFetch(mockRepos);
};

// Wait for async operations
const waitForLoadingToFinish = async () => {
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
};

// Common test helpers
const testHelpers = {
  // User interaction helpers
  clickButton: (buttonText) => fireEvent.click(screen.getByRole('button', { name: buttonText })),
  clickLink: (linkText) => fireEvent.click(screen.getByRole('link', { name: linkText })),
  
  // Form helpers
  fillInput: (labelText, value) => {
    const input = screen.getByLabelText(labelText);
    fireEvent.change(input, { target: { value } });
  },
  
  fillTextarea: (labelText, value) => {
    const textarea = screen.getByLabelText(labelText);
    fireEvent.change(textarea, { target: { value } });
  },
  
  // Wait helpers
  waitForText: (text) => screen.findByText(text),
  waitForElement: (element) => screen.findByRole(element),
  
  // Assertion helpers
  expectElementToBeVisible: (element) => expect(element).toBeInTheDocument(),
  expectElementToBeHidden: (element) => expect(element).not.toBeInTheDocument(),
};

// Export everything
export {
  customRender,
  renderWithProviders,
  mockFetch,
  mockFetchError,
  mockGitHubAPI,
  waitForLoadingToFinish,
  testHelpers,
  AllProviders,
  // Re-export testing library functions
  render,
  screen,
  fireEvent,
  waitFor,
  userEvent,
};

// Make customRender the default export
export default customRender; 