import React from "react";

import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
const ProfilecCard = () => {
  return (
    <div className="bg-bg w-nav h-img">
      <div className="flex ">
        <IoSettingsOutline />
        <h3>Settings</h3>
      </div>
      <div className="flex ">
        <IoLogOutSharp />
        <h3>Logout</h3>
      </div>
    </div>
  );
};

export default ProfilecCard;
