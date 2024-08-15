'use client'
import React, { useState } from "react";
import Heading from "../../Components/Heading";
import Heading2 from "../../Components/Heading2";
import Button from "../../Components/Button";
import Para from "../../Components/Para";
import InputField from "../../Components/InputField";

import './style.css'

const page = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
     [name]:  value ,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form Data Submitted: ", formData);
    console.log(formData.email);
  };
  return (
    <>
    <Heading text="CYPSOS" />
    <div className="flex flex-col justify-center items-center ">
    <div className="bg-bg h-card w-card1 rounded-4xl text-center">
   
    <Heading2 text="Recover Password" />
    <Para content='Please enter your credentials below to continue'/>

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
    <Button title='Reset' onClick={handleSubmit}/>
  </div>
      </div>

    </>
    
  );
};

export default page;
