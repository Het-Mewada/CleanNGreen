import React from "react";
import {
  FaLeaf,
  FaHandsHelping,
  FaShareAlt,
  FaHandshake,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { GiRecycle } from "react-icons/gi";
import { RiPlantFill } from "react-icons/ri";
import NewsletterSubscription from "../components/homePageCompo/NewsLetterSubCompo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetInvolved = () => {
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="px-4 py-12 mt-15 sm:mt-0 max-w-full text-gray-800 bg-gradient-to-b from-green-50 to-white">
      <div className="text-center flex flex-col items-center justify-center sm:min-h-[100vh] mb-27 sm:mb-8 ">
        <img
          src="https://images.unsplash.com/photo-1577193647731-2e0c1d04a565?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
          className=" absolute w-full sm:h-[100vh] z-0"
          alt=""
        />
        <h1 className="text-5xl font-bold text-green-700 mb-6 z-10">
          <img
            src="/images/sub-logo.webp"
            className=" sm:mx-auto sm:max-w-[50%]"
            alt=""
          />
        </h1>
      </div>
      <section className="mb-16">
        {/* How You Can Help */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-green-600 mb-8 mx-auto border-b-2 pb-2 max-w-80 sm:max-w-[50%] text-center flex items-center justify-center">
            <FaLeaf className="mr-3 text-green-600 hidden sm:block " /> How You Can Make a
            Difference... ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto z-10 ">
            Together, we can create a sustainable future. Every action counts,
            and we need you!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Eco-Friendly Choices */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-red-300 transition-shadow border-b-4 border-r-4 border-[#278783]">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <GiRecycle className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-green-600">
                Sustainable Living
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Use reusable bags, bottles, and containers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Reduce single-use plastics and paper</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Conserve water and energy daily</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Support local sustainable businesses</span>
              </li>
            </ul>
          </div>

          {/* Donate */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-red-300  transition-shadow border-r-4  border-b-4 border-[#278783]">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaHandsHelping className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-green-600">
                Support Financially
              </h3>
            </div>
            <p className="mb-4">
              Your contributions help us plant trees, recycle waste, and educate
              communities about sustainability.
            </p>
            <button
              onClick={() => setShowQR(true)}
              className="bg-[#278783] hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full"
            >
              Donate Now
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Businesses can sponsor specific initiatives for greater impact.
            </p>
          </div>

          {/* QR Modal */}
          {showQR && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg text-center max-w-sm w-full relative">
                <h4 className="text-xl font-semibold text-green-700 mb-4">
                  Scan to Donate
                </h4>
                <img
                  src="/images/donate-qr.png" // <-- Replace with your actual QR image
                  alt="UPI QR Code"
                  className="w-64 h-64 mx-auto border rounded-[20px]"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Use any UPI app to donate
                </p>
                <button
                  onClick={() => setShowQR(false)}
                  className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Spread Awareness */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-red-300 transition-shadow border-b-4 border-r-4 border-[#278783]">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaShareAlt className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-green-600">
                Spread the Word
              </h3>
            </div>
            <p className="mb-4">
              Share your sustainable lifestyle and inspire others to join the
              movement.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Use our hashtags:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-sm text-green-600 font-medium shadow-sm">
                  #EcoSphere
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-sm text-green-600 font-medium shadow-sm">
                  #GoGreenWithEcoSphere
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-sm text-green-600 font-medium shadow-sm">
                  #SaveEarthWithEcoSphere
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="mb-16 bg-[#278783] rounded-2xl p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <div className=" items-center">
            <div className=" text-center">
              <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
              <p className="text-lg mb-6">
                Are you an eco-friendly business, NGO, or institution? Let's
                collaborate to amplify our impact and build a greener future
                together.
              </p>
              <button
                onClick={() => navigate("/help-form")}
                className="bg-white text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Partner Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-16">
        <NewsletterSubscription />
      </section>

      {/* Inspirational Quote */}
      <section className="bg-[#278783] p-10 rounded-2xl text-center shadow-lg">
        <blockquote className="max-w-full ">
          <div className="relative">
            {/* Decorative opening quote */}
            <span className="absolute -top-8 -left-4 text-8xl text-cyan-100 opacity-20 font-serif">
              "
            </span>

            <div className="">
              {/* Main quote */}
              <p className="text-3xl md:text-3xl font-light italic leading-relaxed text-white">
                "Change doesn't happen overnight, but it begins the moment you
                choose to act."
              </p>

              {/* Supporting text */}
              <p className="text-xl font-normal text-green-100 leading-relaxed">
                Every eco-friendly choice you make sends ripples of hope across
                our world. From mindful habits to bold initiatives, your voice
                and actions matter.
              </p>

              {/* Call to action */}
              <p className="text-xl font-medium text-green-50">
                Together, we can rebuild what's been lost, protect what remains,
                and nurture a planet that future generations will thank us for.
              </p>
            </div>

            {/* Decorative closing quote */}
            <span className="absolute -bottom-12 -right-4 text-8xl text-green-500 opacity-20 font-serif">
              "
            </span>
          </div>

          {/* Attribution */}
          <footer className="mt-8 text-xl font-serif text-green-200">
            — ecoSphere Team
          </footer>
        </blockquote>
      </section>
    </div>
  );
};

export default GetInvolved;
