import React, { Suspense } from "react";
import Sidebar from "../Components/SideBar";
import { SideBarArray } from "../../../public/array";
import Loading from "./Loading";

export default function layout({ children }) {
  return (
    <div className="flex flex-row">
      <Sidebar array={SideBarArray} />
      {children}{" "}
    </div>
  );
}
