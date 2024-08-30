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
import { Label, Select } from "flowbite-react";

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);

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
      const result = await axios.get("http://localhost:4000/categories", {
        headers: {
          Authorization: token,
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
      const result = await axios.get("http://localhost:4000/items");
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
              {" "}
              {orderItems.map((item, index) => (
                <li key={item.id} className="flex justify-between w-full px-2">
                  <div className="bg-input mt-2  p-3 w-full flex justify-between gap-3 rounded-md">
                    <span className="bg-pink rounded-xl text-black w-1/12 p-1 text-center">
                      {index + 1}
                    </span>{" "}
                    {item.name} - {item.price} x {item.quantity}
                    <div>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {orderItems.length === 0 ? (
            <p>Nothin</p>
          ) : (
            <>
              <div>
                <Label htmlFor="Table" value="Table" className="text-white" />
                <select
                  id="reservation.tableNumber"
                  placeholder="Select table"
                  // value={reservationData.reservation.tableNumber}
                  // onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                >
                  <option value="">Select Table</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div>
                <Label htmlFor="Table" value="Floor" className="text-white" />
                <select
                  id="reservation.tableNumber"
                  placeholder="Select table"
                  // value={reservationData.reservation.tableNumber}
                  // onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                >
                  <option value="">Select Floor</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </>
          )}
          <div className="text-white mt-4 my-9 w-5/6 text-center text-sm rounded-sm">
            <div className="bg-input w-full h-auto p-4">
              <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
            </div>
          </div>
          <button
            className="bg-pink w-1/3 text-black p-1"
            onClick={() => {
              dispatch(clearOrder());
            }}
          >
            Cancel
          </button>
          <button className="bg-pink w-1/3 text-black p-1 mt-8 rounded-md">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
