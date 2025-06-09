'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // You can send this to Sentry or another error tracking service here
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full px-4">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Something went wrong
                </h2>
                <p className="text-gray-600 mb-6">
                  We apologize for the inconvenience. Please try refreshing the page.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-neutral-charcoal text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}