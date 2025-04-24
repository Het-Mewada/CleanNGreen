import { useState, useEffect, useContext } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";

import {
  Container,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const [editStatus, setEditStatus] = useState({
    status: "idle",
    message: "",
  });
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${__API_URL__}/users/profile`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        console.log("profile data chexk ", res.data.profilePic);
        console.log("User data after decode:", res.data);

        setProfilePic(res.data.profilePic);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfilePicUpdate = async (filePath) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.put(
        `${__API_URL__}/users/profile-pic`,
        { profilePic: filePath },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setProfilePic(data.profilePic);
      setError(null);
      alert("Profile picture updated successfully!");
    } catch (err) {
      setError("Error updating profile picture. Please try again.");
      console.error("Error updating profile", err);
    } finally {
      setLoading(false);
    }
  };

  async function updateUser(user) {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setEditStatus({ status: "loading", message: "Editing User..." });

    try {
      const response = await axios.post(
        `${__API_URL__}/users/edit-profile`,
        {
          data: user, // Send the user object directly, not wrapped in a data property
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setEditStatus({ status: "success", message: response.data.message });
        setUser(response.data.user); // Update the user context with the returned user data
        return true;
      }
    } catch (error) {
      console.log(error);
      setEditStatus({
        status: "error",
        message: error.response?.data?.message || "Failed to update user",
      });
      return false;
    }
  }
  function removeProfilepic() {
    alert("hello");
  }

  return (
    <Container className="mt-25" style={{ paddingBottom: "60px" }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="shadow-lg p-4 bg-dark border-0"
            style={{ borderRadius: "20px", backgroundColor: "#ffffff" }}
          >
            <Card.Body>
              <h2
                className="text-center mb-4"
                style={{
                  color: "#e8b98f",
                  fontFamily: "NeuropolX",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  borderBottom: "2px solid #278783",
                  paddingBottom: "8px",
                }}
              >
                User Profile
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" style={{ color: "#278783" }} />
                  <p className="mt-2">Loading...</p>
                </div>
              ) : user ? (
                <>
                  <div className="text-center flex justify-center mb-4">
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      {console.log("hello user : ", user)}
                      <img
                        src={
                          profilePic
                            ? profilePic
                            : user.gender === "male"
                            ? "https://w7.pngwing.com/pngs/490/157/png-transparent-male-avatar-boy-face-man-user-flat-classy-users-icon.png"
                            : "https://cdn-icons-png.flaticon.com/256/6997/6997662.png"
                        }
                        alt="Profile"
                        className="rounded-circle border border-2"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderColor: "#278783",
                          boxShadow: "0 0 10px rgba(39, 135, 131, 0.4)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          right: "0px",
                          backgroundColor: "#000000",
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                        }}
                        onClick={() => {
                          setEditFormData(user);
                          setIsEditModeOpen(user);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="white"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </div>
                    </div>
                    {isEditModeOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-slate-900/20">
                        <div className="bg-slate-50 rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-down">
                          {/* Close button (only shown when not in loading state) */}
                          {editStatus.status !== "loading" && (
                            <button
                              onClick={() => {
                                setIsEditModeOpen(null);
                                setEditStatus({ status: "idle", message: "" });
                              }}
                              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl transition-colors"
                            >
                              &times;
                            </button>
                          )}

                          {/* Loading State */}
                          {editStatus.status === "loading" && (
                            <div className="text-center space-y-4">
                              <div className="mx-auto w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-2 animate-spin">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 text-teal-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                              </div>
                              <p className="text-teal-600 font-medium">
                                {editStatus.message}
                              </p>
                            </div>
                          )}

                          {/* Initial Form State */}
                          {editStatus.status === "idle" && (
                            <div className="text-center space-y-4">
                              <div className="mx-auto w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 text-teal-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </div>

                              <h2 className="text-2xl font-medium text-slate-800">
                                Edit Profile
                              </h2>

                              <div className="space-y-3 text-left">
                                <div>
                                  <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    value={editFormData.email}
                                    onChange={(e) =>
                                      setEditFormData({
                                        ...editFormData,
                                        email: e.target.value,
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    value={editFormData.name}
                                    onChange={(e) =>
                                      setEditFormData({
                                        ...editFormData,
                                        name: e.target.value,
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Gender
                                  </label>
                                  <select
                                    value={editFormData.gender}
                                    onChange={(e) =>
                                      setEditFormData({
                                        ...editFormData,
                                        gender: e.target.value,
                                      })
                                    }
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                  >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                </div>
                                {profilePic && (
                                  <div>
                                    <button
                                      className="bg-red-500 w-100 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
                                      onClick={() => {
                                        handleProfilePicUpdate(null);
                                        setIsEditModeOpen(null);
                                      }}
                                    >
                                      Remove Profile Image
                                    </button>
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => setIsEditModeOpen(null)}
                                  className="px-5 w-50 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={async () => {
                                    const success = await updateUser(
                                      editFormData
                                    );
                                    if (success) {
                                      setTimeout(() => {
                                        setIsEditModeOpen(null);
                                        setEditStatus({
                                          status: "idle",
                                          message: "",
                                        });
                                      }, 1500);
                                    }
                                  }}
                                  className="px-5 py-2 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Success State */}
                          {editStatus.status === "success" && (
                            <div className="text-center space-y-4">
                              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 text-green-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <h2 className="text-2xl font-medium text-slate-800">
                                Success!
                              </h2>
                              <p className="text-green-600 font-medium">
                                {editStatus.message}
                              </p>
                            </div>
                          )}

                          {/* Error State */}
                          {editStatus.status === "error" && (
                            <div className="text-center space-y-4">
                              <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 text-red-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                              <h2 className="text-2xl font-medium text-slate-800">
                                Error
                              </h2>
                              <p className="text-red-600 font-medium">
                                {editStatus.message}
                              </p>
                              <button
                                onClick={() => {
                                  setIsEditModeOpen(null);
                                  setEditStatus({
                                    status: "idle",
                                    message: "",
                                  });
                                }}
                                className="px-5 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                              >
                                Close
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Card
                    className="mb-4 bg-dark"
                    style={{ borderColor: "#FFEBD0" }}
                  >
                    <Card.Body className="text-white">
                      <h4
                        className="mb-3"
                        style={{ color: "#e8b98f", fontWeight: "bold" }}
                      >
                        User Details
                        {console.log(user)}
                      </h4>
                      <p>
                        <strong className="text-[#278783]">Name:</strong>{" "}
                        {user.name || "N/A"}
                      </p>
                      <p>
                        <strong className="text-[#278783]">Email:</strong>{" "}
                        {user.email || "N/A"}
                      </p>
                      <p>
                        <strong className="text-[#278783]">Gender:</strong>{" "}
                        {user.gender || "N/A"}
                      </p>
                      <p>
                        <strong className="text-[#278783]">Role:</strong>{" "}
                        {user.role || "N/A"}
                      </p>
                      <p>
                        <strong className="text-[#278783]">Joined On:</strong>{" "}
                        {new Date(user.createdAt).toDateString()}
                      </p>
                      <p>
                        <strong className="text-[#278783]">
                          Last Updated:
                        </strong>{" "}
                        {new Date(user.updatedAt).toDateString()}
                      </p>
                    </Card.Body>
                  </Card>

                  <Card className="bg-dark" style={{ borderColor: "#FFEBD0" }}>
                    <Card.Body>
                      <h4
                        className="mb-3"
                        style={{ color: "#278783", fontWeight: "bold" }}
                      >
                        Update Profile Picture
                      </h4>
                      <FileUpload onUploadSuccess={handleProfilePicUpdate} />
                    </Card.Body>
                  </Card>

                  <div className="text-center mt-4">
                    <Button
                      variant="danger"
                      onClick={() => logout(navigate)}
                      style={{ backgroundColor: "#C0392B", border: "none" }}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center">No user data available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
