import { useState , useEffect } from "react"
import axios from "axios";
export default function StatsComponent(){
  const [stats, setStats] = useState({
    treesPlanted: 0,
    co2Reduced: 0,
    cleanEnergy: 0,
    users: 0,
  });
      useEffect(() => {
        // Fetch statistics
        axios
          .get(`${__API_URL__}/stats`)
          .then((res) => {
            setStats(res.data[0]);
            console.log(res.data);
          })
          .catch((err) => console.error(err));
    
        // Fetch upcoming events
        // axios
        //   .get(`${__API_URL__}/events`)
        //   .then((res) => setEvents(res.data.slice(0, 3)))
        //   .catch((err) => console.error(err));
      }, []);
    return (
        <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 transform skew-y-3 -rotate-3 origin-top-left"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="relative inline-block">
              <span className="relative z-10">Our Impact</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-green-300 opacity-60 -z-0"></span>
            </span>
          </h2>

          <div className="grid my-12 grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Organic shapes */}
            <div className="relative h-full min-h-[400px]">
              <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/2 w-56 h-56 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

              <div className="relative h-full flex items-center justify-center">
                <div className="text-center p-8 backdrop-blur-sm bg-white/70 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Making a Difference Together
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Every number represents real change in our environment and
                    communities. These milestones are only possible through
                    collective action.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Stats in a unique layout */}
            <div className=" grid grid-cols-2 gap-6">
              {/* Trees Planted */}
              <div className="bg-white p-6 rounded-2xl border-l-8 border-green-400 shadow-[5px_5px_0px_0px_rgba(74,222,128)] hover:shadow-[8px_8px_0px_0px_rgba(74,222,128)] transition-all">
                <div className="text-green-600 mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">
                  {stats.treesPlanted || 12450}+
                </h3>
                <p className="text-gray-500 font-medium">Trees Planted</p>
              </div>

              {/* CO₂ Reduced */}
              <div className="bg-white p-6 rounded-2xl border-l-8 border-blue-400 shadow-[5px_5px_0px_0px_rgba(96,165,250)] hover:shadow-[8px_8px_0px_0px_rgba(96,165,250)] transition-all">
                <div className="text-blue-600 mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">
                  {stats.co2Reduced || 2865} tons
                </h3>
                <p className="text-gray-500 font-medium">CO₂ Reduced</p>
              </div>

              {/* Clean Energy */}
              <div className="bg-white p-6 rounded-2xl border-l-8 border-yellow-400 shadow-[5px_5px_0px_0px_rgba(251,191,36)] hover:shadow-[8px_8px_0px_0px_rgba(251,191,36)] transition-all">
                <div className="text-yellow-600 mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">
                  {stats.cleanEnergy || 8450} MWh
                </h3>
                <p className="text-gray-500 font-medium">Clean Energy</p>
              </div>

              {/* Community Members */}
              <div className="bg-white p-6 rounded-2xl border-l-8 border-purple-400 shadow-[5px_5px_0px_0px_rgba(167,139,250)] hover:shadow-[8px_8px_0px_0px_rgba(167,139,250)] transition-all">
                <div className="text-purple-600 mb-3">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-1">
                  {stats.users || 4230}+
                </h3>
                <p className="text-gray-500 font-medium">Community Members</p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>
    )
}