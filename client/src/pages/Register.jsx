import React, { useState } from "react";
// import authSvg from "../assets/auth.svg";
import { toast } from "react-toastify";
import { isAuth } from "../helpers/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    password1: null,
    password2: null,
  });

  const { email, name, password1, password2 } = formData;

  // handle change from inputs
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: null,
              email: null,
              password1: null,
              password2: null,
            });
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(err.response.data.error);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Redirect to="/" /> : null}
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign Up for System
            </h1>
            <form
              className="w-full flex-1 mt-8 text-indigo-500"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto max-w-xs relative">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={handleChange("name")}
                  value={name}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="E-mail"
                  onChange={handleChange("email")}
                  value={email}
                  className="w-full px-8 mt-3 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="Password"
                  onChange={handleChange("password1")}
                  value={password1}
                  className="w-full px-8 mt-3 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
                <input
                  type="text"
                  placeholder="Confirm Password"
                  onChange={handleChange("password2")}
                  value={password2}
                  className="w-full px-8 mt-3 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
