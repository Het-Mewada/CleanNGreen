import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
        if(countdown === 0){
            return
        }
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/marketplace");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-4 animate-fade-in-down">
        <h1 className="text-2xl font-semibold text-red-600">
          Payment Cancelled ❌
        </h1>
        <p className="text-gray-700">
          Redirecting to products page in <span className="font-bold">{countdown}</span> second{countdown !== 1 && "s"}...
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;
