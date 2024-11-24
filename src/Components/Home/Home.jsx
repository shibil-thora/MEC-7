import React, { useEffect, useState } from 'react';
import FlexBox from '../FlexBox/FlexBox'; 
import Navbar from '../Navbar/Navbar'; 
import Footer from '../Footer/Footer';
import axios from 'axios';
import { backend_url } from '../../utils/urls';
import { getCurrentDate } from '../../utils/funcs';

const Home = () => { 
  // const demoData = [
  //   {
  //     heading: "Valiyad",
  //     photo: "https://1.img-dpreview.com/files/p/TS250x150~sample_galleries/1330372094/1693761761.jpg", // Placeholder photo link
  //     video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video link
  //     gentsCount: 10,
  //     ladiesCount: 15
  //   },
  //   {
  //     heading: "Puliyattu Kulam",
  //     photo: "https://1.img-dpreview.com/files/p/TS250x150~sample_galleries/1330372094/1693761761.jpg", // Placeholder photo link
  //     video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video link
  //     gentsCount: 8,
  //     ladiesCount: 20
  //   },
  //   {
  //     heading: "Chemman Kadavu",
  //     photo: "https://1.img-dpreview.com/files/p/TS250x150~sample_galleries/1330372094/1693761761.jpg", // Placeholder photo link
  //     video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video link
  //     gentsCount: 12,
  //     ladiesCount: 18
  //   }
  // ]; 

  const [demoData, SetDemoData] = useState([]);   
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  useEffect(() => {
    axios.get(`${backend_url}/api/get_data`).then((res) => {
      console.log(res.data, 'here...') 
      SetDemoData(res.data) 
      
    })
  }, [])
  
  return (
    <>
      <Navbar currentDate={selectedDate} setCurrentDate={setSelectedDate} />
      <div className="flex flex-col h-screen ">
        <div className="flex-grow overflow-y-auto mt-16 mb-16"> {/* Adjust margin to avoid overlap */}
          {demoData.map((item, index) => (
            <FlexBox
              key={index}
              heading={item.heading}
              photo={`${backend_url}/uploads/${item.photo}`}
              video={item.video}
              gentsCount={item.gentsCount}
              ladiesCount={item.ladiesCount} 
              gentsLeadBy={item.gentsLeadBy} 
              ladiesLeadBy={item.ladiesLeadBy}
            />
          ))}
        </div>
      </div> 
      <Footer />
    </>
  );
};

export default Home;
