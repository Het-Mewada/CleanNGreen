import { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

const AccountDeletionForm = ({ userId, onSuccess }) => {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const { user, setShowDeletionForm } = useContext(AuthContext);
  const reasons = [
    'Privacy concerns',
    'Too many emails',
    'I found a better alternative',
    'Not satisfied with the service',
    'Other'
  ];

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalReason = reason === 'Other' ? otherReason : reason;

    try {
      await axios.post(`${__API_URL__}/users/${user._id}/request-deletion`, {
        reason: finalReason
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Account deletion request submitted");
      setShowDeletionForm(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting deletion request:', error);
      toast.error("Failed to submit deletion request");
    }
  };

  const handleCancel = () => {
    setShowDeletionForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Request Account Deletion</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Why do you want to delete your account?
              </label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              >
                <option value="" disabled>Select a reason</option>
                {reasons.map((r, index) => (
                  <option key={index} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {reason === 'Other' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Please describe your reason
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  rows="3"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="flex justify-between space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletionForm;