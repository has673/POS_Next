import React, { Suspense } from "react";
import ProfilecCard from "@/app/Components/ProfilecCard";

export default function layout({ children }) {
  return (
    <div className="flex flex-row">
      <ProfilecCard />
      {children}{" "}
    </div>
  );
}
