import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (event) => {
      setHasError(true);
      setError(event.error);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return <h2>Something went wrong: {error?.message}</h2>;
  }

  return <>{children}</>;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node
};

export default ErrorBoundary;
