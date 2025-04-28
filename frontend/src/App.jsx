import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/universalCompos/ScrollToTop";
import Register from "./Auth-pages/register";
import Login from "./Auth-pages/login";
import Home from "./pages/Home";
import ProtectedRoute from "./protected/protectedRoute";
import Nav from "./components/NavBar";
import OAuthSuccess from "./Auth-pages/SuccessOAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./pages/ProfilePage";
import Blocked from "./admin/Blocked";
import Data from "./pages/InsertData";
import EventForm from "./admin/EventEdit";
import Footer from "./components/Footer";
import ClickSpark from "./components/universalCompos/ClickSparkComponent";
import FuturisticCursor from "./components/universalCompos/CursorComponent";
import Initiatives from "./pages/Initiatives";
import AboutUs from "./pages/About";
import AdminPanel from "./admin/AdminTrial"
import "./index.css";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainApp />
    </Router>
  );
}
function MainApp() {
  const location = useLocation();
  const hideNavRoutes = ["/login", "/register" , "/admin-trial" , "/admin-dashboard"];
  const showComponents = !hideNavRoutes.includes(location.pathname);

  return (
    <>
      <div className="flex flex-col min-h-screen" style={{}}>
        <FuturisticCursor />
        <ClickSpark
          sparkColor="black"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          {" "}
          {showComponents && (
            <div
              className="fixed top-0 left-0 w-full z-50"
              style={{ overflowx: "hidden" }}
            >
              <Nav />
            </div>
          )}
          {/* Spacer div to push content below fixed navbar */}
          {/* {showComponents && <div className="h-[60px]" />} adjust height to match navbar */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/event-edit" element={<EventForm />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/social-auth-success" element={<OAuthSuccess />} />
              <Route path="/about" element={<AboutUs/>} />
              <Route path="/initiatives/*" element={<Initiatives />} />

              <Route element={<ProtectedRoute usersOnly={true} />}>
                {/* Protected User Routes */}
              </Route>
              <Route path="/admin-dashboard" element={<AdminPanel/>} />
              <Route path="/insert-data" element={<Data />} />
              <Route path="/blocked-users" element={<Blocked />} />

              <Route
                path="*"
                element={
                  <h1 className="text-center text-3xl p-10">
                    <span className="text-red-500">404</span> <br /> Page Not
                    Found
                  </h1>
                }
              />
            </Routes>
          </div>
          {showComponents && <Footer />}
        </ClickSpark>
      </div>
    </>
  );
}
export default App;
