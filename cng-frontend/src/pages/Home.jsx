import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import NewsSection from "../components/NewsSection";
import CarbonFootprintCalculator from "../components/homePageCompo/CarbonCalculator";
import ProductsComponent from "../components/homePageCompo/EcoProducts";
import HeroComponent from "../components/homePageCompo/HeroSection";
import StatsComponent from "../components/homePageCompo/Stats";
const Home = () => {
  // const [news, setNews] = useState([]);
  const [activeTab, setActiveTab] = useState("initiatives");
  const [email, setEmail] = useState("");
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    axios
      .post("/api/subscribe", { email })
      .then(() => {
        setSubscriptionSuccess(true);
        setEmail("");
        setTimeout(() => setSubscriptionSuccess(false), 3000);
      })
      .catch((err) => console.error(err));
  };

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
                Explore how solar technology helps reduce carbon footprints, save energy, and support a sustainable lifestyle.
                </p>
                <Link
                  to="/initiatives/solar-projects"
                  className="text-green-700 font-medium hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                Reducing Land Waste: Why It Matters                </h3>
                <p className="text-gray-700 mb-4">
                Get to know what land waste is, where it goes, and how simple changes in your daily routine can make a huge difference.
                </p>
                <Link
                  to="/initiatives/manage-waste"
                  className="text-green-700 font-medium hover:underline"
                >
                  Learn More →
                </Link>
              </div>
              <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">🌳</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                Grow Green, Breathe Clean                </h3>
                <p className="text-gray-700 mb-4">
                Forests are more than just trees—they're home to thousands of species and the lungs of our planet.Discover how you can be part of the global reforestation movement.
                </p>
                <Link
                  to="/initiatives/reforestation"
                  className="text-green-700 font-medium hover:underline"
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
      <NewsSection
        apiKey="c0f02ed3fec0abc91611b7a89aa44d48"
        newsSource="gnews" // or "gnews"
        limit={10} // number of news items to display
      />

      {/* Eco Products Marketplace */}
      <ProductsComponent />

      {/* Events Calendar */}
      {/* <EventDetails eventsToShow="3"/> */}

      {/* Interactive Carbon Calculator */}
      <CarbonFootprintCalculator />

      {/* Community Forum Preview */}

      {/* Newsletter Subscription */}
      <section className="relative py-16 bg-gradient-to-br from-green-50 to-teal-50" style={{
        overflow:'hidden'
      }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 sm:p-10">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-200 rounded-full opacity-20"></div>

            <div className="relative z-10 text-center">
              {/* Header with icon */}
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Stay Updated
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Subscribe to our newsletter for the latest in green technology,
                sustainability tips, and community events. Join{" "}
                <span className="font-semibold text-teal-600">5,000+</span>{" "}
                eco-conscious subscribers.
              </p>

              {/* Form */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Subscribe
                  </button>
                </div>

                {subscriptionSuccess && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center justify-center space-x-2 animate-fade-in">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Thank you for subscribing! Check your email for
                      confirmation.
                    </span>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  We respect your privacy. Unsubscribe at any time. No spam,
                  ever.
                </p>
              </form>

              {/* Trust indicators */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Weekly digest
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Industry insights
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Exclusive content
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
