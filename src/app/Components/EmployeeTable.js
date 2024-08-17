"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

// Custom Table component with pagination
const EmployeeTable = ({ data, onRemove }) => {
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
    return <p>No data available.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 shadow-md rounded-md ">
      <table className="min-w-full bg-gray-300">
        <thead className="bg-gray-100 border-b">
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
            <tr key={employee.id}>
              <td className="py-2 px-4 border-r">{employee.id}</td>
              <td className="py-2 px-4 border-r">{employee.Name}</td>
              <td className="py-2 px-4 border-r">{employee.email}</td>

              <td className="py-2 px-4 border-r">
                ${employee.salary.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-r">{employee.phoneNumber}</td>

              <td className="py-2 px-4 border-r">
                <button
                  onClick={() => {
                    onRemove(employee.id);
                  }}
                >
                  {" "}
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7" className="py-2 px-4 border-r">
              Total Employees
            </td>
            <td className="py-2 px-4">{data.length}</td>
          </tr>
        </tfoot>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 p-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
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
