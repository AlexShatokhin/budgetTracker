import { Component, ErrorInfo } from "react";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props : any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    componentDidCatch(error : Error, errorInfo : ErrorInfo) {
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <NotFoundPage />;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;