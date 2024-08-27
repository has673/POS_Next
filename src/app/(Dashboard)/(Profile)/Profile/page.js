"use client";
import Heading2 from "@/Components/Heading2";
import axios from "axios";
import { Label } from "flowbite-react";

import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const { id } = params;
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const getUser = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/auth/login/getProfile${id}`
      );
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
    e.preventDefult();
    try {
      const response = await axios.put(
        `http://localhost:4000/auth/login/updateProfile${id}`,
        userdata
      );
      console.log(response.data);
      getUser();
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
      name: "",
      email: "",
      address: "",
      password: "",
    }); //
  };
  return (
    <div className="bg-bg w-sixtyvw h-card rounded-md mt-18 mr-4">
      <h2 className="ml-8 text-white p-3">Personal Information</h2>
      <div className="ml-8 mt-5">
        <Label htmlFor="name" value="Name" className="text-white" />
        <div>
          <input
            id="name"
            placeholder="Enter name"
            required
            value={userdata.name}
            onChange={onChange}
            className="bg-input h-12 p-3 rounded-md w-5/6"
          />
        </div>
      </div>
      <div className="ml-8 mt-5">
        <Label htmlFor="email" value="Email" className="text-white" />
        <div>
          <input
            id="name"
            placeholder="hoh@example.com"
            required
            value={userdata.email}
            className="bg-input h-12 p-3 rounded-md w-5/6"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="ml-8 mt-5">
        <Label htmlFor="email" value="Address" className="text-white" />
        <div>
          <input
            id="addrress"
            placeholder="hoh@example.com"
            required
            value={userdata.address}
            className="bg-input h-12 p-3 rounded-md w-5/6"
            onChange={onChange}
          />
        </div>
      </div>

      <div className="ml-8 mt-5">
        <Label htmlFor="email" value="Password" className="text-white" />
        <div>
          <input
            id="password"
            placeholder="Enter password"
            required
            value={userdata.password}
            className="bg-input h-12 p-3 rounded-md w-5/6"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="flex justify-end mr-10 mt-3 space-x-2">
        <p
          className="text-white underline hover:text-black cursor-pointer p-2"
          onClick={discard}
        >
          Discard Changes
        </p>
        <button className="bg-pink text-black w-2/12 p-2">Update</button>
      </div>
    </div>
  );
};

export default page;
