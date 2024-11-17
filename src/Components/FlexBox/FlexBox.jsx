import React from 'react';

const FlexBox = ({ heading, photo, video, gentsCount, ladiesCount }) => {
  return (
    <div className="flex flex-col md:flex-row p-4 border-b">
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/2 p-2">
          <h2 className="text-4xl font-semibold mb-2">{heading}</h2>
          <img
            src={photo}
            alt="photo"
            className="w-full h-96 object-cover mb-2"
          />
          <div className="text-gray-600 text-xl mt-5">
            Gents: <span className="w-25 bg-red-500 p-3 text-3xl font-bold text-white">{gentsCount}</span> Lead by: <span className="font-semibold">Mohammad Ali</span> Ladies: <span className="w-25 bg-red-500 p-3 text-3xl font-bold text-white">{ladiesCount}</span> Lead by: 
          </div>
        </div>
        <div className="md:w-1/2 p-2">
          <video controls className="w-full h-96 object-cover mt-9">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default FlexBox;
