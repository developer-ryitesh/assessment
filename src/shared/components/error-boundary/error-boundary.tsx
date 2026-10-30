import React from "react";

type Props = {
   children: React.ReactNode;
   fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
};

type State = {
   hasError: boolean;
   error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error };
   }

   componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.error("Caught by SafeBoundary:", error, info);
   }

   render() {
      const { hasError, error } = this.state;

      if (hasError && error) {
         if (typeof this.props.fallback === "function") {
            return this.props.fallback(error);
         }

         return (
            this.props.fallback ?? (
               <div className="p-2 text-red-700 bg-red-50 rounded">
                  <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
                  <p className="mb-2 text-sm">
                     <strong>Error:</strong> {error.message}
                  </p>
                  <pre className="whitespace-pre-wrap p-2 rounded text-[9px] overflow-x-auto">{error.stack}</pre>
               </div>
            )
         );
      }

      return this.props.children;
   }
}
