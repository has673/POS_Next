"use client";
import React, { useState } from "react";
import Heading from "../../../Components/Heading";
import Heading2 from "../../../Components/Heading2";
import Button from "../../../Components/Button";
import Para from "../../../Components/Para";
import InputField from "../../../Components/InputField";
import axios from "axios";

import "./style.css";
import { useRouter } from "next/navigation";

const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Url}/auth/recover-password`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console;
      console.log(response.data);
      router.push("/Login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Heading text="CYPSOS" />
      <div className="flex flex-col justify-center items-center ">
        <div className="bg-bg h-card w-card1 rounded-4xl text-center">
          <Heading2 text="Recover Password" />
          <Para content="Please enter your credentials below to continue" />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your Username"
            val={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            val={formData.password}
            onChange={handleChange}
          />
          <Button title="Reset" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default page;
