"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Custom Table component with pagination
const EmployeeAttendance = ({ data }) => {
  const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const [status, setStatus] = useState("");

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setStatus({ ...status, [id]: value });
  };
  const onClick = async (id) => {
    try {
      const response = await axios.patch(
        `${Url}/employees/${id}/attendance`,

        status,
        {
          headers: {
            "ngrok-skip-browser-warning": "abc",
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="overflow-x-auto   shadow-md rounded-md">
        <table className="min-w-full text-white cursor-pointer">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-2 px-4 border-r">ID</th>
              <th className="py-2 px-4 border-r">Name</th>

              <th className="py-2 px-4 border-r">Attendance</th>

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

                <td className="py-2 px-4 border-r">
                  <select
                    id="status"
                    onChange={handleChange}
                    className="w-40 bg-bg text-white"
                  >
                    <option value="PRESENT">Present</option>
                    <option value="ABSENT">Absent</option>
                    <option value="HALF_LEAVE">Half Leave</option>
                    <option value="PAID_VACATION">Paid Vacation</option>
                  </select>
                </td>

                <td className="py-2 px-4">
                  <button
                    onClick={() => {
                      onClick(employee.id);
                    }}
                    className="text-white hover:text-red-300 ml-5"
                  >
                    Submit
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
    </>
  );
};

export default EmployeeAttendance;
