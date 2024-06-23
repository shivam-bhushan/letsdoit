/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/todo");
    } catch (error) {
      alert(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-[#52796f] text-5xl font-bold pb-6 ">Login</h1>
      <input
        type="text"
        name="email"
        className="text-white placeholder-gray-200 bg-[#84a98c] m-2 p-2 w-64 rounded-xl px-3"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        className="text-white placeholder-gray-200 bg-[#84a98c] m-2 p-2 w-64 rounded-xl px-3"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        className="text-white m-2 p-1 w-44 h-11 bg-[#52796f]  rounded-full"
        onClick={handleSubmit}
      >
        Login
      </button>
      <p
        onClick={() => navigate("/signup")}
        className="pt-2 text-s hover:underline  cursor-pointer text-[#84a98c]"
      >
        Don't have an account? Sign Up
      </p>
    </div>
  );
}

export default Login;
