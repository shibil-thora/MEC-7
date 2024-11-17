import React from 'react'; 
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { backend_url } from '../../utils/urls';

const FlexBox = ({ heading, photo, video, gentsCount, ladiesCount }) => {
  useEffect(() => {
    axios.get(`${backend_url}/api/get_data`).then((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Left Section: Image and Information */}
      <div className="md:w-1/2 p-6 flex flex-col justify-center mt-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{heading}</h2>
        <img
          src={photo}
          alt="photo"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="text-gray-700 text-lg">
          <div className="flex items-center mb-2">
            <span className="font-medium mr-2">Gents:</span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-lg font-bold">
              {gentsCount}
            </span>
            <span className="ml-4 text-gray-600 italic">Lead by: Mohammad Ali</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Ladies:</span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-lg font-bold">
              {ladiesCount}
            </span>
            <span className="ml-4 text-gray-600 italic">Lead by: Sarah Khan</span>
          </div>
        </div>
      </div>

      {/* Right Section: Video */}
      <div className="md:w-1/2 p-6 mt-14">
        <video controls className="w-full h-64 object-cover rounded-lg">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default FlexBox;
