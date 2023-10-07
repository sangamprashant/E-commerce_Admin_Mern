import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminContext } from "../AdminContext";

const SignIn = () => {
  const {user,setUser,token, setToken} = useContext(AdminContext);
  const [dataInput, setDataInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const handelInput = (e) => {
    e.preventDefault();
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value,
    });
  };

  const handelSave = async (e) => {
    e.preventDefault();
    if (!dataInput.email) {
      toast.error("Please enter an email.");
      return;
    }
    if (!dataInput.password) {
      toast.error("Please enter a password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/do/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(dataInput), // Convert the object to JSON string
      });

      if (response.status === 200) {
        // Handle a successful login
        const data = await response.json();
        toast.success(data.message);
        setUser(data.details);
        sessionStorage.setItem("user", JSON.stringify(data.details));
        sessionStorage.setItem("token", data.token);
        setToken(data.token)
        setDataInput({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        // Handle authentication errors here
        toast.error("Authentication failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-blue-900 flex justify-center items-center">
      <form className="block bg-white p-6 rounded-xl w-80">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter email"
            name="email"
            onChange={handelInput}
            value={dataInput?.email}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter password"
            onChange={handelInput}
            value={dataInput?.password}
            name="password"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          onClick={handelSave}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
