import React, { Suspense } from "react";
import Sidebar from "../../Components/SideBar";
import { SideBarArray } from "../../../public/array";
import { CiUser } from "react-icons/ci";

export default function layout({ children }) {
  return (
    <div className="flex flex-row">
      <Sidebar array={SideBarArray} />
      {children}
    </div>
  );
}
