import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Register from "./Auth-pages/register";
import Login from "./Auth-pages/login";
import Home from "./pages/Home";
import ProtectedRoute from "./protected/protectedRoute";
import AdminDashboard from "./admin/Admin-Dashboard";
import Nav from "./components/NavBar";
import OAuthSuccess from "./Auth-pages/SuccessOAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./pages/ProfilePage";
import Blocked from "./admin/Blocked";
import "./index.css";
function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();
  const hideNavRoutes = ["/login", "/register"];
  const shouldShowNav = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      <div className="hide-scrollbar" style={{ overflow: "auto" }}>
        {shouldShowNav && <Nav />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <Route path="/typing-speed-test" element={<TypingTest />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/social-auth-success" element={<OAuthSuccess />} />
          <Route element={<ProtectedRoute usersOnly={true} />}>
            {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
          </Route>

          {/* <Route element={<ProtectedRoute adminOnly={true} />}> */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* <Route path="/projects/edit/:id" element={<EditProject />} /> */}
          <Route path="/blocked-users" element={<Blocked />} />
          {/* <Route path="/projects/new" element={<ProjectForm />} /> */}
          {/* </Route> */}

          <Route
            path="*"
            element={
              <h1 className="text-center">
                {" "}
                <span style={{ color: "red" }}>404</span> <br /> Page Not Found
              </h1>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
