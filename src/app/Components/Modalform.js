import { Modal, Label, Select } from "flowbite-react";
import React, { useState } from "react";
import Button from "./Button";

const Modalform = ({ onOpen, close }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [salary, setSalary] = useState("");
  const [dob, setDob] = useState("");
  const [startTiming, setStartTiming] = useState("");
  const [endTiming, setEndTiming] = useState("");
  const [address, setAddress] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [modalPlacement, setModalPlacement] = useState("top-right");

  const handleSubmit = () => {
    // Handle form submission logic here
    close(); // Close the modal after submission
    // Clear input fields if needed
    setName("");
    setEmail("");
    setRole("");
    setPhoneNumber("");
    setSalary("");
    setDob("");
    setStartTiming("");
    setEndTiming("");
    setAddress("");
    setAdditionalDetails("");
  };

  return (
    <Modal
      show={onOpen}
      dismissible
      size="md"
      onClose={close}
      position={modalPlacement}
      className="w-modal h-modal bg-bg"
    >
      <Modal.Header closeButton={true} className="bg-bg" />
      <Modal.Body className="bg-bg">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Add New Staff
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" value="Full Name" className="text-white" />
              <input
                id="name"
                placeholder="Enter full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="bg-input h-12 p-3 rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" className="text-white" />
              <input
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="bg-input h-12 p-3 rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="role" value="Role" className="text-white" />
              <Select
                id="role"
                placeholder="Select role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                required
                className="bg-input h-12 p-3 rounded-md"
              >
                <option value="">Select role</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="phoneNumber"
                value="Phone Number"
                className="text-white"
              />
              <input
                id="phoneNumber"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
                className="bg-input h-12 p-3 rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="salary" value="Salary" className="text-white" />
              <input
                id="salary"
                placeholder="Enter salary"
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                required
                className="bg-input h-12 p-3 rounded-md"
              />
            </div>

            <div>
              <Label
                htmlFor="dob"
                value="Date of Birth"
                className="text-white"
              />
              <input
                id="dob"
                type="date"
                placeholder="Enter date of birth"
                value={dob}
                onChange={(event) => setDob(event.target.value)}
                required
                className="bg-input h-12 p-3 rounded-md"
              />
            </div>

            <div>
              <Label
                htmlFor="startTiming"
                value="Shift Start Timing"
                className="text-white"
              />
              <input
                id="startTiming"
                type="time"
                placeholder="Enter start timing"
                value={startTiming}
                onChange={(event) => setStartTiming(event.target.value)}
                required
                className="bg-input h-12 p-3 rounded-md"
              />
            </div>

            <div>
              <Label
                htmlFor="endTiming"
                value="Shift End Timing"
                className="text-white"
              />
              <input
                id="endTiming"
                type="time"
                placeholder="Enter end timing"
                value={endTiming}
                onChange={(event) => setEndTiming(event.target.value)}
                required
                className="bg-input h-12 p-3 rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="address" value="Address" />
              <input
                id="address"
                placeholder="Enter address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
                className="bg-input h-12 w-96 p-3 rounded-md"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="additionalDetails" value="Additional Details" />
            <input
              id="additionalDetails"
              placeholder="Enter additional details"
              value={additionalDetails}
              onChange={(event) => setAdditionalDetails(event.target.value)}
              required
              className="bg-input h-20 w-full p-3 rounded-md"
            />
          </div>

          <div className="mt-4 flex justify-center">
            <Button title="Confirm" onClick={handleSubmit} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modalform;
