import React, { useEffect, useState } from "react";
import {
  FaUserShield,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaComments,
  FaExchangeAlt,
  FaPlus,
} from "react-icons/fa";
import { MdDashboard, MdEmail } from "react-icons/md";
import { BsKanbanFill } from "react-icons/bs";
import axios from "axios";
import AuthContext from "../context/AuthContext"; // Adjust path as needed
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

  const token = JSON.parse(localStorage.getItem("user"))?.token;

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://192.168.141.31:5000/api/home/projects"
        );
        setProjects(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch projects");
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(
          `http://192.168.141.31:5000/api/home/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(projects.filter((p) => p._id !== projectId));
      } catch (error) {
        setError(error.response?.data?.message || "Failed to delete project");
      }
    }
  };

  return (
    <div className="homepage bg-dark">
      {/* Updated Hero Section with Login/Logout */}
      <header className="hero-section relative text-center text-white py-20 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
            {/* Fallback image if video doesn't load */}
            <img
              src="https://media.istockphoto.com/id/1140409137/vector/trendy-low-poly-triangles-with-navy-bg.jpg?s=612x612&w=0&k=20&c=vunManM5m2lfkcgYpOd_dIF-gCGUEUL4SjLYe-o9Nng="
              alt="Background"
              className="w-full h-full object-cover"
            />
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"
            style={{
              backdropFilter: "blur(1px)",
            }}></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 mt-12 px-4 text-center">
          <h1 className=" fw-bold mb-5">
            My Digital{" "}
            <span style={{
                fontSize:'9vw',             
            }}>

            <span
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
              >
              Universe
            </span>{" "}
            ✨              </span>

          </h1>

          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Welcome to FusionX Ecosystem
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover our integrated services in one unified platform
            </p>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-white">My Projects</h2>
            {user?.role === "admin" && (
              <button
                className="d-flex btn btn-primary"
                onClick={() => navigate("/projects/new")}
              >
                <FaPlus className="me-2" />
                Add Project
              </button>
            )}
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-5">
              <h4>No projects found</h4>
              {user?.role === "admin" && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate("/projects/new")}
                >
                  Create Your First Project
                </button>
              )}
            </div>
          ) : (
            <div className="row g-4 ">
              {projects.map((project) => (
                <div key={project._id} className="col-md-6 col-lg-4 ">
                  <div className="card project-card h-100 ">
                    {project.thumbnail && (
                      <img
                        src={project.thumbnail}
                        className="card-img-top"
                        alt={project.title}
                        style={{ height: "200px" }}
                      />
                    )}
                    <div className="card-body d-flex flex-column ">
                      <div className=" d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title mb-0">
                          {project.title.charAt(0).toUpperCase() +
                            project.title.slice(1)}
                        </h5>
                        <span
                          className={`badge ${
                            project.status === "completed"
                              ? "bg-success"
                              : project.status === "in-progress"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                          }`}
                        >
                          {project.status.charAt(0).toUpperCase() +
                            project.status.slice(1)}
                        </span>
                      </div>
                      <p className="card-text flex-grow-1">
                        {project.shortDescription ||
                          project.description.substring(0, 100)}
                        ...
                      </p>
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <span
                            key={tech.name}
                            className="badge bg-gray-200 text-dark"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <a
                          href={project.liveUrl || "#"}
                          className="btn btn-sm btn-outline-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project
                        </a>
                        <div>
                          <div className="card-footer bg-transparent border-top-0">
                            {user?.role === "admin" && (
                              <div className="d-flex justify-content-end gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() =>
                                    navigate(`/projects/edit/${project._id}`)
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() =>
                                    handleDeleteProject(project._id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .hero-section {
          // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          height: 100vh;
          border-radius: 0 0 20px 20px;
        }
        .project-card {
          transition: transform 0.3s, box-shadow 0.3s;
          border: none;
          border-radius: 10px;
        }
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .project-card .card-img-top {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .btn-primary {
          background-color: #667eea;
          border-color: #667eea;
        }
        .btn-primary:hover {
          background-color: #5a6fd1;
          border-color: #5a6fd1;
        }
      `}</style>
    </div>
  );
};

export default Home;
