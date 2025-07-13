import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock window.matchMedia for theme detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver for scroll animations
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver for responsive components
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock fetch for API calls
global.fetch = vi.fn();

// Mock local storage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock session storage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock navigator for PWA features
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: vi.fn(() => Promise.resolve()),
    ready: Promise.resolve(),
    getRegistration: vi.fn(() => Promise.resolve()),
  },
  writable: true,
});

// Mock URL.createObjectURL for image handling
global.URL.createObjectURL = vi.fn(() => 'mocked-url');
global.URL.revokeObjectURL = vi.fn();

// Mock hooks and services globally
vi.mock('../context/ThemeContext', () => ({
  useTheme: vi.fn(() => ({
    isDarkMode: true,
    toggleTheme: vi.fn(),
  })),
  ThemeProvider: ({ children }) => children,
}));

vi.mock('../context/ContactContext', () => ({
  useContact: vi.fn(() => ({
    formData: { name: '', email: '', subject: '', message: '' },
    updateFormData: vi.fn(),
    isSubmitting: false,
    submitStatus: null,
    submitForm: vi.fn(),
    resetForm: vi.fn(),
  })),
  ContactProvider: ({ children }) => children,
}));

vi.mock('../hooks/useScrollAnimation', () => ({
  useSmoothScroll: vi.fn(() => ({
    scrollToSection: vi.fn(),
  })),
}));

// vi.mock('../hooks/useAsyncData', () => ({
//   useRetryableData: vi.fn(() => ({
//     data: [],
//     loading: false,
//     error: null,
//     refetch: vi.fn(),
//     retryCount: 0,
//     isRetrying: false,
//   })),
//   useDeferredValue: (value) => value,
//   useOptimistic: (state) => [state, vi.fn()],
// }));

// vi.mock('../services/githubApi', () => ({
//   githubApi: {
//     getFeaturedRepositories: vi.fn(() => Promise.resolve([])),
//     getProfile: vi.fn(() => Promise.resolve(null)),
//     getRepositoryLanguages: vi.fn(() => Promise.resolve({})),
//     getRepositoryTopics: vi.fn(() => Promise.resolve({ names: [] })),
//   },
// }));

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Setup and teardown for all tests
beforeAll(() => {
  // Any global setup
});

afterAll(() => {
  // Any global cleanup
}); 