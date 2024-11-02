import React from 'react';
import FlexBox from '../FlexBox/FlexBox';

const Home = () => { 
  const demoData = [
    {
      heading: "Valiyad",
      photo: "https://1.img-dpreview.com/files/p/TS250x150~sample_galleries/1330372094/1693761761.jpg", // Placeholder photo link
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video link
      gentsCount: 10,
      ladiesCount: 15
    },
    {
      heading: "Puliyattu Kulam",
      photo: "https://1.img-dpreview.com/files/p/TS250x150~sample_galleries/1330372094/1693761761.jpg", // Placeholder photo link
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video link
      gentsCount: 8,
      ladiesCount: 20
    },
    {
      heading: "Chemman Kadavu",
      photo: "https://1.img-dpreview.com/files/p/TS250x150~sample_galleries/1330372094/1693761761.jpg", // Placeholder photo link
      video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video link
      gentsCount: 12,
      ladiesCount: 18
    }
  ];
  
  return (
    <>
      <div className="flex flex-col h-screen ">
        <div className="flex-grow overflow-y-auto mt-16 mb-16"> {/* Adjust margin to avoid overlap */}
          {demoData.map((item, index) => (
            <FlexBox
              key={index}
              heading={item.heading}
              photo={item.photo}
              video={item.video}
              gentsCount={item.gentsCount}
              ladiesCount={item.ladiesCount}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
