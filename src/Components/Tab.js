// Tab.js

import Link from "next/link";
import React from "react";

const Tab = ({ imageUrl, text, route }) => {
  return (
    <Link href={route} passHref>
      <div
        id="tab"
        className="flex flex-col items-center h-12 mb-4 w-full bg-inherit cursor-pointer"
      >
        <img src={imageUrl} alt={text} />
        <p className="text-center text-white text-xs ">{text}</p>
      </div>
    </Link>
  );
};

export default Tab;
