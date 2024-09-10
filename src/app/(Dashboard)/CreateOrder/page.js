"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  clearOrder,
} from "../../../redux/slices/orderslice"; // Updated import path

import CategoryCardSmall from "@/Components/CategoryCardSmall";
import ItemCard from "@/Components/ItemCard";
import { Spin } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Label } from "flowbite-react";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [customerId, setCustomerId] = useState(""); // New state for customerId
  const [status, setStatus] = useState(""); // New state for status
  const [tableNumber, setTableNumber] = useState(""); // New state for tableNumber
  const [floor, setFloor] = useState(""); // New state for floor
  const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.order.items);
  const totalPrice = useSelector((state) => state.order.totalPrice);

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  const fetchCategories = async () => {
    const token = Cookies.get("token");
    try {
      setLoading(true);
      const result = await axios.get(`${Url}/categories`, {
        headers: {
          Authorization: token,
          "ngrok-skip-browser-warning": "abc",
        },
      });
      setCategories(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const result = await axios.get(`${Url}/items`, {
        headers: {
          "ngrok-skip-browser-warning": "abc",
        },
      });
      setItems(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingItems(false);
    }
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setStatus(value);
  };
  const handleCreateOrder = async () => {
    try {
      const token = Cookies.get("token");
      await axios.post(
        `${Url}/order`,
        {
          customerId: 1,
          status: status,
          orderItems: orderItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            name: item.name,
          })),
        },
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "abc",
          },
        }
      );
      dispatch(clearOrder()); // Clear the order after creation
      setCustomerId(""); // Reset customerId
      setStatus(""); // Reset status
      setTableNumber(""); // Reset tableNumber
      setFloor(""); // Reset floor
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" />
        <link rel="icon" href="/download.png" />
      </Head>
      <div className="bg-black w-full flex justify-center">
        <div className="w-2/3">
          <Spin spinning={loading}>
            <div className="grid grid-cols-4 gap-6 mt-5 place-content-center justify-items-center text-white">
              {categories.map((category) => (
                <CategoryCardSmall key={category.id} category={category} />
              ))}
            </div>
            <Spin spinning={loadingItems}>
              <div className="flex justify-between space-x-3">
                <h3 className="text-white ml-5">Orders</h3>
              </div>
              <div className="grid grid-cols-4 gap-6 mt-5 text-white place-content-center justify-items-center">
                {items.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onAdd={() => handleAddItem(item)}
                  />
                ))}
              </div>
            </Spin>
          </Spin>
        </div>
        <div className="w-1/4 bg-bg h-2/3 m-6 my-5 rounded-md flex flex-col items-center">
          <h3 className="text-white">Order Summary</h3>
          {orderItems.length === 0 ? (
            <p className="text-white">No items in the order.</p>
          ) : (
            <ul className="text-white text-xs w-5/6">
              {orderItems.map((item, index) => (
                <li key={item.id} className="flex justify-between w-full px-2">
                  <div className="bg-input mt-2 p-3 w-full flex justify-between gap-3 rounded-md">
                    <span className="bg-pink rounded-xl text-black w-1/12 p-1 text-center">
                      {index + 1}
                    </span>
                    {item.name} - {item.price} x {item.quantity}
                    <button
                      className="text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {orderItems.length > 0 && (
            <>
              <div className="flex justify-between mt-9 gap-2">
                <div>
                  <select
                    id="status"
                    value={status}
                    onChange={handleChange}
                    required
                    className=" rounded-md bg-bg mr-3 text-xs text-white"
                  >
                    <option value="">Set Status</option>
                    <option value="IN_PROCESS">In Process</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="READY">Ready</option>
                  </select>
                </div>
              </div>
              <div className="text-white mt-4 my-9 w-5/6 text-center text-sm rounded-sm">
                <div className="bg-input w-full h-auto p-4">
                  <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                </div>
              </div>
              <button
                className="bg-pink w-1/3 text-black p-1 rounded-md"
                onClick={() => dispatch(clearOrder())}
              >
                Cancel
              </button>
              <button
                className="bg-pink w-1/3 text-black p-1 mt-8 rounded-md"
                onClick={handleCreateOrder}
              >
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
