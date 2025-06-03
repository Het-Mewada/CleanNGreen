import React, { useState } from "react";
import { FiUserX } from "react-icons/fi";

// components
import AdminDashboard from "./Admin-Dashboard";
import BlockedUsers from "./Blocked";
import InsertData from "../pages/InsertData";
import AdminFeedbackDashboard from "./User-feedbacks";
import NewsSubs from "./LetterSubs";
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <AdminDashboard />;

      case "blocked":
        return <BlockedUsers />;

      case "insert":
        return <InsertData />;

      case "subscribers": 
        return <NewsSubs/>
       
      case "feedbacks":
        return <AdminFeedbackDashboard/>;
        
      case "contact":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              Contact Form Submissions
            </h2>
            <p className="text-gray-600">
              View and manage form entries submitted by users who reached out
              through the Contact Us page.
            </p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Admin Panel</h2>
            <p className="text-gray-600">
              Select an option from the sidebar to get started.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-[#278783] text-white transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-3 flex items-center justify-between">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">AdminPanel</h1>
          ) : (
            " "
          )}
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-0">
            <li>
              <button
                onClick={() => {
                  setActiveTab("users");
                  toggleSidebar();
                }}
                className={`w-full flex items-center px-5 py-4 ${
                  activeTab === "users" ? "bg-[#1f6d69]" : "hover:bg-[#1f6d69]"
                } transition`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
                {sidebarOpen && <span className="ml-3">Manage Users</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("blocked");
                  toggleSidebar();
                }}
                className={`w-full flex items-center px-5 py-4 ${
                  activeTab === "products"
                    ? "bg-[#1f6d69]"
                    : "hover:bg-[#1f6d69]"
                } transition`}
              >
                <FiUserX className=" text-xl mr-1" />

                {sidebarOpen && <span className="ml-3">Blocked Users</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("insert");
                  toggleSidebar();
                }}
                className={`w-full flex items-center px-5 py-4 ${
                  activeTab === "orders" ? "bg-[#1f6d69]" : "hover:bg-[#1f6d69]"
                } transition`}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" />
                  <path d="M12 8v8" stroke="currentColor" />
                  <path d="M8 12h8" stroke="currentColor" />
                </svg>

                {sidebarOpen && <span className="ml-3">Insert Data</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("subscribers");
                  toggleSidebar();
                }}
                className={`w-full flex items-center px-5 py-4 ${
                  activeTab === "orders" ? "bg-[#1f6d69]" : "hover:bg-[#1f6d69]"
                } transition`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
                {sidebarOpen && <span className="ml-3">Subscribers</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("feedbacks");
                  toggleSidebar();
                }}
                className={`w-full flex items-center px-5 py-4 ${
                  activeTab === "analytics"
                    ? "bg-[#1f6d69]"
                    : "hover:bg-[#1f6d69]"
                } transition`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                {sidebarOpen && <span className="ml-3">User Feedback</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("contact");
                  toggleSidebar();
                }}
                className={`w-full flex items-center px-5 py-4 ${
                  activeTab === "orders" ? "bg-[#1f6d69]" : "hover:bg-[#1f6d69]"
                } transition`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                  />
                </svg>

                {sidebarOpen && <span className="ml-3">Contact Us</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <button
        onClick={toggleSidebar}
        className="bg-[#278783] focus:outline-none"
      >
        {sidebarOpen ? (
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        )}
      </button>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Content Area */}
        <main className="bg-gray-50 min-h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
