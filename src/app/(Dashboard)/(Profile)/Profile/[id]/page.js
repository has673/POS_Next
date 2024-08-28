"use client";

import axios from "axios";
import { Label } from "flowbite-react";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const { id } = params;
  const [userdata, setUserData] = useState({
    username: "",
    email: "",
    address: "",
  });
  const getUser = async (id) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(`http://localhost:4000/auth/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setUserData(res.data);
      console.log(userdata);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser(id);
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      const response = await axios.put(
        `http://localhost:4000/auth/${id}`,
        userdata,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      getUser(id);
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };
  const discard = (e) => {
    setUserData({
      username: "",
      email: "",
      address: "",
    });
  };
  return (
    <div className="bg-bg w-sixtyvw h-card rounded-md mt-18 mr-4 text-white ">
      <h2 className="ml-8 text-white p-3">Personal Information</h2>
      <div className="ml-8 mt-5">
        <Label htmlFor="name" value="Name" className="text-white" />
        <div>
          <input
            id="username"
            placeholder="Enter name"
            required
            value={userdata.username}
            onChange={onChange}
            className="bg-input h-12 p-3 rounded-md w-5/6"
          />
        </div>
      </div>
      <div className="ml-8 mt-5">
        <Label htmlFor="email" value="Email" className="text-white" />
        <div>
          <input
            id="email"
            placeholder="hoh@example.com"
            required
            value={userdata.email}
            className="bg-input h-12 p-3 rounded-md w-5/6"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="ml-8 mt-5">
        <Label htmlFor="address" value="Address" className="text-white" />
        <div>
          <input
            id="address"
            placeholder="Address"
            required
            value={userdata.address}
            className="bg-input h-12 p-3 rounded-md w-5/6"
            onChange={onChange}
          />
        </div>
      </div>

      <div className="flex justify-end mr-10 mt-7 p-4 space-x-2">
        <p
          className="text-white underline hover:text-black cursor-pointer p-2"
          onClick={discard}
        >
          Discard Changes
        </p>
        <button
          className="bg-pink text-black w-2/12 p-2"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default page;
