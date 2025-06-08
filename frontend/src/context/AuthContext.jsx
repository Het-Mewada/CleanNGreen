import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [defaultAddress , setDefaultaddress] = useState(null)
  const  [orders , setOrders] = useState([null])
  // Load user from local storage/token on initial render
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        
        if (userData?.token) {
          // Verify token is still valid
          const decoded = jwtDecode(userData.token);
          
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("user");
            return;
          }

          // Fetch fresh user data
          const res = await axios.get(`${__API_URL__}/users/profile`, {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          });
          
          setUser({
            ...res.data,
            token: userData.token,
            role: userData.role,
          });
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        localStorage.removeItem("user"); // Clear invalid token
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password, navigate) => {
    try {
      const { data } = await axios.post(`${__API_URL__}/auth/login`, {
        email,
        password,
      });

      if (!data || !data._id) {
        throw new Error("Server sent an unexpected response");
      }

      // Store the complete user data in state
      setUser(data);
      
      // Store necessary data in localStorage
      const userData = {
        role: data.role,
        token: data.token,
        // Add any other minimal necessary data
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on role
      if (data.role === "user") {
        navigate("/home");
      } else if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        throw new Error("No valid role assigned");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(errorMessage);
    }
  };

  // Register User (unchanged)
  const register = async (
    name,
    email,
    password,
    gender,
    role,
    navigate,
    isOtpVerification = false,
    otp = null
  ) => {
    try {
      const endpoint = isOtpVerification
        ? `${__API_URL__}/auth/verify-otp`
        : `${__API_URL__}/auth/register`;

      const payload = isOtpVerification
        ? { email, otp }
        : { name, email, password, gender, role };

      const { data } = await axios.post(endpoint, payload);

      if (isOtpVerification) {
        setUser(data);
        navigate("/login");
      } else {
        return { success: true, email };
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          (isOtpVerification ? "OTP verification failed" : error.message)
      );
    }
  };

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Add isAuthenticated check
  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser, 
        login, 
        register, 
        logout, 
        isAuthenticated,
        loading ,
        defaultAddress,
        setDefaultaddress,
        orders,
        setOrders,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;