import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";
const NewsletterSubscription = () => {
  const { user } = useContext(AuthContext);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      setError("Login to use News Letter Feature");
      toast.error("Login to use NewLetter Feature", {
        duration: 2000,
      });
      return;
    }
    axios
      .post(
        `${__API_URL__}/subscribe`,
        {
          id: user._id,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setSubscriptionSuccess(true);
        setTimeout(() => setSubscriptionSuccess(false), 3000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.error(err);
      });
  };

  return (
    <section
      className="relative py-16 bg-gradient-to-br from-green-50 to-teal-50"
      style={{ overflow: "hidden" }}
    >
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
                  placeholder={user?.email}
                  disabled={true}
                  required
                  className="w-full px-3 py-3 rounded-lg border border-gray-300 "
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
                  <span>Thank you for subscribing!</span>
                </div>
              )}
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center justify-center space-x-2 animate-fade-in">
                  <span>{error}</span>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time. No spam, ever.
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
  );
};

export default NewsletterSubscription;
