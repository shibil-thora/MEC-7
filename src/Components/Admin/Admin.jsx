import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { backend_url } from "../../utils/urls";
import { getCurrentDate } from "../../utils/funcs";
import { checkWithToken } from "../../ApiCalls/apicall";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [form, setForm] = useState({
    date: getCurrentDate(),
    gentsLead: "",
    ladiesLead: "",
    gentsCount: "",
    ladiesCount: "",
    area_id: 0,
    image: null,
    video: "",
  });

  const [areas, setAreas] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); 
  const [areaId, setAreaId] = useState()

  useEffect(() => {
    checkWithToken({ token: localStorage.getItem("access") })
      .then((res) => { 
        setAreaId(res.data.area_id)
        if (!res.data.is_area_admin) {
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/login/");
      });

    axios.get(`${backend_url}/api/get_areas`).then((res) => {
      setAreas(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("date", form.date || "");
    formData.append("gentsLead", form.gentsLead || "");
    formData.append("ladiesLead", form.ladiesLead || "");
    formData.append("gentsCount", form.gentsCount || 0); // Default to 0 for numbers
    formData.append("ladiesCount", form.ladiesCount || 0); // Default to 0 for numbers
    formData.append("area_id", areaId);
    formData.append("video", form.video || "");
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const response = await axios.post(`${backend_url}/api/add_entry`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Form submitted successfully!");
      console.log("Response:", response.data);
      setForm({
        date: "",
        gentsLead: "",
        ladiesLead: "",
        gentsCount: "",
        ladiesCount: "",
        area_id: "",
        image: null,
        video: "",
      });
    } catch (error) {
      setMessage("Failed to submit the form. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar currentDate={selectedDate} setCurrentDate={setSelectedDate} />
      <div className="pt-16 min-h-screen flex justify-center items-center bg-gray-50 p-6">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Admin Panel
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="gentsLead" className="block text-gray-700 font-medium mb-2">
                Gents Lead
              </label>
              <input
                type="text"
                id="gentsLead"
                name="gentsLead"
                value={form.gentsLead}
                onChange={handleChange}
                placeholder="Enter Gents Lead Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="ladiesLead" className="block text-gray-700 font-medium mb-2">
                Ladies Lead
              </label>
              <input
                type="text"
                id="ladiesLead"
                name="ladiesLead"
                value={form.ladiesLead}
                onChange={handleChange}
                placeholder="Enter Ladies Lead Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gentsCount" className="block text-gray-700 font-medium mb-2">
                Gents Count
              </label>
              <input
                type="number"
                id="gentsCount"
                name="gentsCount"
                value={form.gentsCount}
                onChange={handleChange}
                placeholder="Enter Gents Count"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="ladiesCount" className="block text-gray-700 font-medium mb-2">
                Ladies Count
              </label>
              <input
                type="number"
                id="ladiesCount"
                name="ladiesCount"
                value={form.ladiesCount}
                onChange={handleChange}
                placeholder="Enter Ladies Count"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="video" className="block text-gray-700 font-medium mb-2">
                YouTube Video Link
              </label>
              <input
                type="url"
                id="video"
                name="video"
                value={form.video}
                onChange={handleChange}
                placeholder="Enter YouTube Video URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <button
                type="button"
                className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            {message && (
              <div className="mt-4 text-center text-lg font-semibold">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
