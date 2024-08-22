"use client";
import React, { useEffect, useState } from "react";
import Subheading from "../../Components/Subheading";
import axios from "axios";
import ReservationCard from "@/app/Components/reservationCard";
import { Spin } from "antd";
import { Label, Modal } from "flowbite-react";
import Button from "@/app/Components/Button";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const [reservations, setReservations] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const [parent, child] = id.split(".");
    if (parent === "reservation" || parent === "customer") {
      setReservationData({
        ...reservationData,
        [parent]: {
          ...reservationData[parent],
          [child]: value,
        },
      });
    } else {
      setReservationData({
        ...reservationData,
        [id]: value,
      });
    }
  };

  const handleClick = (id) => {
    router.push(`Reservation/${id}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedData = {
        ...reservationData,
        reservation: {
          tableNumber: Number(reservationData.reservation.tableNumber),
          floor: Number(reservationData.reservation.floor),
          reservationDate: reservationData.reservation.reservationDate
            ? new Date(
                reservationData.reservation.reservationDate
              ).toISOString()
            : null,
          reservationTime: reservationData.reservation.reservationTime
            ? `1970-01-01T${reservationData.reservation.reservationTime}:00Z`
            : null,
        },
      };

      const res = await axios.post(
        "http://localhost:4000/reservaton",
        parsedData
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getReservations = async () => {
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
    getReservations();
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
                <Label
                  htmlFor="reservation.tableNumber"
                  value="Table"
                  className="text-white"
                />
                <select
                  id="reservation.tableNumber"
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
                <Label
                  htmlFor="reservation.floor"
                  value="Floor"
                  className="text-white"
                />
                <select
                  id="reservation.floor"
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
                  htmlFor="reservation.reservationDate"
                  value="Reservation Date"
                  className="text-white"
                />
                <input
                  id="reservation.reservationDate"
                  type="date"
                  placeholder="Enter reservation date"
                  value={reservationData.reservation.reservationDate}
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
                  placeholder="Enter reservation time"
                  value={reservationData.reservation.reservationTime}
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
                  type="string"
                  placeholder="Status"
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
                  placeholder="Fee"
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
                  placeholder="Enter Full Name"
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
                  placeholder="Phone Number"
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
                  placeholder="Email Address"
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
                  placeholder="Payment Method"
                  value={reservationData.reservation.paymentMethod}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>
            </div>
            <hr />

            <div className="mt-4 flex justify-center">
              <Button title="Confirm" onClick={handleSubmit} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Spin spinning={loading}>
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onClick={() => handleClick(reservation.id)}
          />
        ))}
      </Spin>
    </div>
  );
};

export default Page;
