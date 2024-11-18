import React from 'react'; 
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { backend_url } from '../../utils/urls'; 
import YouTubeEmbed from '../Youtube/Youtube';

const FlexBox = ({ heading, photo, video, gentsCount, ladiesCount, gentsLeadBy, ladiesLeadBy }) => {
  useEffect(() => {
    axios.get(`${backend_url}/api/get_data`).then((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg  overflow-hidden mb-6">
      {/* Left Section: Image and Information */}
      <div className="md:w-1/2 p-6 flex flex-col justify-center mt-1">
      <h2 className="text-3xl font-bold font-Poppins text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-red-500 to-gray-800 mb-4">
        {heading}
      </h2>


        <img
          src={photo}
          alt="photo"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
          {/* Gents Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-sky-900 text-white w-16 h-16 rounded-full text-3xl font-bold">
              {gentsCount}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700 text-lg font-medium">Gents</span>
              <span className="text-gray-600 font-semibold text-sm">Lead by: {gentsLeadBy}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-12 w-px bg-gray-300"></div>

          {/* Ladies Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-teal-800 text-white w-16 h-16 rounded-full text-3xl font-bold">
              {ladiesCount}
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700 text-lg font-medium">Ladies</span>
              <span className="text-gray-600 font-semibold text-sm">Lead by: {ladiesLeadBy}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right Section: Video */}
      <div className="md:w-1/2 p-6 mt-14">
      <YouTubeEmbed youtubeUrl={video} />

      </div>
    </div>
  );
};

export default FlexBox;
