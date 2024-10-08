"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import Modalformupdate from "./Modalformupdate";

// Custom Table component with pagination
const EmployeeTable = ({ data, onRemove }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice the data to display only the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const router = useRouter();

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!currentData || currentData.length === 0) {
    return <p className="text-white">No data available.</p>;
  }

  const singlePage = (id) => {
    router.push(`Staff/${id}`);
  };
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmployee(null);
  };
  return (
    <>
      <div className="overflow-x-auto   shadow-md rounded-md">
        <table className="min-w-full text-white cursor-pointer">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-2 px-4 border-r">ID</th>
              <th className="py-2 px-4 border-r">Name</th>
              <th className="py-2 px-4 border-r">Email</th>
              <th className="py-2 px-4 border-r">Salary</th>
              <th className="py-2 px-4 border-r">Phone</th>
              <th className="py-2 px-4 border-r">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((employee, index) => (
              <tr
                // onClick={() => singlePage(employee.id)}
                key={employee.id}
                className={`border-b text-white dark:border-gray-700 ${
                  index % 2 === 0 ? "bg-bg" : "bg-input"
                }`}
              >
                <td className="py-2 px-4 border-r">{employee.id}</td>
                <td className="py-2 px-4 border-r">{employee.Name}</td>
                <td className="py-2 px-4 border-r">{employee.email}</td>

                <td className="py-2 px-4 border-r">
                  ${employee.salary.toLocaleString()}
                </td>
                <td className="py-2 px-4 border-r">{employee.Phonenumber}</td>

                <td className="py-2 px-4">
                  <button
                    onClick={() => {
                      onRemove(employee.id);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(employee);
                    }}
                    className="text-white hover:text-red-300 ml-5"
                  >
                    <LuPencil />
                  </button>
                  <button
                    onClick={() => {
                      singlePage(employee.id);
                    }}
                    className="text-white hover:text-red-300 ml-5"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 p-2 rounded-b-md">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Modalformupdate
        onOpen={openModal}
        close={handleCloseModal}
        employee={selectedEmployee}
      />
    </>
  );
};

export default EmployeeTable;
