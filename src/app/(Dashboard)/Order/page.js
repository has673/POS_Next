"use client";
import Button from "@/Components/Button";
import Heading from "@/Components/Heading";
import OrderCard from "@/Components/orderCard";

import Subheading from "@/Components/Subheading";
import { Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const itemsPerPage = 6;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  // console.log(items.length);
  // Slice the data to display only the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = orders.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = () => {
    router.push("/CreateOrder");
  };
  // const getData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get("http://localhost:4000/order");
  //     console.log(response);
  //     setOrders(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getData = async (status = "") => {
    try {
      setLoading(true);
      const url = status
        ? `http://localhost:4000/order/filter/status?status=${status}`
        : "http://localhost:4000/order";
      const response = await axios.get(url);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleFilterChange = (status) => {
    setStatusFilter(status);
    getData(status);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="bg-black w-full text-white">
      <div className="flex justify-between">
        <div className="flex justify-start gap-2 ml-4 mb-4">
          <button
            onClick={() => handleFilterChange("")}
            className={`bg-pink h-15 w-auto p-2 rounded-sm text-black mr-4 mt-3 ${
              statusFilter === "" ? "opacity-50" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("IN_PROCESS")}
            className={`bg-pink h-15 w-auto p-2 rounded-sm text-black mr-4 mt-3 ${
              statusFilter === "IN_PROCESS" ? "opacity-50" : ""
            }`}
          >
            In Process
          </button>
          <button
            onClick={() => handleFilterChange("READY")}
            className={`bg-pink h-15 w-auto p-2 rounded-sm text-black mr-4 mt-3 ${
              statusFilter === "READY" ? "opacity-50" : ""
            }`}
          >
            Ready
          </button>
          <button
            onClick={() => handleFilterChange("COMPLETED")}
            className={`bg-pink h-15 w-auto p-2 rounded-sm text-black mr-4 mt-3 ${
              statusFilter === "COMPLETED" ? "opacity-50" : ""
            }`}
          >
            Completed
          </button>
        </div>
        <button
          id="button"
          className="bg-pink h-15 w-auto p-2 rounded-sm text-black mr-4 mt-3"
          onClick={() => handleClick}
        >
          Add New Order
        </button>
      </div>
      <Spin spinning={loading}>
        <div className="grid grid-cols-3 gap-2 mt-2 align-middle">
          {currentData.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          <span className="text-white mt-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </Spin>
    </div>
  );
};
export default page;
