import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const SuperUserPage = () => {
  const [area, setArea] = useState("");
  const [branch, setBranch] = useState("");
  const [zone, setZone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: 1, username: "John Doe", mobile: "1234567890", isAdmin: false },
    { id: 2, username: "Jane Smith", mobile: "9876543210", isAdmin: true },
    { id: 3, username: "Alice Brown", mobile: "1112223333", isAdmin: false },
  ]);

 const handleAddArea = () => {
  if (window.confirm("Are you sure you want to add this area?")) {
    console.log("Area Added:", area);
    setArea("");
  }
};

const handleAddBranch = () => {
  if (window.confirm("Are you sure you want to add this branch?")) {
    console.log("Branch Added:", branch);
    setBranch("");
  }
};

const handleAddZone = () => {
  if (window.confirm("Are you sure you want to add this zone?")) {
    console.log("Zone Added:", zone);
    setZone("");
  }
};

  const handleToggleAdmin = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
    console.log("Toggled Admin for User ID:", id);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile.includes(searchTerm)
  );

  return ( 
    <>
    <Navbar />
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Super User Panel</h1>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Add Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Area
          </label>
          <div className="flex">
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter area name"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleAddArea}
              className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Add Branch */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Branch
          </label>
          <div className="flex">
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Enter branch name"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleAddBranch}
              className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Add Zone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Zone
          </label>
          <div className="flex">
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="Enter zone name"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleAddZone}
              className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name or mobile"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* User Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Mobile Number
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Admin Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.mobile}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleToggleAdmin(user.id)}
                    className={`px-4 py-2 rounded-md ${
                      user.isAdmin
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> 
    </>
  );
};

export default SuperUserPage;
