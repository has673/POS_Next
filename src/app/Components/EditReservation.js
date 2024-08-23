"use client";
import { Modal, Label } from "flowbite-react";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";

const EditReservation = ({ open, close, reservation, customer }) => {
  // const { id } = reservation;

  // const [reservationId, setReservationId] = useState(reservation.id);
  const [reservationData, setReservationData] = useState({
    customer: {
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
    },
    reservation: {
      tableNumber: 0,
      paxNumber: 0,
      reservationDate: "",
      reservationTime: "",
      depositFee: 0,
      status: "",
      floor: 0,
      paymentMethod: "",
    },
  });

  console.log(reservation);
  let id;
  if (reservation) {
    id = reservation.id;
  }

  // Update state based on props
  useEffect(() => {
    if (reservation && customer) {
      setReservationData({
        reservation: {
          tableNumber: reservation.tableNumber || "",
          reservationDate: reservation.reservationDate || "",
          reservationTime: reservation.reservationTime || "",
          paxNumber: reservation.paxNumber || "",
          depositFee: reservation.depositFee || "",
          status: reservation.status || "",
          floor: reservation.floor || "",
          paymentMethod: reservation.paymentMethod || "",
        },
        customer: {
          fullName: customer.fullName || "",
          phoneNumber: customer.phoneNumber || "",
          emailAddress: customer.emailAddress || "",
        },
      });
    }
  }, [reservation, customer]);

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return ""; // If dateString is empty or undefined, return an empty string

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Function to format time to HH:MM
  const formatTime = (dateString) => {
    if (!dateString) return ""; // If dateString is empty or undefined, return an empty string

    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  // Handle changes to inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    const [parent, child] = id.split(".");
    setReservationData((prevData) => ({
      ...prevData,
      [parent]: {
        ...prevData[parent],
        [child]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    // Handle form submission logic here
    console.log(reservationData);

    e.preventDefault();

    try {
      const parsedData = {
        tableNumber: Number(reservationData.reservation.tableNumber),
        floor: Number(reservationData.reservation.floor),
        reservationDate: reservationData.reservation.reservationDate
          ? new Date(reservationData.reservation.reservationDate).toISOString()
          : null,
        // reservationTime: reservationData.reservationTime
        //   ? `1970-01-01T${reservationData.reservationTime}:00Z`
        //   : null,
        reservationTime: reservationData.reservation.reservationTime
          ? reservationData.reservation.reservationTime // Assuming reservationTime is in HH:mm:ss format
          : null,
        depositFee: reservation.depositFee,
        status: reservationData.status,
        paymentMethod: reservationData.paymentMethod,
      };

      const res = await axios.put(
        `http://localhost:4000/reservaton/${id}`,
        parsedData
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      show={open}
      dismissible
      size="md"
      onClose={close}
      position="center"
      className="w-popup h-2/3 bg-bg"
    >
      <Modal.Header closeButton={true} className="bg-bg" />
      <Modal.Body className="bg-bg">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-white text-center dark:text-white">
            Edit Reservation
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="reservation.tableNumber"
                value="Table"
                className="text-white"
              />
              <select
                id="reservation.tableNumber"
                value={reservationData.reservation.tableNumber}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              >
                <option value="">Select Table</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="col-span-1">
              <Label
                htmlFor="reservation.floor"
                value="Floor"
                className="text-white"
              />
              <select
                id="reservation.floor"
                value={reservationData.reservation.floor}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              >
                <option value="">Select floor</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <Label
                htmlFor="reservation.reservationDate"
                value="Reservation Date"
                className="text-white"
              />
              <input
                id="reservation.reservationDate"
                type="date"
                value={formatDate(reservationData.reservation.reservationDate)}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="reservation.reservationTime"
                value="Reservation Time"
                className="text-white"
              />
              <input
                id="reservation.reservationTime"
                type="time"
                value={formatTime(reservationData.reservation.reservationTime)}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="reservation.status"
                value="Status"
                className="text-white"
              />
              <input
                id="reservation.status"
                type="text"
                value={reservationData.reservation.status}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="reservation.depositFee"
                value="Deposit Fee"
                className="text-white"
              />
              <input
                id="reservation.depositFee"
                type="number"
                value={reservationData.reservation.depositFee}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
          </div>
          <hr />
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-white text-center dark:text-white">
            Customer Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="customer.fullName"
                value="Full Name"
                className="text-white"
              />
              <input
                id="customer.fullName"
                type="text"
                value={reservationData.customer.fullName}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="customer.phoneNumber"
                value="Phone Number"
                className="text-white"
              />
              <input
                id="customer.phoneNumber"
                type="text"
                value={reservationData.customer.phoneNumber}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="customer.emailAddress"
                value="Email Address"
                className="text-white"
              />
              <input
                id="customer.emailAddress"
                type="email"
                value={reservationData.customer.emailAddress}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="reservation.paymentMethod"
                value="Payment Method"
                className="text-white"
              />
              <input
                id="reservation.paymentMethod"
                type="text"
                value={reservationData.reservation.paymentMethod}
                onChange={handleChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>
          </div>
          <hr />
          <div className="mt-4 flex justify-center">
            <Button title="Edit" onClick={handleSubmit} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditReservation;
