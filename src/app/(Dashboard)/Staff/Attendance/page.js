"use client";

import Subheading from "@/Components/Subheading";
import Button from "@/Components/Button";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Modalform from "@/Components/Modalform";
import { Spin } from "antd";
import Cookies from "js-cookie";
import EmployeeAttendance from "@/Components/EmployeeAttendance";

// Dynamic import

const Page = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const response = await axios.get(
          "http://localhost:4000/employees/get/attendance"
        );
        const result = response.data;
        setData(result);
        setCount(result.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle removal of an employee
  const date = new Date();
  console.log(date);
  return (
    <div className="p-4 bg-black w-full text-white">
      <div>
        <Subheading title="Attendance" />
      </div>
      <div className="flex gap-4 justify-center">
        <h3>Date :</h3>
        <h3>{date.toLocaleString()}</h3>
      </div>

      <Spin spinning={loading}>
        <div className="flex justify-between items-center mt-4">
          <h3 className="font-medium text-2xl leading-9 ml-3">
            Staff ({count})
          </h3>
        </div>

        <div className="flex justify-center items-center mt-6">
          <div className="w-full max-w-6xl">
            <EmployeeAttendance data={data} />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Page;
