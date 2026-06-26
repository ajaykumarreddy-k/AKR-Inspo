import type { ReactNode, ErrorInfo } from 'react';
import { Component } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ScrollAnimations error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
          <pre className="bg-neutral-900 text-red-300 p-4 rounded-lg text-sm overflow-auto">
            {this.state.error?.message}
          </pre>
          <p className="mt-4 text-neutral-400 text-sm">
            Check the browser console for more details.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
