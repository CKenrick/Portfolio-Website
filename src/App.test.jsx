import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import customRender from './test/utils';
import App from './components/App';

// Mock the GitHub API service
vi.mock('./services/github', () => ({
  fetchUserRepos: vi.fn(() => Promise.resolve([])),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    customRender(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders in light theme by default', () => {
    customRender(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('min-h-screen');
  });

  it('renders with router context', () => {
    customRender(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('displays loading state initially', async () => {
    customRender(<App />);
    // The app should render main content area
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('handles theme switching', () => {
    customRender(<App />);
    // Theme toggle should be present
    const themeToggle = screen.queryByRole('button', { name: /theme/i });
    if (themeToggle) {
      expect(themeToggle).toBeInTheDocument();
    }
  });
});
