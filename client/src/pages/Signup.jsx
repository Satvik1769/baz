import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginForm.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const base_url = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!email.endsWith("@gmail.com")) {
        toast.error("Invalid email domain. Must be @gmail.com");
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }

      // Create New User
      const response = await fetch(`${base_url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, email, password }),
      });

      // Await the JSON data
      const data = await response.json();

      // Check if the response is successful
      if (response.ok) {
        toast.success("User Entry Saved in Database");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        // Handle the error response from the server
        if (data.message.includes("email")) {
          toast.error("This email already exists. Please use a different one."); // if email is already in db
        } else if (data.message.includes("userName")) {
          toast.error(
            "This username is already taken. Please choose a different one."
          );
        } else {
          toast.error(data.message || "Failed to Register User");
        }
      }
    } catch (err) {
      toast.error("Failed to Register User");
      console.log("Failed to Register User: ", err);
    }
  };

  return (
    <div className="bg-red-400 min-h-screen flex items-center justify-center">
      <div className="login bg-white p-6 rounded shadow-md h-[300px] sm:h-[300px] w-[90%] sm:w-[400px]">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="input input-bordered flex items-center gap-2 mb-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-4 bg-red-500 text-white w-1/4 p-2 rounded"
          >
            Signup
          </button>
        </form>
        <a href="/login" className="text-red-700 hover:underline mt-4">
          Login
        </a>
      </div>
    </div>
  );
}
