import React, { Suspense } from "react";
import ProfilecCard from "@/app/Components/ProfilecCard";
import AddCard from "@/app/Components/AddCard";

export default function layout({ children }) {
  return (
    <div className=" bg-black w-full ">
      <AddCard />
      {children}{" "}
    </div>
  );
}
