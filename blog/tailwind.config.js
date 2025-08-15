/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-light': '#06D6A0',
        'primary-dark': '#04B082',
        primary: {
          light: '#06D6A0',
          dark: '#04B082',
          DEFAULT: '#06D6A0'
        },
        secondary: {
          light: '#FFD166',
          dark: '#E6BC5A'
        },
        accent: {
          light: '#EF476F',
          dark: '#D73F63'
        },
        background: {
          light: '#FFFFFF',
          dark: '#1A1A1A'
        },
        surface: {
          light: '#F8F9FA',
          dark: '#2D2D2D'
        },
        text: {
          light: '#333333',
          dark: '#E2E2E2'
        }
      },
      fontFamily: {
        'maven': ['var(--font-maven-pro)', 'sans-serif'],
        'sans': ['var(--font-maven-pro)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333333',
            '--tw-prose-headings': '#333333',
            '--tw-prose-links': '#06D6A0',
            '--tw-prose-code': '#06D6A0',
            '--tw-prose-pre-bg': '#1e293b',
            '--tw-prose-pre-code': '#e2e8f0',
            a: {
              color: '#06D6A0',
              textDecoration: 'none',
              '&:hover': {
                color: '#04B082',
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#06D6A0',
              backgroundColor: 'rgba(6, 214, 160, 0.1)',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        invert: {
          css: {
            color: '#E2E2E2',
            '--tw-prose-headings': '#E2E2E2',
            '--tw-prose-links': '#04B082',
            '--tw-prose-code': '#04B082',
            a: {
              color: '#04B082',
              '&:hover': {
                color: '#06D6A0',
              },
            },
            code: {
              color: '#04B082',
              backgroundColor: 'rgba(4, 176, 130, 0.1)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}