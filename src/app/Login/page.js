import React from "react";
import Heading from "../Components/Heading";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center rounded-4xl">
      <Heading />
      <div className="bg-bg h-card w-card1 text-center ">
        <h2 className="text-white">Login!</h2>
      </div>
    </div>
  );
};

export default page;
