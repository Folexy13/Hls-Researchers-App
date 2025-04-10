import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { notification } from "antd";
import axios from "axios";

const BASE_URL = "https://hlsnigeria.com.ng";

const authAPI = {
  loginUser: async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { 
        username, 
        password 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  registerUser: async (username, password, role) => {
    console.log(role)
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/reregister`, {
        username,
        password,
        // role,
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
    
     
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setState(prev => ({...prev, loading: true}));

    try {
      if (state.isLogin) {
        const resp = await authAPI.loginUser(formData.username, formData.password);
        notification.success({ message: "Login successful" });
        localStorage.setItem("authToken",resp.access)
        window.location.href = "/";
      } else {
        const resp = await authAPI.registerUser(
          formData.username,
          formData.password,
          "researcher",
        );
        notification.success({ 
          message: "Registration successful. Please log in." 
        });
        localStorage.setItem("authToken",resp.access)
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-900 to-green-500">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4 sm:p-6 md:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <img className=" mx-auto mb-4"  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gADAP/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/CABEIADIAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFBgIB/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/9oADAMBAAIQAxAAAAHvzDmm4wvFqdAreK6XFevFtBS+lxXzjZVxYUbyCvTTqMqQ0WZ4NZnWCyyR9ieKxbgq5XLpsaGRrehx5mV002fTSwN2wU5rVcoWr/sxNn5UvlDjdLLTXHk3vJiTa3s5qxuwnNOkH3nOrqQxaetZpEFnQj2pgW9OSunMet6YycvqYjEh6f4Y/wB2BHidD5PQAAAAAAAAAAAAAAAAP//EACcQAAICAQQBAwQDAAAAAAAAAAIDAQQSAAUTFBEVITQjJDA1QEVQ/9oACAEBAAEFAv5R2WvZ0WTqYt1NJcD1rMis8wdg7qgFNkXyu0prluBh+pK5AcDGJcDxZbWo9KcDZK+mEzfUKouq4V3lM0vcFNZ3U9UHCbZ3BUMvskK7D6SQsciu7AIX9vuKvmNBp7w2CGqL+FFaTrNqtWF3+6Wtx7htXnq8sidVsuTRasXR5mnuEMCm6VlQquKbtT53Xj1hTVr3NBSNzcfaLRnmoCG1DSCYym4r5j7SUOAkORWdVfqxaStiutZhV1L2m9KHixQviUnaO8lLWTWUOSIeQCyBUsIBS16gRicYyJCTKa6ClyocopPhr5sCFhX1TSeSvmWsBvVWy7btpKeC3z+p7Zj09rKeO+kbF6kxh7oj9rZ/YtWLlbUH0vwWR8oihkhNFCZ1ADBmsGa8ewoUBYxkIiOoQkSxiSxHLGMsYmdQMDH+B//EACMRAAIABQIHAAAAAAAAAAAAAAECAAMRIDEEEhMhIkBBYcH/2gAIAQMBAT8BdwscRhlY3DlaCDdp1DTzXxGpoh6YTNPfy1EIObkFJquI1JZ5h24gJSlO4//EAB8RAAEEAwADAQAAAAAAAAAAAAEAAgMREiAhMUBBYf/aAAgBAgEBPwENtYj4VWtbTuxi4hI6uryL/NS4HZ/WFpUcTQAXLK/Y/8QAORAAAgEDAgQDBAYKAwAAAAAAAQIAAxESITEEEyJBMlFhFCOBghAzQlJxcgUkMEBQYnSRsbLBwtH/2gAIAQEABj8C/ejT4XYb1DLvxdS/pMs+fT7g7wOkrIdltaGh9sLl8JWJv7k2bSGyVFt99LSpSRuun4pURd6ZsZhy6+XlyjKlMeKno0LJsGKzFr6bkDb6Hx+w2J/GCp1EF8BZe85jLVAyx1Q3j1WDoq75paOAHDIMihSxtOWqVstj7s6T2i5w221v5SpTF8ktf4x0CVWKmxxpkzFfE5xlOnTAue8W+7NjEJFzfEzFdKdYXt6ziPljClV5Z5A1xv3n6TDvk2a3a1vKVqlTikr4C/SALThqr0aiZXWq7bHKcYGdQTUFgT6Qf0//AGnGcqvy+pb9F+0e5uea+vxlTiM1vli1I9x/7MzbU7DtOKQuoY8QbC84cK2Le1mx+JlLmVgW5y9eNrSp7RxXNUMOumPDDRarT4j3d+ao1HoZx351/wBZhf3dufh/NtOMzdVvha59JxX62lJedqjAayk/ZXnLwVwdRpAG2W8OJtOFU+IAsZxHyyxVmq4/YS5tDVUK1N9TpvMafDEK435NgYKL03ckZWVMoK6IjeuOt4ClKpc9OfL0/vERul62xtvDQUWa2egjpgOagBJxhp8qrkT2p+KLxD0gLkdWGoi8PgMvHYLt6yzqGHkRCFpqoO9hOhFX8otCQBc7zKwy2vMmpIW8ysuaNMnzKxkPeGjVHvKWoPmJXq7sRaZ1zr2p9zG4it9Y/byE4j5ZdeJ9nr4bsOlhOYVC3B8O0oj2tGGH1VhcS/DleYOHJsw31gdWyLksxP3u8Qe1pbJvc2F95w1Jtij/AAlRaw96lEK3rrvOL/Kn/M4H5/8AEam4urCxj1XbKoWxv6Lp+xfTXEymrOy23xlwt282+hmA1bedaK34iW7TJaSA+YWZWGW150gDvpMhSQHzxgawuNjMrDLzhawue8BIFxt9FlAH4fwH/8QAKBABAAICAgEDAwQDAAAAAAAAAQARITFBUWFxgaEQkbEwQNHwUMHx/9oACAEBAAE/If3QYBg1PaVfUOn5hVKHgCO1h2cj1FAx1V2Nwaw0WVjKom9Qp5NVXe4Q+aF/S5d8UBUVh3c5q4nwm9itX6RzWwsOy4pioLKyNMS5tMyX1bx9BVtveVhMu7Eipvj2jmrgDJdUczkG8jfQ5mfCol7BzMbA5At56nn5h2Kw7ucPbU1SyXlJ5A+pOqATuxC+ZdhWI77ikrLJpISqwfp/X5nx/wAWADNFG5eBCPlDHCVq38MDzENjpFqs57lQ/oRcY/IijclBF8YAFRdSrYWYToFGosnmVwOnzLBdKRcHEBqQ6bp6YMcf4ZdeJUwgrjmVq+YMAKRGTgxP7DpP4PXf/v1hGthGXGMEbYMTlcTwYXF2cySwrUtGKKOo5rZtgVVuvi8z4/4sDJVkYvOuIHPLuvv7RItyvRGd6mZE1cB394HjLuaDu83GE7A3/wAJVch7A7ZUf7igpd+stwKDtrPtF4bt+RtO5vZ2G15eolyVTgZ/Zmc9tyia+0DBhKGuUC0FqyoN+s8PNGa6nhOwWOXHKFWauxvpl5gP2LKUGgh53Gayck2nnqNOrTF8f8WLuYib/nkhtfhilvJ4dy1tQP3C7lBFAWPDA3JbKbOFcQyi94Dm78zBTlTaopPJKAClwzR6ifRb507bhBHujTfoD4v3/RBeVAxmEwwULayx7urfpSkqt3WoOBJqpqU0HCoUF+AM8NNGa6gqWralWwwK5ALioNxGSZucKwzUBAW6mWKqtpMn0qxbuhX+B//aAAwDAQACAAMAAAAQ2R8w40w604w0wmkFw0cwAQ4Qkw4EiYoYEwY8888gc88888888888/8QAJREBAAEDAwEJAAAAAAAAAAAAAREAITEgYbFBQFGBkaHR4fDx/9oACAEDAQE/EIWbrgMtZjB4PoVJIvOPKdKiDjUzGYFtv3igcwb1ZBgXJ50y9s+3+MalQQiDud1KwAWGehtUcdDLvZ9+0f/EACIRAQABBAEDBQAAAAAAAAAAAAERACAhMUFAUbFhcZGh8P/aAAgBAgEBPxBtamwE1LM8WqCW5AlEvHf95rOba+IzSoraPNpERm5AjD9NPQr29femRXnqP//EACYQAQEAAgICAgIBBQEAAAAAAAERACExQVFhcZEQgaEwQMHh8fD/2gAIAQEAAT8Q/Fy/2ygVxd9wdP8Az0r/ADi45FUQYXc5gfcOX+X4xibqT5SPOCFWShKNu+DBJtgdiG/NHWbOrVUFQ+DjHTxFR6vIb46zYdgRF8Pc4Zw4iqAYAgI96TKTsOdVwTt3xiEo4oDJHvTiopD/AHMGNEwaA1wu2XVxF2hMALPJs3mxNQ2AgN8vAIvhquUvhTvKpOCUPAhaUNd56euiosoeNd5orEDGKDSUec+4e/dvRMfIC5JwB70YmHxBoMhOEyrUEhzHn+NfvKYKQ0UCvar9YA4VD2KPUyOogg5NfKRD5wCiiyBC8dcP/H4FdCGFCEUm+8FaIBK0sMNT6zXvmSIOm1qBcGl6xrfSdSFDWAcX0Quha71j03fk9MQy3ovU7SYS0wXJazqu5iHJvCXOW3sMjxg+/wCKZh6nfzmwEoRiRNceGsidQ0l+MN4WEW4rcnLbvABEDpo0Y0Kr05OBDJyCJ2tJOOMV3/uweR+O7Po8MEGUIO/iu+T7x+FkgO9ANGtDxgXzdepz/jGof3yJyR5MJcC7iPDxXD6kgBHdGPZiu+F1FAf0H4FRxygd5QpV5ebmvINkh1TaaR2SZUXzwuLFb495KeqR1KAZAfxl4a5jESEBO9kx6XgAAtGYUPcuD0XBIUA8mwL8YISDlVmxykbh6GpqBdO3L4wGIZeE2A67pcaepbFkWWFBXhyAK2GEU8JTHlbm67aC3mOeEVaLNgb1iNvgReWGILwGiwgrvWt59ZK5rtzLuYwSouteNpdY7/aCPKpXNIcR4Gx/TiyPBOrij3KfXkwQyhbvaD4mD17DdBBwvn/WcB4OfAeuDXg9v4VL3yoMFBsqLwiDlsNmiUS9EfOMbYhlZeFIXk7xMgsZINYkVm+MGHQgNoHRJPWMAgjrWPyfD+MUFCDaC+0AnxkoNMbCnqQ+VxErv/FiOb/gz3AlQSfeNHuXGyb7Ly/0UNTZK2OD51gB/OBGt+NH6wgQtIJ8nQ+5kyTRGzwJ9K492aDV5KawOepwanieMHEiAtedhc1tRKfJduZdzBUziNHKzlfOKVKHh8iFuHCFEKLzHkuAAMLJsbC8z1h4gAiAcC8sy+horUjHqnj8b4CgirVh2v8ARcP7f//Z" alt="..."/>
         
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
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-70 text-sm sm:text-base"
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
            className="mt-1 sm:mt-2 text-green-600 hover:text-green-800 font-medium text-sm sm:text-base"
          >
            {state.isLogin ? "Create new account" : "Login to existing account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
