import React from "react";
import Heading from "../Components/Heading";
import Heading2 from "../Components/Heading2";
import Button from "../Components/Button";
import Para from "../Components/Para";
import InputField from "../Components/InputField";


const page = () => {
  return (
    <>
    <Heading text="CYPSOS" />
    <div className="flex flex-col justify-center items-center ">
    <div className="bg-bg h-card w-card1 rounded-4xl text-center">
   
    <Heading2 text="Recover Password" />
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
