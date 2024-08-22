"use client";
import React, { useEffect, useState } from "react";
import Subheading from "../../Components/Subheading";
import axios from "axios";
import ReservationCard from "@/app/Components/reservationCard";

import { Spin } from "antd";
import { Label, Modal } from "flowbite-react";
import Button from "@/app/Components/Button";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reservationData, setReservationData] = useState({
    customer: {
      title: "",
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
  const [reservations, setReservations] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleChange = (e) => {
    const { id, value } = e;
    setReservationData({ ...reservationData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/reservaton",
        reservationData
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getReservtion = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/reservaton");
      console.log(response);
      setReservations(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getReservtion();
  }, []);
  return (
    <div className="bg-black w-full text-white p-4">
      <div className="flex justify-between">
        <Subheading title="Reservation" />
        <button
          id="button"
          className="bg-pink h-15 w-auto p-2 rounded-sm text-black"
          onClick={openModal}
        >
          Add Reservation
        </button>
      </div>
      <Modal
        show={isModalOpen}
        dismissible
        size="md"
        onClose={closeModal}
        position="center"
        className="w-popup h-full bg-bg"
      >
        <Modal.Header closeButton={true} className="bg-bg" />
        <Modal.Body className="bg-bg">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white text-center dark:text-white">
              Add Reservation
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="table" value="Table" className="text-white" />
                <select
                  id="table"
                  placeholder="Select table"
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
                <Label htmlFor="floor" value="floor" className="text-white" />
                <select
                  id="floor"
                  placeholder="Select floor"
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
                  htmlFor="reservatonDate"
                  value="Reservation Date"
                  className="text-white"
                />
                <input
                  id="reservationDate"
                  type="date"
                  placeholder="Enter start timing"
                  value={reservationData.reservation.reservationDate}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="reservationTime"
                  value="Reservation Time"
                  className="text-white"
                />
                <input
                  id="reservationtime"
                  type="time"
                  placeholder="Enter reservation timing"
                  value={reservationData.reservation.reservationTimeEndtime}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Label htmlFor="Status" value="Status" className="text-white" />
                <input
                  id="Status"
                  type="number"
                  placeholder="Status"
                  value={reservationData.reservation.status}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="Deposit Fee"
                  value="Deposit Fee"
                  className="text-white"
                />
                <input
                  id="despositFee"
                  type="number"
                  placeholder="Fee"
                  value={reservationData.reservation.depositFee}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
            </div>
            <hr></hr>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white text-center dark:text-white">
              Customer Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="Full Name"
                  value="fullName"
                  className="text-white"
                />
                <input
                  id="fullName"
                  type="string"
                  placeholder="Enter Full Name"
                  value={reservationData.customer.fullName}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="Phone Number"
                  value="PhoneNumber"
                  className="text-white"
                />
                <input
                  id="phoneNumber"
                  type="string"
                  placeholder="PhoneNumber"
                  value={reservationData.customer.phoneNumber}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Label htmlFor="Pa" value="Status" className="text-white" />
                <input
                  id="Status"
                  type="number"
                  placeholder="Status"
                  value={reservationData.reservation.status}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
              <div>
                <Label
                  htmlFor="Payment Method"
                  value="paymentMethod"
                  className="text-white"
                />
                <input
                  id="paymentMethod"
                  type="string"
                  placeholder="Fee"
                  value={reservationData.reservation.paymentMethod}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
            </div>
            <hr></hr>

            <div className="mt-4 flex justify-center">
              <Button title="Confirm" onClick={handleSubmit} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Spin spinning={loading}>
        {reservations.map((reservation) => {
          return (
            <ReservationCard key={reservation.id} reservation={reservation} />
          );
        })}
      </Spin>
    </div>
  );
};

export default page;
