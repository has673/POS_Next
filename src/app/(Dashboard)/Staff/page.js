"use client";

import Subheading from "@/app/Components/Subheading";
import Button from "@/app/Components/Button";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "../Loading";
import dynamic from "next/dynamic";
import { Modal, Label, TextInput, Checkbox } from "flowbite-react";
import Modalform from "@/app/Components/Modalform";

// Dynamic import
const EmployeeTable = dynamic(() => import("../../Components/EmployeeTable"), {
  suspense: true,
});

const Page = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [modalPlacement, setModalPlacement] = useState("top-right");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/employees");
        const result = await response.json();
        setData(result);
        setCount(result.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle removal of an employee
  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/employees/${id}`);
      console.log("Deleted");
      // Update data and count after successful deletion
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="p-4 bg-black w-full text-white">
      <div>
        <Subheading title="Staff Management" />
      </div>

      <Suspense fallback={<Loading />}>
        <div className="flex justify-between items-center mt-4">
          <div>
            <h3 className="font-medium text-2xl leading-9 ml-3">
              Staff ({count})
            </h3>
          </div>
          <div className="mr-5">
            <Button title="Add Staff" onClick={openModal} />
          </div>
        </div>
        <Modalform onOpen={isModalOpen} close={closeModal} />

        <div className="flex justify-center items-center mt-6">
          <div className="w-full max-w-6xl">
            <EmployeeTable data={data} onRemove={remove} />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
