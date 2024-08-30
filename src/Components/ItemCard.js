"use client";

import Image from "next/image";

const ItemCard = ({ item }) => {
  return (
    <div
      id="card"
      className="w-catCard h-itemCard bg-dark p-3 rounded-md cursor-pointer text-sm"
    >
      <div className=" flex justify-end text-sm"></div>
      <div className="mt-18">
        {" "}
        <p className="text-xs">{item.name}</p>
        <p className="text-xs">{item.price}</p>
      </div>
      <div className="flex justify-end">
        <button className="bg-pink text-black w-3/6  h-1/4 p-1 rounded-md text-center">
          Add{" "}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
