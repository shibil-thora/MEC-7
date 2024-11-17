import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

function Admin() {
  const [form, setForm] = useState({
    date: "",
    gentsLead: "",
    ladiesLead: "",
    gentsCount: "",
    ladiesCount: "",
    image: null,
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "video") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // You can process or send the form data here
  };

  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-16 min-h-screen flex justify-center items-center bg-gray-50 p-6">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Admin Panel
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Picker */}
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

            {/* Gents Lead */}
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
                required
              />
            </div>

            {/* Ladies Lead */}
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
                required
              />
            </div>

            {/* Gents Count */}
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
                required
              />
            </div>

            {/* Ladies Count */}
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
                required
              />
            </div>

            {/* Image Upload */}
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
                required
              />
            </div>

            {/* Video Upload */}
            <div>
              <label htmlFor="video" className="block text-gray-700 font-medium mb-2">
                Upload Video
              </label>
              <input
                type="file"
                id="video"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Admin;
