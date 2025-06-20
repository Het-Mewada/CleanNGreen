import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewsSection from "../components/homePageCompo/NewsSection";
import CarbonFootprintCalculator from "../components/homePageCompo/CarbonCalculator";
import ProductsComponent from "../components/homePageCompo/EcoProducts";
import HeroComponent from "../components/homePageCompo/HeroSection";
import StatsComponent from "../components/homePageCompo/Stats";
import AuthContext from "../context/AuthContext";
import NewsletterSubscription from "../components/homePageCompo/NewsLetterSubCompo";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("initiatives");
  const [loading,setLoading] = useState(false)  

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     setLoading(true);
  //     const token = JSON.parse(localStorage.getItem("user"))?.token;
  //     if (!token) {
  //       setError("No profile data , Please Login");
  //       setLoading(false);
  //       return;
  //     }
  //     try {
  //       const res = await axios.get(`${__API_URL__}/users/profile`, {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setUser(res.data);
  //     } catch (err) {
  //       console.error("Error fetching profile:", err);
  //       setError("Failed to fetch profile. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-500">
      {/* Hero Section */}
      <HeroComponent />

      {/* Stats */}
      <StatsComponent />

      {/* Features Tabs */}
      <section className="features-section px-4 py-12 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Our Green Initiatives
        </h2>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          {" "}
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "initiatives"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("initiatives")}
          >
            Initiatives
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "technologies"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("technologies")}
          >
            Technologies
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeTab === "education"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("education")}
          >
            Education
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content max-w-6xl mx-auto">
          {activeTab === "initiatives" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">☀️</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Power Tomorrow with the Sun
                </h3>
                <p className="text-gray-700 mb-4">
                  Explore how solar technology helps reduce carbon footprints,
                  save energy, and support a sustainable lifestyle.
                </p>
                <Link
                  to="/initiatives/solar-projects"
                  className="text-green-700 font-medium "
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Reducing Land Waste: Why It Matters{" "}
                </h3>
                <p className="text-gray-700 mb-4">
                  Get to know what land waste is, where it goes, and how simple
                  changes in your daily routine can make a huge difference.
                </p>
                <Link
                  to="/initiatives/manage-waste"
                  className="text-green-700 font-medium "
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">🌳</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Grow Green, Breathe Clean{" "}
                </h3>
                <p className="text-gray-700 mb-4">
                  Forests are more than just trees—they're home to thousands of
                  species and the lungs of our planet.Discover how you can be
                  part of the global reforestation movement.
                </p>
                <Link
                  to="/initiatives/reforestation"
                  className="text-green-700 font-medium "
                >
                  Learn More →
                </Link>
              </div>
            </div>
          )}

          {activeTab === "technologies" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Smart Grid Solutions
                </h3>
                <p className="text-gray-700">
                  AI-powered energy distribution for maximum efficiency.
                </p>
              </div>
              <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  Water Purification
                </h3>
                <p className="text-gray-700">
                  Low-energy water cleaning systems for developing areas.
                </p>
              </div>
            </div>
          )}

          {activeTab === "education" && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                  Workshops
                </h3>
                <p className="text-gray-700">
                  Free community workshops on sustainable living.
                </p>
              </div>
              <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                  School Programs
                </h3>
                <p className="text-gray-700">
                  Curriculum development for environmental education.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      {/* <NewsSection
        apiKey="c0f02ed3fec0abc91611b7a89aa44d48"
        newsSource="gnews"
        limit={10} 
      /> */}

      {/* Eco Products Marketplace */}
      <ProductsComponent limit={3} homePageComponent={true} />

      {/* Interactive Carbon Calculator */}
      <CarbonFootprintCalculator />

      {/* Newsletter Subscription */}
      <NewsletterSubscription />
    </div>
  );
};

export default Home;
