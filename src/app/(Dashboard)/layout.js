import React, { Suspense } from "react";
import Sidebar from "../../Components/SideBar";
import { SideBarArray } from "../../../public/array";

import Loading from "./Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function layout({ children }) {
  return (
    <div className="flex flex-row">
      <Sidebar array={SideBarArray} />
      {children}{" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </div>
  );
}
