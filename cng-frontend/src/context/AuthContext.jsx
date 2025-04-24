import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Load user from local storage
  useEffect( () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const decodedToken = jwtDecode(parsedUser.token);
        
        // Optionally: Check if the token is expired
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();
        if (!isTokenExpired) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (err) {
        console.error("Error decoding token", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email, password, navigate) => {
    try {
      const { data } = await axios.post(
        `${__API_URL__}/auth/login`,
        { email, password }
      );

      if (!data || !data._id) {
        throw new Error("Server Sent and Unexpected Response");
      }

      setUser(data);
      const userData = {
        role: data.role,
        token: data.token,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      if (data.role === "user") {
        navigate("/home");
      } else if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        throw new Error("No valid role assigned to you.");
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.error || error.message;
      throw new Error(errorMessage);
    }
  };

  // Register User
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
    console.log("gender = " + gender)
    try {
      const endpoint = isOtpVerification
        ? `${__API_URL__}/auth/verify-otp`
        : `${__API_URL__}/auth/register`;

      const payload = isOtpVerification
        ? { email, otp }
        : { name, email, password, gender , role  };

      const { data } = await axios.post(endpoint, payload);

      if (isOtpVerification) {
        // If OTP verification successful
        setUser(data);
        navigate("/login"); // Redirect to login after successful verification
      } else {
        // If OTP sent successfully
        return { success: true, email };
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          (isOtpVerification ? "OTP verification failed" : error.message)
      );
    }
  };

  // Logout User
  const logout = (navigate) => {
    setUser(null);
    console.log("Logged-Out Successfully");
    localStorage.removeItem("user");
    navigate("/login"); // ✅ Ensure navigate is passed when calling logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
