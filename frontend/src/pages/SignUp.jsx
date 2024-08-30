/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    if (!formData.name || !formData.email || !formData.password) {
      return alert("All fields are required");
    }

    try {
      const response = await axios.post(
        `https://letsdoit-4ttj.onrender.com/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      localStorage.setItem("token", response.data.token);
      navigate("/todolist");
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error registering user:", error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-[#52796f] text-5xl font-bold pb-6">Sign Up</h1>
      <input
        type="text"
        name="name"
        className="text-white placeholder-gray-200 bg-[#84a98c] m-2 p-2 w-64 rounded-xl px-3"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
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
      <input
        type="password"
        name="confirmPassword"
        className="text-white placeholder-gray-200 bg-[#84a98c] m-2 p-2 w-64 rounded-xl px-3"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button
        className="text-white m-2 p-1 w-44 h-11 bg-[#52796f]  rounded-full"
        onClick={handleSubmit}
      >
        SignUp
      </button>
      <p
        onClick={() => navigate("/login")}
        className="pt-2 text-s hover:underline  cursor-pointer text-[#84a98c]"
      >
        Already have an account? Login
      </p>
    </div>
  );
}

export default SignUp;
