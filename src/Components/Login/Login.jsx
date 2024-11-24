import React, { useState } from "react";
import { loginUser } from "../../ApiCalls/apicall";
import { replace, useNavigate } from "react-router-dom";

const Login = () => { 

    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [password, setPassword] = useState('');  
    const [error, setError] = useState('');  

    const navigate = useNavigate(); 

    function submitLogin() {
         
        loginUser({mobile_number: phoneNumber, password: password}).then((res) => {
            console.log(res, 'here')  
            localStorage.setItem('access', res.data.access_token) 
            navigate('/', {replace: true})
        }).catch(err => {
            setError(err.response.data.detail)
        })
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Login</h2>
        
        {/* Form */}
        <div className="space-y-4">
          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-gray-600 mb-2 font-semibold">
              Phone Number
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
              placeholder="Enter your phone number"
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition duration-200"
              onClick={() => submitLogin()}
            >
              Login
            </button>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-4 text-sm text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-sky-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
