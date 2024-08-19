"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

// Custom Table component with pagination
const EmployeeTable = ({ data, onRemove }) => {
  const route = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice the data to display only the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!currentData || currentData.length === 0) {
    return <p className="text-white">No data available.</p>;
  }

  const navigate = (id) => {
    route.push(`Staff/${id}`);
  };
  return (
    <div className="overflow-x-auto bg-gray-800 border border-gray-600 shadow-md rounded-md">
      <table className="min-w-full bg-gray-900 text-white cursor-pointer">
        <thead className="bg-gray-700 border-b border-gray-600">
          <tr>
            <th className="py-2 px-4 border-r">ID</th>
            <th className="py-2 px-4 border-r">Name</th>
            <th className="py-2 px-4 border-r">Email</th>
            <th className="py-2 px-4 border-r">Salary</th>
            <th className="py-2 px-4 border-r">Phone</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr
              onClick={navigate(employee.id)}
              key={employee.id}
              className="bg-gray-800 border-b border-gray-600"
            >
              <td className="py-2 px-4 border-r">{employee.id}</td>
              <td className="py-2 px-4 border-r">{employee.Name}</td>
              <td className="py-2 px-4 border-r">{employee.email}</td>

              <td className="py-2 px-4 border-r">
                ${employee.salary.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-r">{employee.phoneNumber}</td>

              <td className="py-2 px-4">
                <button
                  onClick={() => {
                    onRemove(employee.id);
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan="6"
              className="py-2 px-4 border-r bg-gray-700 text-white"
            >
              Total Employees
            </td>
            <td className="py-2 px-4 bg-gray-700 text-white">{data.length}</td>
          </tr>
        </tfoot>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 p-2 bg-gray-700 rounded-b-md">
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
  );
};

export default EmployeeTable;
