import Heading from "@/app/Components/Heading";
import { Label } from "flowbite-react";
import React from "react";

const Page = async ({ params }) => {
  const { id } = params;
  let employee = null;

  try {
    const response = await fetch(`http://localhost:4000/employees/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    employee = await response.json();
  } catch (err) {
    console.log("Error fetching employee:", err);
  }

  if (!employee) {
    return (
      <div className="bg-black w-full text-white min-h-screen flex flex-col items-center">
        <h2 className="text-xl font-semibold mt-4">Employee not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-black w-full text-white min-h-screen flex flex-col items-center">
      <div className="mt-4 text-start">
        <Heading text={employee.Name || "N/A"} />
      </div>

      <h2 className="text-xl font-semibold mt-4">Employee Details</h2>
      <div className="mt-8 bg-bg rounded-lg w-full max-w-4xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-pink-500">Name:</Label>
            <p className="text-white">{employee.Name || "N/A"}</p>
          </div>
          <div>
            <Label className="text-pink-500">Email:</Label>
            <p className="text-white">{employee.email || "N/A"}</p>
          </div>
          <div>
            <Label className="text-pink-500">Phone:</Label>
            <p className="text-white">{employee.Phonenumber || "N/A"}</p>
          </div>
          <div>
            <Label className="text-pink-500">DOB:</Label>
            <p className="text-white">
              {employee.dateofbirth
                ? new Date(employee.dateofbirth).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <Label className="text-pink-500">Address:</Label>
            <p className="text-white">{employee.Address || "N/A"}</p>
          </div>
          <div>
            <Label className="text-pink-500">Role:</Label>
            <p className="text-white">{employee.role || "N/A"}</p>
          </div>
          <div>
            <Label className="text-pink-500">Salary:</Label>
            <p className="text-white">{employee.salary || "N/A"}</p>
          </div>
          <div>
            <Label className="text-pink-500">Shift Start:</Label>
            <p className="text-white">
              {employee.StartTime
                ? new Date(employee.StartTime).toLocaleTimeString()
                : "N/A"}
            </p>
          </div>
          <div>
            <Label className="text-pink-500">Shift End:</Label>
            <p className="text-white">
              {employee.EndTime
                ? new Date(employee.EndTime).toLocaleTimeString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
