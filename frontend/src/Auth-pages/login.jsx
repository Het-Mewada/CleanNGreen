import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  // const GoogleLoginButton = () => {
  const handleGoogleLogin = (e) => {
    e.preventDefault()
    window.location.href = `https://cleanngreen.onrender.com/api/auth/google`;
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous error

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Enter a Valid Email");
      return;
    }

    try {
      await login(email, password, navigate);
    } catch (err) {
      console.error("Login error:", err.message); // Logs the exact error
      setError(err.message); // Directly set the extracted error message
    }
  };
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left side - Login Form (always visible) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-100 px-4 px-md-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 fw-bold text-center">Welcome back</h2>

            {/* Displaying error message */}
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="border p-4 mb-4">
              <p className="text-muted text-center mb-5">
                Please enter your details
              </p>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control py-2"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control py-2"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-end mt-2">
                  <a
                    href="#forgot-password"
                    className="text-decoration-none small"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="d-grid gap-2 mb-3">
                <button type="submit" className="btn btn-dark py-2 fw-semibold">
                  Sign in
                </button>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <hr className="flex-grow-1" />
                <span className="px-2 text-muted">OR</span>
                <hr className="flex-grow-1" />
              </div>

              <button
                onClick={handleGoogleLogin}
                className="flex justify-around  px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-200"
                style={{
                  width:'100%',
                  textAlign:'center',
                }}
              >
                <span className=" flex gap-4 text-sm  font-medium text-gray-700">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
Continue with Google                </span>
              </button>
              <div className="text-center mt-4">
                <p className="text-muted">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-decoration-none fw-semibold"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Image (hidden on mobile) */}
        <div className="col-md-6 d-none d-md-block bg-primary p-0">
          <div
            className="h-100 w-100"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/681467/pexels-photo-681467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="h-100 w-100 d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            >
              <div className="text-white px-5 text-center">
                <h1 className="display-4 fw-bold mb-4">
                  Welcome to Our Platform
                </h1>
                <p className="fs-5">
                  Join thousands of satisfied users who manage their work
                  efficiently with our solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
