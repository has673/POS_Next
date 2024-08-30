"use client";
import Button from "@/Components/Button";
import CategoryCardSmall from "@/Components/CategoryCardSmall";
import ItemCard from "@/Components/ItemCard";
import { Spin } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import React, { useState, useEffect } from "react";

const page = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingitems, setLoadingItems] = useState(false);

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
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // End loading
    }
  };
  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const result = await axios.get("http://localhost:4000/items");
      setItems(result.data);
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingItems(false); // End loading
    }
  };
  return (
    <>
      <Head>
        <title>Orders</title>
        <meta property="og:title" content="Order" key="title" />
      </Head>
      <div className="bg-black w-full flex justify-center">
        <div className="w-2/3">
          <Spin spinning={loading}>
            <div className="grid grid-cols-4 gap-6 mt-5 place-content-center justify-items-center text-white">
              {categories.map((category) => (
                <CategoryCardSmall key={category.id} category={category} />
              ))}
            </div>

            <Spin spinning={loadingitems}>
              <div className="flex justify-between space-x-3">
                <h3 className="text-white ml-5">Orders</h3>
              </div>
              <div className="grid grid-cols-4 gap-6 mt-5 text-white place-content-center justify-items-center">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </Spin>
          </Spin>
        </div>
        <div className="w-1/4 bg-bg h-2/3 m-6 rounded-md"> </div>
      </div>
    </>
  );
};

export default page;
