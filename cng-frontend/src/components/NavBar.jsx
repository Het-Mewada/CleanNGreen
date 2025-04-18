import { useContext, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Icons

// Define your logo components

export default function NAV() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

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
                  src="https://cdn-icons-png.flaticon.com/128/16445/16445103.png"
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
                  style={{ textDecoration: "none", color: "#278783" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                  style={{ textDecoration: "none", color: "#278783" }}
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
                      style={{ textDecoration: "none", color: "#278783" }}
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
                      style={{ textDecoration: "none", color: "#278783" }}
                    >
                      Admin Dashboard
                    </NavLink>
                    <NavLink
                      to="/blocked-users"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition" // active style
                            : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition" // inactive style
                      }
                      style={{ textDecoration: "none", color: "#278783" }}
                    >
                      Blocked Users
                    </NavLink>
                    <NavLink
                      to="/insert-data"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition" // active style
                            : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition" // inactive style
                      }
                      style={{ textDecoration: "none", color: "#278783" }}
                    >
                      Insert Data
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/home"
                      className={
                        ({ isActive }) =>
                          isActive
                            ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition" // active style
                            : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition" // inactive style
                      }
                      style={{ textDecoration: "none", color: "#278783" }}
                    >
                      Home
                    </NavLink>
                  </>
                )}
                <NavLink
                  to="/profile"
                  // className={
                  //   ({ isActive }) =>
                  //     isActive
                  //       ? "no-underline px-4 py-2 bg-[#e8b98f] text-dark rounded-full font-semibold shadow transition" // active style
                  //       : "no-underline px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition" // inactive style
                  // }
                  style={{ textDecoration: "none", color: "#278783" }}
                >
                  <img
                    src={`${
                      user.gender === "female"
                        ? "https://cdn-icons-png.flaticon.com/128/6997/6997662.png"
                        : "https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
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
                  className="block px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded font-semibold shadow hover:bg-[#f7dbc4]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="block px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded font-semibold shadow hover:bg-[#f7dbc4]"
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
                    <Link
                      to="/blocked-users"
                      onClick={toggleMenu}
                      className="no-underline text-inherit px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      style={{ textDecoration: "none", color: "#278783" }}
                    >
                      Blocked Users
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={toggleMenu}
                      className="no-underline text-inherit px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      style={{ textDecoration: "none", color: "#278783" }}
                    >
                      User Dashboard
                    </Link>
                    <Link
                      to="/typing-speed-test"
                      onClick={toggleMenu}
                      className="no-underline text-inherit px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                      style={{ textDecoration: "none", color: "#278783" }}
                    >
                      Typing Test
                    </Link>
                  </>
                )}
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  // className="no-underline text-inherit mb-3 px-4 py-2 bg-[#FFEBD0] text-[#278783] rounded-full font-semibold shadow hover:bg-[#f7dbc4] transition"
                  style={{ textDecoration: "none", color: "#278783" }}
                ></Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

<button
  onClick={() => logout(navigate)}
  className="no-underline text-inherit px-4 py-2 bg-[#C0392B] text-light rounded-full font-semibold shadow hover:bg-red-800 transition"
  style={{ textDecoration: "none", borderRadius: "10px" }}
>
  Logout
</button>;
