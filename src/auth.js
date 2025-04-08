import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { notification } from "antd";
import { PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import axios from "axios";

const BASE_URL = "https://hlsnigeria.com.ng";

const authAPI = {
  loginUser: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { 
        username, 
        password 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  registerUser: async (username, password, role, pharmacyName, phone) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        username,
        password,
        role,
        pharmacyName,
        phone
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }
};

function Auth() {
  const [formData, setFormData] = useState({
    username: "",
    pharmacyName: "",
    phone: "",
    password: "",
    retypePassword: "",
  });

  const [state, setState] = useState({
    isLogin: true,
    passwordVisible: false,
    retypePasswordVisible: false,
    loading: false
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      notification.error({ message: "Username is required" });
      return false;
    }

    if (!formData.password) {
      notification.error({ message: "Password is required" });
      return false;
    }

    if (!state.isLogin) {
      if (formData.password !== formData.retypePassword) {
        notification.error({ message: "Passwords do not match" });
        return false;
      }
      if (!formData.pharmacyName.trim()) {
        notification.error({ message: "Pharmacy name is required" });
        return false;
      }
      if (!formData.phone.trim()) {
        notification.error({ message: "Phone number is required" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setState(prev => ({...prev, loading: true}));

    try {
      if (state.isLogin) {
        await authAPI.loginUser(formData.username, formData.password);
        notification.success({ message: "Login successful" });
        window.location.href = "/dashboard";
      } else {
        await authAPI.registerUser(
          formData.username,
          formData.password,
          "researcher",
          formData.pharmacyName,
          formData.phone
        );
        notification.success({ 
          message: "Registration successful. Please log in." 
        });
        setState(prev => ({...prev, isLogin: true}));
      }
    } catch (err) {
      notification.error({
        message: err.message || "An error occurred",
      });
    } finally {
      setState(prev => ({...prev, loading: false}));
    }
  };

  const togglePasswordVisibility = (field) => {
    setState(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const toggleAuthMode = () => {
    setState(prev => ({
      ...prev,
      isLogin: !prev.isLogin,
      passwordVisible: false,
      retypePasswordVisible: false
    }));
    setFormData({
      username: "",
      pharmacyName: "",
      phone: "",
      password: "",
      retypePassword: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-blue-500">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4 sm:p-6 md:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl sm:text-2xl">🏥</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {state.isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            {state.isLogin ? "Please login to continue" : "Register to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Username Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Username"
              required
            />
          </div>

          {/* Registration Fields */}
          {!state.isLogin && (
            <>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HomeOutlined className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.pharmacyName}
                  onChange={(e) => handleChange("pharmacyName", e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pharmacy Name"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneOutlined className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </>
          )}

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type={state.passwordVisible ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Password"
              required
              minLength={6}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility("passwordVisible")}
            >
              {state.passwordVisible ? (
                <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Confirm Password (Registration only) */}
          {!state.isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type={state.retypePasswordVisible ? "text" : "password"}
                value={formData.retypePassword}
                onChange={(e) => handleChange("retypePassword", e.target.value)}
                className="block w-full pl-9 sm:pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm Password"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("retypePasswordVisible")}
              >
                {state.retypePasswordVisible ? (
                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                )}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-70 text-sm sm:text-base"
            disabled={state.loading}
          >
            {state.loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {state.isLogin ? "Logging in..." : "Registering..."}
              </>
            ) : (
              state.isLogin ? "Login" : "Register"
            )}
          </button>
        </form>

        {/* Toggle between Login/Register */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            {state.isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={toggleAuthMode}
            className="mt-1 sm:mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
          >
            {state.isLogin ? "Create new account" : "Login to existing account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;