import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender,setGender] = useState("")
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [OtpSentTime, setOtpSentTime] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = Date.now();
    const timeDiff = (now - OtpSentTime) / (1000 * 60);
    if (timeDiff < 0.5) {
      setError("Wait for 30 seconds before trying again");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      if (!showOtpField) {
        // First step - submit initial registration (to trigger OTP)
        await register(name, email, password, gender , role, navigate, false );
        setRegistrationData({ name, email, password,gender , role });
        setShowOtpField(true);
        setOtpSentTime(Date.now());
      } else {
        // Second step - submit with OTP
        await register(
          registrationData.name,
          registrationData.email,
          registrationData.password,
          registrationData.gender,
          registrationData.role,
          navigate,
          true,
          otp
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left side - Image (hidden on mobile) */}
        <div className="col-md-6 d-none d-md-block p-0">
          <div
            className="h-100 w-100"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/5645319/pexels-photo-5645319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
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
                <h1 className="display-4 fw-bold mb-4">Join Our Community</h1>
                <p className="fs-5">
                  Create an account to unlock all features and start your
                  journey with us.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-100 px-4 px-md-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 fw-bold text-center">
              {showOtpField ? "Verify Email" : "Create Account"}
            </h2>

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            {showOtpField && (
              <div className="alert alert-info text-center" role="alert">
                We've sent a verification code to {registrationData?.email}
                <p>Please check your Spam Floder to find OTP.</p>{" "}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mb-4 border p-4">
              {!showOtpField ? (
                <>
                  <p className="text-muted mb-4 text-center">
                    Get started with your free account
                  </p>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control py-2"
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control py-2"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
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
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                    <div className="form-text">
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Select Gender
                    </label>
                    <select
                      className="form-control py-2"
                      id="role"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Select Role
                    </label>
                    <select
                      className="form-control py-2"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  {/* OTP Verification Fields */}
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      className="form-control py-2"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      placeholder="Enter 6-digit code"
                    />
                    <div className="form-text mt-2">
                      Didn't receive code?{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={async () => {
                          try {
                            const now = Date.now();
                            const timeDiff = (now - OtpSentTime) / (1000 * 60);
                            if (timeDiff < 0.5) {

                              setError("Wait for 30 seconds before trying again");
                              return;
                            }
                            await register(
                              registrationData.name,
                              registrationData.email,
                              registrationData.password,
                              registrationData.role,
                              navigate,
                              false
                            );
                            setError(null);
                          } catch (err) {
                            setError(err.message);
                          }
                        }}
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="d-grid gap-2 mb-3">
                <button
                  type="submit"
                  className="btn btn-dark py-2 fw-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Processing...
                    </>
                  ) : showOtpField ? (
                    "Verify Account"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>

              {showOtpField && (
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none"
                    onClick={() => {
                      setShowOtpField(false);
                      setError(null);
                    }}
                  >
                    ← Back to registration
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
