import React, { useEffect, useState } from "react";
import { GetAreas, signupUser } from "../../ApiCalls/apicall";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [areaId, setAreaId] = useState("");
  const [error, setError] = useState("");
  const [areas, setAreas] = useState([]); 

  const navigate = useNavigate(); 

  useEffect(() => {
    GetAreas().then((res) => {
      setAreas(res.data) 
      console.log(res.data)
    })
  }, [])

  function submitSignUp() {
    signupUser({ username, mobile_number: phoneNumber, password, area_id: areaId })
      .then((res) => {
        console.log(res, "here");
        navigate("/login/", { replace: true });
      })
      .catch((err) => {
        setError(err.response.data.detail);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form */}
        <div className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-gray-600 mb-2 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                    setUsername(e.target.value)
                  }
              }
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-gray-600 mb-2 font-semibold">
              Mobile Number
            </label>
            <input
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => {
                if (e.target.value.length < 11 && (!isNaN(e.target.value))){
                  setPhoneNumber(e.target.value)
                  }
                }
              }
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {/* Password Field */}
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

          {/* Area ID Dropdown */}
          <div>
            <label htmlFor="area_id" className="block text-gray-600 mb-2 font-semibold">
              Area
            </label>
            <select
              id="area_id"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              {/* <option value="">Select Area</option> */}
              {areas && areas.map((area) => (
                <option value={area.id} key={area.id}>{area.area_name}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition duration-200"
              onClick={() => submitSignUp()}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-4 text-sm text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
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
