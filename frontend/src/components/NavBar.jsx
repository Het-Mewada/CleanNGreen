import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Icons
import { Button } from "react-bootstrap";
// Define your logo components

export default function NAV() {
  const { user , logout} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  return (
    <nav className="bg-[#278783] shadow-md border-b border-[#236f70]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={location} style={{ textDecoration: "none" }}>
              <span
                className="flex items-center gap-4 text-2xl font-bold tracking-wide"
                style={{ fontFamily: "Orbitron", color: "#FFEBD0" }}
              >
                <img
                  src="/images/main-logo.png"
                  alt="Eco Icon"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                <span
                  style={{
                    fontSize: "24px",
                  }}
                >
                  EcoSphere
                </span>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#FFEBD0] focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3 items-center">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                  style={{
                    textDecoration: "none",
                    color: "#278783",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                  style={{
                    textDecoration: "none",
                    color: "#278783",
                  }}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {user.role === "admin" ? (
                  <>
                    <NavLink
                      to="/home"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition" // active style
                            : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition" // inactive style
                      }
                      style={{
                        textDecoration: "none",
                        color: "#278783",
                      }}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/admin-dashboard"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition" // active style
                            : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition" // inactive style
                      }
                      style={{
                        textDecoration: "none",
                        color: "#278783",
                      }}
                    >
                      Admin Dashboard
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/home"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition"
                          : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      }
                      style={{
                        textDecoration: "none",
                        color: "#278783",
                      }}
                    >
                      Home
                    </NavLink>

                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition"
                          : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      }
                      style={{
                        textDecoration: "none",
                        color: "#278783",
                      }}
                    >
                      About Us
                    </NavLink>

                    <NavLink
                      to="/feedback-form"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition"
                          : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      }
                      style={{
                        textDecoration: "none",
                        color: "#278783",
                      }}
                    >
                      Give Feedback
                    </NavLink>
                    <div className="text-center">
                      <Button
                        variant="danger"
                        onClick={() => logout(navigate)}
                        style={{ backgroundColor: "#C0392B", border: "none" }}
                      >
                        Logout
                      </Button>
                    </div>

                    {/* 
                    <NavLink
                      to="/faq"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition"
                          : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      }
                    >
                      FAQ
                    </NavLink> */}
                  </>
                )}
                <NavLink
                  to="/profile"
                  style={{ textDecoration: "none", color: "#278783" }}
                >
                  <img
                    src={`${
                      user.gender === "female"
                        ? "/images/female-avatar.png"
                        : "/images/male-avatar.svg"
                    }`}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className=" md:hidden  mt-2 flex flex-col space-y-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="no-underline text-inherit px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                  style={{ textDecoration: "none", color: "#278783" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="no-underline text-inherit px-4 py-2 mb-2.5 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                  style={{ textDecoration: "none", color: "#278783" }}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {user.role === "admin" ? (
                  <>
                    <Link
                      to="/admin-dashboard"
                      onClick={toggleMenu}
                      className="no-underline text-inherit px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      style={{ textDecoration: "none", color: "#278783" }}
                    >
                      Admin Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/home"
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition"
                          : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      }
                      style={{
                        textDecoration: "none",
                        color: "#278783",
                      }}
                    >
                      Home
                    </NavLink>

                    <NavLink
                      to="/about"
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition"
                          : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      }
                      style={{
                        textDecoration: "none",
                        color: "#278783",
                      }}
                    >
                      About Us
                    </NavLink>

                    <NavLink
                      to="/feedback-form"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition"
                          : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      }
                      style={{
                        textDecoration: "none",
                        color: "#278783",
                      }}
                    >
                      Give Feedback
                    </NavLink>
                  </>
                )}
                <NavLink
                  to="/profile"
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "no-underline px-4 mb-2 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition"
                      : "no-underline px-4 mb-2 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                  }
                  style={{
                    textDecoration: "none",
                    color: "#278783",
                  }}
                >
                  Profile{" "}
                </NavLink>
                <div className="text-center mb-2">
                  <Button
                    variant="danger"
                    onClick={() => logout(navigate)}
                    style={{ backgroundColor: "#C0392B", border: "none" }}
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
