"use client";
import Button from "@/Components/Button";
import Heading from "@/Components/Heading";
import Subheading from "@/Components/Subheading";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/CreateOrder");
  };
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/categories/Order"
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    useEffect(() => {
      getData();
    }, []);
  };

  return (
    <div className="bg-black w-full text-white">
      <div className="flex justify-between">
        <Subheading title="Order" />
        <button
          id="button"
          className="bg-pink h-15 w-auto p-2 rounded-sm text-black"
          onClick={() => handleClick}
        >
          Add Order
        </button>
      </div>
    </div>
  );
};
export default page;
