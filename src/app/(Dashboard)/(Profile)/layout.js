import React, { Suspense } from "react";
import ProfilecCard from "@/app/Components/ProfilecCard";

export default function layout({ children }) {
  return (
    <div className=" bg-black w-full ">
      <ProfilecCard />
      <div className="flex flex-row  justify-center items-stretch space-x-3">
        {children}{" "}
      </div>
    </div>
  );
}
