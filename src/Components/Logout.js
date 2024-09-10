"use client";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userslice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const currentUser = useSelector((state) => state.user.currentUser);
  const onClick = () => {
    Cookies.remove("token");
    dispatch(logout());
  };
  return (
    <button onClick={onClick}>
      <div className=" flex flex-col items-center">
        <Image src="/logout.png" width={20} height={10} />
        <p className="text-white text-sm">Logout</p>
      </div>
    </button>
  );
};

export default Logout;
