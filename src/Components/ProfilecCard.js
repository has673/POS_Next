import Link from "next/link";
import React from "react";

import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutSharp } from "react-icons/io5";
import { Md10K, MdPerson } from "react-icons/md";
const ProfilecCard = () => {
  return (
    <div className="bg-bg w-profileCard h-twentyvh text-white rounded-md  mt-7 ml-7 p-3">
      <div
        id="hover"
        className="flex gap-2  items-center cursor-pointer rounded-sm"
      >
        <MdPerson />
        <Link href="/">
          <h3>Profile</h3>
        </Link>
      </div>
      <div
        id="hover"
        className="flex gap-2  items-center cursor-pointer rounded-sm mt-3 "
      >
        <IoSettingsOutline />
        <Link href="Access">
          <h3>Manage Access</h3>
        </Link>
      </div>
      <div
        id="hover"
        className="flex gap-2  items-center cursor-pointer rounded-sm mt-3"
      >
        <IoLogOutSharp />
        <h3>Logout</h3>
      </div>
    </div>
  );
};

export default ProfilecCard;
