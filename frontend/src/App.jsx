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
import Footer from "./components/Footer";
import ClickSpark from "./components/universalCompos/ClickSparkComponent";
import FuturisticCursor from "./components/universalCompos/CursorComponent";
import Initiatives from "./pages/Initiatives";
import AboutUs from "./pages/About";
import AdminPanel from "./admin/AdminTrial";
import FeedbackForm from "./pages/Feedback";
import FeedbackDashboard from "./admin/User-feedbacks";
import ProductsComponent from "./components/homePageCompo/EcoProducts";
import { Toaster } from "react-hot-toast";
import "./index.css";
import NeedHelpForm from "./components/homePageCompo/NeedHelpCompo";
import HelpRequestsList from "./admin/NeedHelp";
import OrderSuccess from "./pages/OrdSuccess";
import PaymentCancelled from "./pages/OrdCancled";
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
  const hideNavRoutes = [
    "/login",
    "/register",
    "/admin-trial",
    "/admin-dashboard",
  ];
  const showComponents = !hideNavRoutes.includes(location.pathname);

  return (
    <>
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
        <div className="flex-grow">
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />


            {/* <ProtectedRoute usersOnly={true} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/initiatives/*" element={<Initiatives />} />
            <Route
              path="/marketplace"
              element={
                <div className="mt-9">
                  <ProductsComponent />
                </div>
              }
            />
            <Route path="/feedback-form" element={<FeedbackForm />} />
            <Route path="/help-form" element={<NeedHelpForm />} />
            <Route path="/social-auth-success" element={<OAuthSuccess />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/cancel" element={<PaymentCancelled />} />
            <Route
              path="*"
              element={
                <h1 className="text-center text-3xl p-10">
                  <span className="text-red-500">404</span> <br /> Page Not
                  Found
                </h1>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/help-list" element={<HelpRequestsList />} />
            <Route path="/feedback-admin" element={<FeedbackDashboard />} />
            <Route path="/insert-data" element={<Data />} />
            <Route path="/blocked-users" element={<Blocked />} />
            <Route path="/admin-dashboard" element={<AdminPanel />} />
          </Routes>
        </div>
        {showComponents && <Footer />}
      </ClickSpark>
    </>
  );
}
export default App;
