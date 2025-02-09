import React from 'react';

const OutOfStock = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-red-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-red-600 text-center mb-4">Out of Stock</h2>
      <p className="text-gray-800 text-center">
        We're sorry, but this item is currently out of stock. Please check back later.
      </p>
    </div>
  );
};

export default OutOfStock;
