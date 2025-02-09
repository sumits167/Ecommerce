import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Proceed() {

  const statu=useSelector((state)=>state.cart.status);
  const [width,setWidth]=useState(statu);

  return (
    <div>
      {<div className={`w-${width} h-2 bg-green-500`}></div>}
      <header className="bg-gray-100 p-6 rounded-lg shadow-lg flex justify-between items-center space-x-8">
        {/* Address Section */}
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 4v4h4m-4 4h-4V4m0 8h-4v4h4V8m0 0h4V4H8v4h4z"
            />
          </svg>
          <span className="text-gray-800 text-lg font-semibold">Address</span>
        </div>
        {/* Order Summary Section */}
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          <span className="text-gray-800 text-lg font-semibold">Order Summary</span>
        </div>
        {/* Payment Section */}
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7h18M3 11h18M3 15h18m3 4V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2z"
            />
          </svg>
          <span className="text-gray-800 text-lg font-semibold">Payment</span>
        </div>
      </header>
    </div>
  )
}

export default Proceed