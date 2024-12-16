import React, { useEffect, useState } from "react";
import { GetAreas, signupUser } from "../../ApiCalls/apicall";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [areaId, setAreaId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({ areas: [], main_areas: [], zones: [] });

  const navigate = useNavigate();

  useEffect(() => {
    GetAreas()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Failed to fetch areas:", err));
  }, []);

  function submitSignUp() {
    signupUser({
      username,
      mobile_number: phoneNumber,
      password,
      area_id: areaId,
      branch_id: branchId,
      zone_id: zoneId,
    })
      .then(() => {
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setError(err.response?.data?.detail || "An error occurred");
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-600 mb-2 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-600 mb-2 font-semibold">
              Mobile Number
            </label>
            <input
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => {
                if (e.target.value.length < 11 && !isNaN(e.target.value)) {
                  setPhoneNumber(e.target.value);
                }
              }}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="area_id" className="block text-gray-600 mb-2 font-semibold">
              Branch
            </label>
            <select
              id="area_id"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="">Select Area</option>
              {data.areas.map((area) => (
                <option value={area.id} key={area.id}>
                  {area.area_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="branch_id" className="block text-gray-600 mb-2 font-semibold">
              Area
            </label>
            <select
              id="branch_id"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="">Select Branch</option>
              {data.main_areas.map((branch) => (
                <option value={branch.id} key={branch.id}>
                  {branch.main_area_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="zone_id" className="block text-gray-600 mb-2 font-semibold">
              Zone
            </label>
            <select
              id="zone_id"
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="">Select Zone</option>
              {data.zones.map((zone) => (
                <option value={zone.id} key={zone.id}>
                  {zone.zone_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition duration-200"
              onClick={submitSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-sky-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
