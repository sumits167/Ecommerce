import React from 'react';

const NoMoreItemsAvailable = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-yellow-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-600 text-center mb-4">No More Items Available</h2>
      <p className="text-gray-800 text-center">
        Sorry, this item is no longer available. Please check out other options.
      </p>
    </div>
  );
};

export default NoMoreItemsAvailable;
