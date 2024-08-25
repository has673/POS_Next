"use client";
import Heading2 from "@/app/Components/Heading2";
import { Label } from "flowbite-react";

import React, { useState } from "react";

const page = () => {
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const onChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };
  const discard = (e) => {
    e.target.value = "";
  };
  return (
    <div className="abolute top-0">
      <div className="bg-bg w-sixtyvw h-card rounded-md ml-8">
        <h2 className="ml-8 text-white my-4">Personal Information</h2>
        <div className="ml-8">
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
        <div className="ml-8">
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
        <div className="ml-8">
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

        <div className="ml-8">
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
            className="text-white underline hover:text-black cursor-pointer"
            onClick={discard}
          >
            Discard Changes
          </p>
          <button className="bg-pink text-black w-1/12 p-3">Update</button>
        </div>
      </div>
    </div>
  );
};

export default page;
