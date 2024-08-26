import React, { Suspense } from "react";
import ProfilecCard from "@/app/Components/ProfilecCard";
import AddCard from "@/app/Components/AddCard";

export default function layout({ children }) {
  return (
    <div className=" bg-black w-full  space-x-6">
      <div className="mt-3 mr-12">{children} </div>
      <div className="flex flex-col items-start justify-start">
        <AddCard />
      </div>
    </div>
  );
}
