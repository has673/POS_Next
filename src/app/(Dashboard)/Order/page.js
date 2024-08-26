"use client";
import CategoryCard from "@/app/Components/CategoryCard";
import ItemCard from "@/app/Components/ItemCard";
import { Spin } from "antd";
import axios from "axios";
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
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:4000/categories");
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
    <div className="bg-black w-full">
      <Spin spinning={loading}>
        <div className="flex justify-center mt-5 mb-5 gap-3 text-white">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <Spin spinning={loadingitems}>
          <div className="grid grid-cols-3 gap-6 mt-5 text-white place-content-center justify-items-center">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </Spin>
      </Spin>
    </div>
  );
};

export default page;
