import { useState, useEffect, useContext } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import DeleteAccountButton from "../components/DeleteAccountButton";
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
import { useNavigate, useLocation } from "react-router-dom";
// import ContextMenuWrapper from "../components/ContextMenuWrapper";

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const [editFormData, setEditFormData] = useState();
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [activeState, setActiveState] = useState("edit");
  const [addAddress, setAddAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    houseNo: "",
    street: "",
    locality: "",
    pincode: "",
    state: "",
  });
  const [editStatus, setEditStatus] = useState({
    status: "idle",
    message: "",
  });
  const { user, setUser, logout, orders, setOrders } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openEditAddress) {
      setOpenEditAddress(true);
      setActiveState(location.state?.activeState);
    }
    const fetchUserProfile = async () => {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) {
        setError("No profile data , Please Login");
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
        console.log("profile data : ", res.data.orders);
        setOrders(res.data.orders);
        setUser(res.data);
        // console.log(res.data)
        setAddresses(res.data.address);

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
      setError("No profile data , Please Login");
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
      toast.success(data.message);
      setIsEditModeOpen(false);
    } catch (error) {
      setError("Error updating profile picture. Please try again.");
      if (error.response && error.response.data) {
        toast.error("Error:", error.response.data.message)
      } else {
        toast.error("Unknown error:", error.message)
      }
    } finally {
      setLoading(false);
    }
  };

  async function updateUser(user) {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      navigate("/login");
      return;
    }

    setEditStatus({ status: "loading", message: "Editing User..." });

    try {
      const response = await axios.post(
        `${__API_URL__}/users/edit-profile`,
        {
          data: {
            _id: user._id,
            name: user.name,
            gender: user.gender,
            role: user.role,
            address: user.address,
          }, // Send the user object directly, not wrapped in a data property
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const addAddressHandler = async (e) => {
    e.preventDefault();

    if (!validateAddress(addAddress)) {
      return;
    }
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.post(
        `${__API_URL__}/users/profile/add-address`,
        {
          userId: user._id,
          addAddress: addAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Address added: ", res.data);
      toast.success(res.data.message);
      setAddresses(res.data.addresses);
      setSelectedAddress(null);
      setAddAddress(null);
    } catch (err) {
      console.error("Error adding address:", err);
      toast.error(err.response.data.errors[0]);
    }
  };

  async function deleteAddress(addressId) {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.delete(
        `${__API_URL__}/users/profile/delete-address`,
        {
          params: {
            userId: user._id,
            addressID: addressId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Address deleted: ", res.data);
      setAddresses(res.data.remainingAddresses);
      toast.success(res.data.message);
    } catch (err) {
      console.error("Error deleting address:", err);
      setError(err.message);
    }
  }

  const validateAddress = ({ houseNo, street, locality, pincode, state }) => {
    const errors = [];

    if (!houseNo?.trim()) errors.push("House No is required");
    if (!street?.trim()) errors.push("Street is required");
    if (!locality?.trim()) errors.push("Locality is required");

    // Check for 6-digit pincode (India-style)
    if (!/^\d{6}$/.test(pincode)) errors.push("Enter a valid 6-digit pincode");

    if (!state?.trim()) errors.push("State is required");

    // If there are errors, show the first and stop further
    if (errors.length > 0) {
      toast.error(errors[0]);
      return false; // stop further execution
    }

    return true; // valid
  };

  return (
    <Container className="mt-25 " style={{ paddingBottom: "60px" }}>
      <Row className="justify-content-center">
        <Col className="max-w-80">
          <Card
            className=" shadow-lg px-10 bg-dark border-0"
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
                Profile
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" style={{ color: "#278783" }} />
                  <p className="mt-2">Loading...</p>
                </div>
              ) : user ? (
                <div>
                  <div className=" grid md:grid-cols-2 sm:grid-cols-1">
                    <div className=" text-center flex justify-center mb-4 ">
                      <div
                        className="my-auto"
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={
                            profilePic
                              ? profilePic
                              : user.gender === "male"
                              ? "/images/male-avatar.svg"
                              : "https://cdn-icons-png.flaticon.com/256/6997/6997662.png"
                          }
                          alt="Profile"
                          className="rounded-full fit h-40 w-40 sm:h-63 sm:w-63"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                        <div
                          className="
                              absolute 
                              bottom-0 
                              right-0 
                              bg-[#278783] 
                              w-[50px] 
                              h-[50px] 
                              rounded-full 
                              flex 
                              items-center 
                              justify-center 
                              shadow-[0_0_5px_rgba(0,0,0,0.3)]
                              sm:h-[60px]
                              sm:w-[60px]
                            "
                          onClick={() => {
                            setEditFormData(user);
                            setIsEditModeOpen(user);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="white"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                          </svg>
                        </div>
                      </div>
                      {isEditModeOpen && (
                        <div className="fixed  inset-0 flex  items-center justify-center z-50 backdrop-blur-sm bg-slate-900/20">
                          <div className="bg-slate-50 max-h-150 max-w-150 overflow-scroll rounded-xl shadow-lg p-6 w-full  relative animate-fade-in-down">
                            {/* Close button (only shown when not in loading state) */}
                            {editStatus.status !== "loading" && (
                              <button
                                onClick={() => {
                                  setIsEditModeOpen(null);
                                  setEditStatus({
                                    status: "idle",
                                    message: "",
                                  });
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
                              <div className="text-center space-y-4  ">
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
                                      value={user.email}
                                      disabled
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
                                  <h4
                                    className="mb-3"
                                    style={{
                                      color: "#278783",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Update Profile Picture
                                  </h4>
                                  <FileUpload
                                    onUploadSuccess={handleProfilePicUpdate}
                                  />
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
                                      console.log(
                                        "Form at submit time : ",
                                        editFormData
                                      );
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

                    <div>
                      {" "}
                      <Card
                        className="mb-4 bg-dark"
                        style={{ borderColor: "#FFEBD0" }}
                      >
                        <Card.Body className="text-white">
                          <h4
                            className="mb-3"
                            style={{ color: "#e8b98f", fontWeight: "bold" }}
                          >
                            Details :{console.log(user)}
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
                            <strong className="text-[#278783]">
                              Joined On:
                            </strong>{" "}
                            {new Date(user.createdAt).toDateString()}
                          </p>
                          <p>
                            <strong className="text-[#278783]">
                              Last Updated:
                            </strong>{" "}
                            {new Date(user.updatedAt).toDateString()}
                          </p>
                        </Card.Body>
                        <DeleteAccountButton />
                      </Card>
                    </div>
                  </div>
                  <div className="flex justify-between ">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setOpenEditAddress(true);
                      }}
                    >
                      Manage Addresses
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => logout(navigate)}
                      style={{ backgroundColor: "#C0392B", border: "none" }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-center">No user data available.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {openEditAddress && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white h-140 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header with tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-4 font-medium text-lg transition-colors ${
                  activeState === "edit"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveState("edit")}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Addresses
                </div>
              </button>
              <button
                className={`flex-1 py-4 font-medium text-lg transition-colors ${
                  activeState === "add"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveState("add")}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add New
                </div>
              </button>
            </div>
            {activeState === "edit" ? (
              <div className="overflow-y-auto flex-1 p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Your Addresses
                </h2>

                {/* Address Cards */}
                <div className="grid gap-4 mb-6">
                  {addresses.map((address) => (
                    <div
                      key={address?._id}
                      onClick={() => setSelectedAddress(address)}
                      className={`border rounded-xl p-4  transition-all ${
                        selectedAddress?._id === address?._id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="pr-3">
                          <h3 className="font-medium text-gray-900">
                            {address?.houseNo}, {address?.street}
                          </h3>
                          <p className="text-gray-600">{address?.locality}</p>
                          <p className="text-gray-500 text-sm mt-1">
                            {address?.pincode}, {address?.state}
                          </p>
                        </div>
                        {selectedAddress?._id === address?._id && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Editing
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address Edit Form */}
                {selectedAddress && (
                  <div>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();

                        if (!validateAddress(selectedAddress)) {
                          return;
                        }

                        const token = JSON.parse(
                          localStorage.getItem("user")
                        ).token;

                        try {
                          const res = await axios.put(
                            `${__API_URL__}/users/profile/update-address`,
                            {
                              _id: selectedAddress._id,
                              houseNo: selectedAddress.houseNo,
                              street: selectedAddress.street,
                              locality: selectedAddress.locality,
                              pincode: selectedAddress.pincode,
                              state: selectedAddress.state,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                          setSelectedAddress(null);
                          setAddresses((prev) =>
                            prev.map((addr) =>
                              addr._id === selectedAddress._id
                                ? res.data.address
                                : addr
                            )
                          );
                          toast.success("Address updated successfully!");
                        } catch (err) {
                          console.log("Error Editing Address : ", err);
                        }
                      }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        Edit Address
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            House No.
                          </label>
                          <input
                            type="text"
                            value={selectedAddress.houseNo}
                            onChange={(e) =>
                              setSelectedAddress({
                                ...selectedAddress,
                                houseNo: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street
                          </label>
                          <input
                            type="text"
                            value={selectedAddress.street}
                            onChange={(e) =>
                              setSelectedAddress({
                                ...selectedAddress,
                                street: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Locality
                        </label>
                        <input
                          type="text"
                          value={selectedAddress.locality}
                          onChange={(e) =>
                            setSelectedAddress({
                              ...selectedAddress,
                              locality: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pincode
                          </label>
                          <input
                            type="text"
                            value={selectedAddress.pincode}
                            onChange={(e) =>
                              setSelectedAddress({
                                ...selectedAddress,
                                pincode: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            value={selectedAddress.state}
                            onChange={(e) =>
                              setSelectedAddress({
                                ...selectedAddress,
                                state: e.target.value,
                              })
                            }
                          >
                            <option value="Andhra Pradesh">
                              Andhra Pradesh
                            </option>
                            <option value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">
                              Himachal Pradesh
                            </option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">
                              Madhya Pradesh
                            </option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedAddress(null)}
                          className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-300 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Save Changes
                        </button>
                      </div>
                    </form>
                    <div className="flex mt-3 w-full text-center items-center gap-3 px-4 py-2 bg-red-400 hover:bg-red-500 rounded-md shadow-sm transition-all duration-200 w-fit">
                      <div
                        onClick={() => {
                          deleteAddress(selectedAddress._id);
                          setSelectedAddress(null);
                          console.log("i am here");
                        }}
                        className="flex gap-3 mx-auto"
                      >
                        <Trash2 className="w-9 h-9 p-2  bg-white text-red-600 rounded-full hover:bg-gray-100  transition duration-200" />
                        <button className="text-white font-semibold">
                          Delete Address
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold my-4 text-center">
                  New Address
                </h2>

                <form onSubmit={addAddressHandler} className="space-y-4">
                  <div className="flex flex-col gap-4  mx-4 ">
                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="House No."
                      value={addAddress?.houseNo || ""}
                      onChange={(e) =>
                        setAddAddress({
                          ...addAddress,
                          houseNo: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="Street"
                      value={addAddress?.street || ""}
                      onChange={(e) =>
                        setAddAddress({
                          ...addAddress,
                          street: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="Locality"
                      value={addAddress?.locality || ""}
                      onChange={(e) =>
                        setAddAddress({
                          ...addAddress,
                          locality: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="Pincode"
                      value={addAddress?.pincode || ""}
                      onChange={(e) =>
                        setAddAddress({
                          ...addAddress,
                          pincode: e.target.value,
                        })
                      }
                    />
                    <select
                      className="w-full border rounded-lg px-4 py-2"
                      value={addAddress?.state}
                      onChange={(e) =>
                        setAddAddress({ ...addAddress, state: e.target.value })
                      }
                    >
                      <option value="" selected={addAddress === null}>
                        Select State
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Save Address
                  </button>
                </form>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedAddress(null);
                setOpenEditAddress(false);
              }}
              className="mt-6 w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProfilePage;
