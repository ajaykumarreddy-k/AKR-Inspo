import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-red-500 p-8 flex flex-col items-start justify-center font-mono">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-xl mb-4">{this.state.error && this.state.error.toString()}</p>
          <div className="w-full bg-neutral-900 p-4 rounded overflow-auto text-sm text-neutral-300 whitespace-pre-wrap">
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-8 px-4 py-2 bg-white text-black font-bold rounded hover:opacity-80"
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
