import React from "react";
import Heading from "../Components/Heading";
import Heading2 from "../Components/Heading2";
import Para from "../Components/Para";
import InputField from "../Components/InputField";
import Button from "../Components/Button";


const page = () => {
  return (
    <>
      <Heading text="CYPSOS" />
      <div className="flex flex-col justify-center items-center ">
      <div className="bg-bg h-card w-card1 rounded-4xl text-center">
   
      <Heading2 text="Login" />
      <Para content='Please enter your credentials below to continue'/>

      <InputField label="Email" type="Email"/>
      
      <InputField label="Password" type="password"/>
      <Button title='login'/>
    </div>
      </div>
      

      </>
      
  
  );
};

export default page;
