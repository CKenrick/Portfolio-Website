import React from 'react';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { IoMdRefresh } from "react-icons/io";


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    // React 19 enhanced error handling
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // React 19 improved error reporting
    this.setState({
      error: error,
      errorInfo: errorInfo,
      eventId: Date.now().toString()
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // In production, you might want to send to error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      eventId: null
    });
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, eventId } = this.state;
      const { fallback: Fallback, showDetails = false } = this.props;

      // Custom fallback component
      if (Fallback) {
        return <Fallback error={error} resetError={this.handleReset} />;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-red-500 dark:text-red-400">
                <FaExclamationTriangle className="h-12 w-12" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                We're sorry for the inconvenience. The error has been logged.
              </p>
              {eventId && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  Error ID: {eventId}
                </p>
              )}
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={this.handleReset}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <IoMdRefresh className="h-5 w-5 text-red-500 group-hover:text-red-400" />
                </span>
                Try Again
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-colors duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaHome className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />
                </span>
                Go Home
              </button>
            </div>

            {/* Error Details - Only show in development */}
            {showDetails && process.env.NODE_ENV === 'development' && (
              <details className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
                <summary className="font-medium text-gray-900 dark:text-white cursor-pointer">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 space-y-2">
                  <div>
                    <strong className="text-red-600 dark:text-red-400">Error:</strong>
                    <pre className="mt-1 text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {error && error.toString()}
                    </pre>
                  </div>
                  <div>
                    <strong className="text-red-600 dark:text-red-400">Stack Trace:</strong>
                    <pre className="mt-1 text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                      {errorInfo && errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

// Hook for error boundary state (React 19 pattern)
export const useErrorHandler = () => {
  const [error, setError] = React.useState(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
};

export default ErrorBoundary; 