"use client";

import Image from "next/image";

const ItemCard = ({ item }) => {
  return (
    <div
      id="card"
      className="w-catCard h-itemCard bg-dark p-3 rounded-md cursor-pointer text-sm"
    >
      <h3 className="text-gray text-xs">Order Khitchen</h3>
      <div className=" flex justify-end text-sm"></div>
      <div className="mt-18">
        {" "}
        <p className="text-xs">{item.name}</p>
        <p className="text-xs">{item.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
