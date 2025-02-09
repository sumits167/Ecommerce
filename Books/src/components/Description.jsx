import React, { useState } from 'react'
import Previewcard from './Previewcard'

function Description({data,authors,url,categories}) {
const [description,setDescription]=useState(data.description);
    
  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300 ease-in-out">
      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{categories}</h2>

        {/* Description */}
        <p className="text-gray-600 text-base mb-4">
            {description}
        </p>

        {/* Additional Information */}
        <p className="text-gray-500 text-sm mb-4">
          Available now at a special price. Limited stock, so get yours today!
        </p>

        {/* Button */}
        <div className="flex justify-start">
          <a href="#" className="inline-block bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out">
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

export default Description