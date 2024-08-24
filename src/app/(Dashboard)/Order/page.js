"use client";
import CategoryCard from "@/app/Components/CategoryCard";
import { Spin } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";

const page = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
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
  return (
    <div className="bg-black w-full">
      <Spin spinning={loading}>
        <div className="flex justify-center">
          {categories.map((index, category) => (
            <CategoryCard category={category} />
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default page;
