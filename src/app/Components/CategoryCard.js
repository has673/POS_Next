"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const CategoryCard = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get("http://localhost:4000/categories");
        console.log(result.data);
        setCategories(result.data);
        console.log(categories);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  return (
    <div className="w-20 h-36 bg-dark p-3">
      <Image src="/all.png" width={20} height={40} alt="all" />
      <p>ALL</p>
      <p>116 items</p>
    </div>
  );
};

export default CategoryCard;
