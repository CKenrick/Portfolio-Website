import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, mockFetch, mockFetchError } from '../../test/utils';
import ContactForm from '../ContactForm';
import emailjs from '@emailjs/browser';

// Mock EmailJS
vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
  send: vi.fn(),
}));

// Mock fetch for backend API fallback
global.fetch = vi.fn();

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment variables for each test
    vi.stubEnv('REACT_APP_EMAILJS_SERVICE_ID', 'test_service_id');
    vi.stubEnv('REACT_APP_EMAILJS_TEMPLATE_ID', 'test_template_id');
    vi.stubEnv('REACT_APP_EMAILJS_PUBLIC_KEY', 'test_public_key');
  });

  it('renders without crashing', () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays all form fields', () => {
    renderWithProviders(<ContactForm />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('allows user to type in all fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'This is a test message');
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(subjectInput).toHaveValue('Test Subject');
    expect(messageInput).toHaveValue('This is a test message');
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('validates minimum message length', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    await user.type(messageInput, 'Hi');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/message must be at least/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data using EmailJS', async () => {
    const user = userEvent.setup();
    emailjs.send.mockResolvedValue({ status: 200, text: 'OK' });
    
    renderWithProviders(<ContactForm />);
    
    // Fill out form with valid data
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with sufficient length');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledWith(
        'test_service_id',
        'test_template_id',
        expect.objectContaining({
          from_name: 'John Doe',
          from_email: 'john@example.com',
          subject: 'Test Subject',
          message: 'This is a test message with sufficient length',
        }),
        'test_public_key'
      );
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    emailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
    renderWithProviders(<ContactForm />);
    
    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with sufficient length');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    // Should show loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    emailjs.send.mockResolvedValue({ status: 200, text: 'OK' });
    
    renderWithProviders(<ContactForm />);
    
    // Fill out and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with sufficient length');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    const user = userEvent.setup();
    emailjs.send.mockRejectedValue(new Error('Network Error'));
    
    renderWithProviders(<ContactForm />);
    
    // Fill out and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with sufficient length');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/sorry, there was an error/i)).toBeInTheDocument();
    });
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    emailjs.send.mockResolvedValue({ status: 200, text: 'OK' });
    
    renderWithProviders(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    // Fill out form
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'This is a test message with sufficient length');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
    
    // Form should be cleared
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(subjectInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  it('validates maximum message length', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    const longMessage = 'a'.repeat(501);
    
    await user.type(messageInput, longMessage);
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/message must be less than 500 characters/i)).toBeInTheDocument();
    });
  });

  it('prevents multiple submissions', async () => {
    const user = userEvent.setup();
    emailjs.send.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
    renderWithProviders(<ContactForm />);
    
    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with sufficient length');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    
    // Click submit multiple times
    await user.click(submitButton);
    await user.click(submitButton);
    await user.click(submitButton);
    
    // Should only call once
    expect(emailjs.send).toHaveBeenCalledTimes(1);
  });

  it('falls back to backend API when EmailJS is not configured', async () => {
    const user = userEvent.setup();
    
    // Reset env vars to simulate unconfigured EmailJS
    vi.stubEnv('REACT_APP_EMAILJS_SERVICE_ID', 'your_service_id');
    vi.stubEnv('REACT_APP_EMAILJS_TEMPLATE_ID', 'your_template_id');
    vi.stubEnv('REACT_APP_EMAILJS_PUBLIC_KEY', 'your_public_key');
    
    // Mock fetch for backend API
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    
    renderWithProviders(<ContactForm />);
    
    // Fill out form
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with sufficient length');
    
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'This is a test message with sufficient length',
        }),
      });
    });
  });

  it('shows character count for message field', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);
    
    const messageInput = screen.getByLabelText(/message/i);
    
    // Initially should show 0
    expect(screen.getByText('0/500 characters')).toBeInTheDocument();
    
    // Type some text
    await user.type(messageInput, 'Hello world');
    
    // Should update character count
    expect(screen.getByText('11/500 characters')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<ContactForm />);
    
    // Check required fields have proper labels
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    
    // Check submit button
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
}); 