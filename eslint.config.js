import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "no-console": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace|group|groupEnd|groupCollapsed)$/]",
          message: "Unexpected property on console object was called"
        }
      ],
      // React rules
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off" // Turn off if you're using TypeScript or don't want prop validation
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];