import React, { Suspense } from "react";
import ProfilecCard from "@/app/Components/ProfilecCard";

export default function layout({ children }) {
  return (
    <div className=" bg-black w-full flex flex-row  justify-between ">
      <ProfilecCard />
      <div className="mt-3 mr-12">{children} </div>
    </div>
  );
}
