import React, { Suspense } from "react";
import ProfilecCard from "@/app/Components/ProfilecCard";

export default function layout({ children }) {
  return (
    <div className=" bg-black w-full ">
      <ProfilecCard />
      {children}{" "}
    </div>
  );
}
