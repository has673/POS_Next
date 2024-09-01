"use client";
import Button from "@/Components/Button";
import Heading from "@/Components/Heading";
import OrderCard from "@/Components/orderCard";

import Subheading from "@/Components/Subheading";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const handleClick = () => {
    router.push("/CreateOrder");
  };
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/order");
      console.log(response);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-black w-full text-white">
      <div className="flex justify-between">
        <Subheading title="Order" />
        <button
          id="button"
          className="bg-pink h-15 w-auto p-2 rounded-sm text-black mr-4 mt-3"
          onClick={() => handleClick}
        >
          Add New Order
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
export default page;
