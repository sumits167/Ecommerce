import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const navigate=useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed</h2>
          <p className="text-gray-600 mb-6">Your order has been successfully placed! We'll notify you once it's on the way.</p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Track Order
          </button>
        </div>
        <button onClick={()=>navigate('/orderReceipt')} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Show Receipt
          </button>
      </div>
    </div>
  );
};

export default OrderPlaced;
