"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      router.push("/Login");
    }
  }, [currentUser, router]);
  return <div className=" bg-black w-full  text-white">dashboard</div>;
};

export default page;
