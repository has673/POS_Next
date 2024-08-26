"use client";

import Image from "next/image";

const ItemCard = ({ item }) => {
  return (
    <div
      id="card"
      className="w-catCard h-itemCard bg-dark p-3 rounded-md cursor-pointer text-sm"
    >
      <h3 className="text-gray">Order Khitchen</h3>
      <div className=" flex justify-end">
        {" "}
        {item.photo ? (
          <Image src={item.photo} width={25} height={25} alt="all" />
        ) : (
          <Image src="/icon.png" width={25} height={30} alt="all" />
        )}
      </div>

      <p>{item.name}</p>
      <p>{item.price}</p>
    </div>
  );
};

export default ItemCard;
