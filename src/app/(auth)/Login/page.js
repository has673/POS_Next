"use client";
import React, { useState } from "react";
import Heading from "../../Components/Heading";
import Heading2 from "../../Components/Heading2";
import Para from "../../Components/Para";
import InputField from "../../Components/InputField";
import Button from "../../Components/Button";
import Link from "next/link";
import { useRouter } from "next/router";


const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
     [name]:  value ,
    }));
  };
  const handleSubmit = async (e) => {

    e.preventDefault();
    try{
      const response = await fetch('/api/login', { // Replace '/api/login' with your backend login URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      console.log("Form Data Submitted: ", formData)
      console.log(formData.email);
      if (!response.ok) {
        // Handle server errors or invalid responses
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      router.push('/dashboard'); 

    }
   
    catch(err){
      console.log(err)
    }
  
  };
  return (
    <div id="box">
      <Heading text="CYPSOS" />
      <div className="flex flex-col justify-center items-center ">
        <div className="bg-bg h-card w-card1 rounded-4xl text-center rounded-lg">
          <Heading2 text="Login" />
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
          <Link href="/Password">
            <p className="bg-bg text-pink mb-3">Forgot Password?</p>
          </Link>
          <Button title="login" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default page;
