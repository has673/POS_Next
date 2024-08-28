import React from "react";

import Logout from "./Logout";
import Tab from "./Tab";
import { SideBarArray } from "../../public/array";

const SideBar = ({ array }) => {
  return (
    <div className="bg-bg h-nav w-nav  rounded-tr-md rounded-br-sm flex flex-col ">
      <h2 className="text-pink tracking-normal text-center my-5 bg-bg">
        CYPSOS
      </h2>

      <div className="mb-20">
        {array.map((item, index) => (
          <Tab
            key={index}
            imageUrl={item.imageUrl}
            text={item.text}
            onClick={() => handleTabClick(index)}
            route={item.route}
          />
        ))}
      </div>
      <div className="mt-15 flex flex-col justify-center relative top-12 ">
        {" "}
        <Logout />
      </div>
    </div>
  );
};

export default SideBar;
