import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const SimpleOrderSuccess = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const { user , defaultAddress } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const address = JSON.parse(localStorage.getItem('defaultAddress')) ; // Safe access for first address
  console.log("default Addres : " , address)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center space-y-6">
        <div
          className={`mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 transition-all duration-700 ${
            isAnimating ? 'animate-bounce' : ''
          }`}
        >
          <CheckCircleIcon className="h-16 w-16 text-green-600" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800">Order Placed Successfully!</h2>
        <p className="text-gray-600 text-base">
          Your items will be delivered soon to:
        </p>

        {address ? (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left shadow-sm">
            <p className="text-gray-700">
              <span className="font-semibold text-[#278783]">House No:</span> {address.houseNo}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-[#278783]">Street:</span> {address.street}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-[#278783]">Locality:</span> {address.locality}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-[#278783]">Pincode:</span> {address.pincode}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-[#278783]">State:</span> {address.state}
            </p>
          </div>
        ) : (
          <p className="text-red-500 italic">No address found.</p>
        )}

        <button
          className="mt-4 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SimpleOrderSuccess;
