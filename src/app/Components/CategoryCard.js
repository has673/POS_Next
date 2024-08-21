"use client";

import Image from "next/image";

const CategoryCard = ({ category }) => {
  const menuItemCount = category.MenuItem ? category.MenuItem.length : 0;
  return (
    <div
      id="card"
      className="w-catCard h-catCard bg-dark p-3 rounded-md cursor-pointer"
    >
      <div className=" flex justify-end">
        {" "}
        {category.icon ? (
          <Image src={category.icon} width={25} height={30} alt="all" />
        ) : (
          <Image src="/icon.png" width={25} height={30} alt="all" />
        )}
      </div>

      <p>{category.name}</p>
      <p>{`${menuItemCount} items`}</p>
    </div>
  );
};

export default CategoryCard;
