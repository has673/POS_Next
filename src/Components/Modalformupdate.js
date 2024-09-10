import { Modal, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";

import Button from "./Button";
import axios from "axios";

const Modalformupdate = ({ onOpen, close, employee }) => {
  const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    role: "",
    Phonenumber: "",
    salary: "",
    dateofbirth: "",
    Starttime: "",
    Endtime: "",
    Address: "",
    Details: "",
  });
  useEffect(() => {
    if (employee) {
      setFormData({
        Name: employee.Name || "",
        email: employee.email || "",
        role: employee.role || "",
        Phonenumber: employee.Phonenumber || "",
        salary: employee.salary || "",
        dateofbirth: employee.dateofbirth || "",
        Starttime: employee.Starttime || "",
        Endtime: employee.Endtime || "",
        Address: employee.Address || "",
        Details: employee.Details || "",
      });
    }
  }, [employee]);
  const [modalPlacement] = useState("top-right");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      salary: parseInt(formData.salary, 10),
      dateofbirth: formData.dateofbirth
        ? new Date(formData.dateofbirth).toISOString()
        : null,
      Starttime: formData.Starttime
        ? `1970-01-01T${formData.Starttime}:00Z`
        : null,
      Endtime: formData.Endtime ? `1970-01-01T${formData.Endtime}:00Z` : null,
    };

    try {
      const response = await axios.patch(
        `${Url}/employees/${employee.id}`,
        formattedData,
        {
          headers: {
            "ngrok-skip-browser-warning": "abc",
          },
        }
      );
      console.log(response.data);

      setFormData({
        Name: "",
        email: "",
        role: "",
        Phonenumber: "",
        salary: "",
        dateofbirth: "",
        Starttime: "",
        Endtime: "",
        Address: "",
        Details: "",
      });

      close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      show={onOpen}
      dismissible
      size="md"
      onClose={close}
      position={modalPlacement}
      className="w-popup h-full bg-bg"
    >
      <Modal.Header closeButton={true} className="bg-bg" />
      <Modal.Body className="bg-bg">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-white text-center dark:text-white">
            Update Staff
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="Name" value="Full Name" className="text-white" />
              <input
                id="Name"
                placeholder="Enter full name"
                value={formData.Name}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" className="text-white" />
              <input
                id="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label htmlFor="role" value="Role" className="text-white" />
              <select
                id="role"
                placeholder="Select role"
                value={formData.role}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              >
                <option value="">Select role</option>
                <option value="MANAGER">MANAGER</option>
                <option value="STAFF">STAFF</option>
              </select>
            </div>
            <div>
              <Label
                htmlFor="Phonenumber"
                value="Phone Number"
                className="text-white"
              />
              <input
                id="Phonenumber"
                placeholder="Enter phone number"
                value={formData.Phonenumber}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label htmlFor="salary" value="Salary" className="text-white" />
              <input
                id="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="dateofbirth"
                value="Date of Birth"
                className="text-white"
              />
              <input
                id="dateofbirth"
                type="date"
                placeholder="Enter date of birth"
                value={formData.dateofbirth}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="Starttime"
                value="Shift Start Timing"
                className="text-white"
              />
              <input
                id="Starttime"
                type="time"
                placeholder="Enter start timing"
                value={formData.Starttime}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="Endtime"
                value="Shift End Timing"
                className="text-white"
              />
              <input
                id="Endtime"
                type="time"
                placeholder="Enter end timing"
                value={formData.Endtime}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="Address" value="Address" className="text-white" />
              <input
                id="Address"
                placeholder="Enter address"
                value={formData.Address}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div className="col-span-2">
              <Label
                htmlFor="Details"
                value="Additional Details"
                className="text-white"
              />
              <textarea
                id="Details"
                placeholder="Enter additional details"
                value={formData.Details}
                onChange={handleChange}
                required
                className="bg-input h-20 p-3 rounded-md w-full"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button title="Confirm" onClick={handleSubmit} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modalformupdate;
