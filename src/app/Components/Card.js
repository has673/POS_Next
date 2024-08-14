import React from "react";
import Heading2 from "./Heading2";
import Para from "./Para";
import InputField from "./InputField";
import Button from "./Button";

const Card = () => {
  return (
    <>
    <div className="bg-bg h-card w-card1 rounded-4xl text-center">
   
      <Heading2 text="Login" />
      <Para content='Please enter your credentials below to continue'/>

      <InputField label="Email" type="Email"/>
      
      <InputField label="Password" type="password"/>
      <Button title='login'/>
    </div>
    </>
  );
};

export default Card;
