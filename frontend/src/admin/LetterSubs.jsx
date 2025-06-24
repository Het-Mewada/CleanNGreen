import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const NewsSubs = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const subscribersPerPage = 5;

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const response = await axios.get(`${__API_URL__}/admin/subscribers`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setSubscribers(response.data);
      } catch (err) {
        console.error("Error in fetch subs:", err.message);
        toast.error("Failed to load subscribers");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleUnsubscribe = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    try {
      await axios.patch(
        `${__API_URL__}/admin/subscribers/${id}`,
        { isActive: false },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setSubscribers(
        subscribers.map((sub) =>
          sub._id === id ? { ...sub, isActive: false } : sub
        )
      );
      toast.success("Unsubscribed successfully");
    } catch (err) {
      console.error("Error unsubscribing:", err.message);
      toast.error("Failed to unsubscribe");
    }
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current subscribers
  const indexOfLastSubscriber = currentPage * subscribersPerPage;
  const indexOfFirstSubscriber = indexOfLastSubscriber - subscribersPerPage;
  const currentSubscribers = filteredSubscribers.slice(
    indexOfFirstSubscriber,
    indexOfLastSubscriber
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Newsletter Subscribers
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your email subscribers ({subscribers.length} total)
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Search and controls */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search subscribers..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>
          </div>

          {/* Subscribers table */}
          {loading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchTerm
                ? "No matching subscribers found"
                : "No subscribers yet"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-center">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Icon 
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subscribed On
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentSubscribers.map((subscriber) => (
                    <tr
                      key={subscriber._id}
                      className=" text-center hover:bg-gray-50"
                    >
                      <td>
                        <div className="flex-shrink-0 text-center m-auto h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      </td>
                      <td className=" px-6 py-4 whitespace-nowrap text-center">
                        <div className="ml-4">
                          <div className="text-sm text-center font-medium text-gray-900">
                            {subscriber.email}
                          </div>
                          <div className="text-sm text-center text-gray-500">
                            {subscriber._id}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(subscriber.subscribedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleUnsubscribe(subscriber._id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Unsubscribe User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {filteredSubscribers.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{indexOfFirstSubscriber + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastSubscriber, filteredSubscribers.length)}
                </span>{" "}
                of <span className="font-medium">{filteredSubscribers.length}</span>{" "}
                {filteredSubscribers.length === 1 ? 'subscriber' : 'subscribers'}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg border ${currentPage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.ceil(filteredSubscribers.length / subscribersPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredSubscribers.length / subscribersPerPage)}
                  className={`px-3 py-1 rounded-lg border ${currentPage === Math.ceil(filteredSubscribers.length / subscribersPerPage) ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsSubs;