"use client";

import Subheading from "@/Components/Subheading";
import Button from "@/Components/Button";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "../Loading";
import dynamic from "next/dynamic";
import Modalform from "@/Components/Modalform";
import { Spin } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";
// Dynamic import
const EmployeeTable = dynamic(
  () => import("../../../Components/EmployeeTable"),
  {
    suspense: true,
  }
);

const Page = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const response = await axios.get(`${Url}/employees`, {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "abc",
          },
        });
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
  const remove = async (id) => {
    try {
      await axios.delete(`${Url}/employees/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  const attendancePage = () => {
    router.push("Staff/Attendance");
  };

  return (
    <div className="p-4 bg-black  w-full text-white">
      <div className="flex justify-between">
        <Subheading title="Staff Management" />
        <button className=" text-white mr-10 p-2 rounded-3xl bg-pink">
          <CiUser size={24} />
        </button>
      </div>

      <Spin spinning={loading}>
        <div className="flex justify-between items-center mt-4">
          <h3 className="font-medium text-2xl leading-9 ml-3">
            Staff ({count})
          </h3>
          <Button title="Add Staff" onClick={openModal} className="mr-5" />
        </div>

        <Modalform onOpen={isModalOpen} close={closeModal} />

        <div className="flex justify-center items-center mt-6">
          <div className="w-full max-w-6xl">
            <button
              className="mr-5 my-5 bg-pink text-black p-2"
              onClick={() => {
                attendancePage();
              }}
            >
              Attendance
            </button>
            <EmployeeTable data={data} onRemove={remove} />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Page;
