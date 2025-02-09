// src/components/Card.js
import React from 'react';

const Test2 = ({url,authors,statu,data}) => {

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Card Image Section */}
      <img 
        className="w-full h-56 object-cover" 
        src={url} 
        alt="Card Image"
      />

      {/* Card Content Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">Card Title</h2>
        <p className="text-gray-600 mt-2">This is a description of the card. You can add more content here.</p>
      </div>

      {/* Card Footer Section */}
      <div className="p-4 flex justify-between items-center border-t">
        <span className="text-sm text-gray-500">Some Footer Info</span>
        <button className="text-blue-500 hover:underline">Learn More</button>
      </div>
    </div>
  );
};

export default Test2;
