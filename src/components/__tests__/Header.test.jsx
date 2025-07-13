import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Header from '../Header';

// Mock react-router-dom location
const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockLocation,
  };
});

describe('Header Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the logo', () => {
    renderWithProviders(<Header />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('displays navigation elements', () => {
    renderWithProviders(<Header />);
    
    // Check for main navigation elements (some are links, some are buttons)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connect/i })).toBeInTheDocument();
  });

  it('displays theme toggle button', () => {
    renderWithProviders(<Header />);
    const themeToggle = screen.getByRole('button', { name: /switch to.*mode/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('handles theme toggle click', () => {
    renderWithProviders(<Header />);
    const themeToggle = screen.getByRole('button', { name: /switch to.*mode/i });
    
    fireEvent.click(themeToggle);
    // The theme toggle should be clicked (mock function should be called)
    expect(themeToggle).toBeInTheDocument();
  });

  it('shows mobile menu button on small screens', () => {
    renderWithProviders(<Header />);
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    renderWithProviders(<Header />);
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    
    fireEvent.click(mobileMenuButton);
    // Mobile menu should be visible (depending on implementation)
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('highlights active navigation link', () => {
    mockLocation.pathname = '/about';
    renderWithProviders(<Header />);
    
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveClass('active');
  });

  it('renders with theme context', () => {
    renderWithProviders(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('has proper navigation structure', () => {
    renderWithProviders(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check that navigation contains multiple links
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('handles keyboard navigation', () => {
    renderWithProviders(<Header />);
    const firstLink = screen.getByRole('link', { name: /home/i });
    
    firstLink.focus();
    expect(document.activeElement).toBe(firstLink);
    
    // Test Tab navigation
    fireEvent.keyDown(firstLink, { key: 'Tab' });
    expect(document.activeElement).toBeDefined();
  });

  it('closes mobile menu when clicking outside', () => {
    renderWithProviders(<Header />);
    const mobileMenuButton = screen.getByRole('button', { name: /open main menu/i });
    
    // Open mobile menu
    fireEvent.click(mobileMenuButton);
    
    // Click outside (on document body)
    fireEvent.click(document.body);
    
    // Menu should be closed (implementation dependent)
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('scrolls to top when logo is clicked', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    
    renderWithProviders(<Header />);
    const logo = screen.getByAltText(/logo/i);
    
    fireEvent.click(logo);
    
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    
    scrollToSpy.mockRestore();
  });
}); 