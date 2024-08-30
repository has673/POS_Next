"use client";

import Image from "next/image";

const ItemCard = ({ item, onAdd }) => {
  return (
    <div className="w-catCard h-itemCard bg-dark p-3 rounded-md cursor-pointer text-sm">
      <div className=" flex justify-end text-sm"></div>
      <div className="mt-18">
        {" "}
        <p className="text-xs">{item.name}</p>
        <p className="text-xs">{item.price}</p>
      </div>
      <div className="flex justify-end">
        <button
          id="add"
          className="bg-pink text-black w-3/6  h-1/4 p-1 rounded-md text-center"
          onClick={() => onAdd()}
        >
          Add{" "}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
