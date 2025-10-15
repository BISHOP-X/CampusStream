import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6 text-destructive inline-flex">
              <AlertCircle className="h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Oops! Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Don't worry, our team has been
              notified. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 p-4 bg-destructive/10 rounded-lg text-left">
                <p className="text-sm font-mono text-destructive break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <Button onClick={this.handleReset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Page
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
