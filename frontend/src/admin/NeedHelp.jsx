import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { requestFormReset } from 'react-dom';

const HelpRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${__API_URL__}/admin/helplist`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to load help requests');
      } 
    };

    fetchRequests();
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  const markAsContacted = async (id) => {
    try {
      await axios.patch(`${__API_URL__}/admin/helplist/${id}`, {
        status: 'contacted'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setRequests(requests.map(request => 
        request._id === id ? { ...request, status: 'contacted' } : request
      ));
      toast.success('Marked as contacted');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading help requests: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Help Requests</h1>
          <p className="mt-2 text-gray-600">Manage requests from users needing assistance</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search requests..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="new">New Requests</option>
            <option value="contacted">Contacted</option>
          </select>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No matching requests</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div 
                key={request._id} 
                className={`bg-white rounded-lg shadow transition-all duration-200 overflow-hidden ${expandedRequest === request._id ? 'ring-2 ring-purple-500' : 'hover:shadow-md'}`}
              >
                <div 
                  className="p-5  flex justify-between items-start"
                  onClick={() => toggleExpand(request._id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'contacted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {request.status === 'contacted' ? 'Contacted' : 'New'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(request.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="mt-1 text-lg font-medium text-gray-900 truncate">
                      {request.subject}
                    </h3>
                    <p className="mt-1 text-gray-600 line-clamp-2">
                      {request.message}
                    </p>
                  </div>
                  <button 
                    className="ml-4 text-gray-400 hover:text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(request._id);
                    }}
                  >
                    {expandedRequest === request._id ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                </div>

                {expandedRequest === request._id && (
                  <div className="border-t border-gray-200 p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">From</h4>
                        <p className="mt-1 text-gray-900">{request.name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                        <p className="mt-1 text-gray-900">
                          {request.preferredContact === "email" ? request.email : request.phone}
                        </p>
                        {request.preferredContact && (
                          <p className="mt-1 text-xs text-gray-500">
                            Prefers contact via {request.preferredContact}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <a 
                        href={request.preferredContact==="mail" ? `mailto:${request.email}` : request.preferredContact === "phone" ? `tel:${requestFormReset.phone}` : `#${request.phone}` }
                        className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                          !request.email && !request.phone 
                            ? 'text-gray-400 ' 
                            : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={(e) => {
                            if (!request.email && !request.phone) e.preventDefault();
                          }}
                          >
                        
                        Contact
                      </a>
                      <button
                        onClick={() => markAsContacted(request._id)}
                        disabled={request.status === 'contacted'}
                        className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                          request.status === 'contacted'
                            ? 'bg-gray-400'
                            : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                      >
                        {request.status === 'contacted' ? 'Already Contacted' : 'Mark as Contacted'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpRequestList;