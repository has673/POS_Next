import React from "react";
import Sidebar from "../Components/SideBar";
export default function layout({ children }) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      {children}{" "}
    </div>
  );
}
