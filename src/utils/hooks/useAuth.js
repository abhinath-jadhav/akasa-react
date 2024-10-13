import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is correctly imported

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Using navigate from react-router-dom

  useEffect(() => {
    const isTokenValid = (token) => {
      if (!token) return false;

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Get current time in seconds

        // Check if token is expired
        return decoded.exp > currentTime;
      } catch (error) {
        console.error("Token decoding error:", error);
        return false;
      }
    };

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const valid = isTokenValid(token);
      setIsAuthenticated(valid);
      setLoading(false);

      // Redirect to login if not authenticated
    };

    checkAuth();
    // Optional: If you want periodic token checks, uncomment below
    // const intervalId = setInterval(checkAuth, 1000 * 60 * 5); // Check every 5 minutes
    // return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [navigate]); // Add navigate to the dependency array

  return { isAuthenticated, loading }; // Return loading state
};

export default useAuth;
