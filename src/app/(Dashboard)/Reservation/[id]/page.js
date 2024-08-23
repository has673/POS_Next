"use client";
import Button from "@/app/Components/Button";
import EditReservation from "@/app/Components/EditReservation";
import { Spin } from "antd";
import axios from "axios";
import { Modal, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { id } = params || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch reservation by ID
  const get = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/reservaton/${id}`);
      setReservation(res.data);
      setCustomerId(res.data.customerId); // Set customerId after fetching reservation
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

      const res = await axios.put(
        `http://localhost:4000/reservaton${id}`,
        parsedData
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // Fetch customer by ID
  const getCustomer = async (customerId) => {
    setLoadingCustomer(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/customer/${customerId}`
      );
      setCustomer(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingCustomer(false);
    }
  };

  // Fetch reservation when component mounts
  useEffect(() => {
    get(id);
  }, []);

  // Fetch customer when customerId is available
  useEffect(() => {
    if (customerId) {
      getCustomer(customerId);
    }
  }, [customerId]);

  const openModal = () => {
    setSelectedCustomer(customer);
    setSelectedReservation(reservation);
    setIsModalOpen(true);
    console.log(selectedCustomer);
  };
  const closeModal = () => {
    setSelectedCustomer(null);
    setSelectedReservation(null);
    setIsModalOpen(false);
  };
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

  return (
    <div className="text-white bg-black w-full">
      <div className="flex justify-center">
        <img src="/tb.png" className="w-img h-img mt-6" alt="Image" />
      </div>
      <h1 className="text-white ml-5 my-5 ">Reservation Details</h1>
      {reservation && (
        <Spin spinning={loading}>
          <div className="flex justify-center">
            <div className="w-4/5 bg-bg h-reservation mr-5 rounded-r-2xl rounded-l-2xl p-4 ">
              <div className="flex justify-between gap-4">
                <div>
                  <h4 className="text-pink">Table</h4>

                  <h5 className="text-white">{reservation.tableNumber}</h5>
                </div>

                <div>
                  <h4 className="text-pink">Floor</h4>
                  <h5 className="text-white">{reservation.floor}</h5>
                </div>
                <div>
                  <h4 className="text-pink">Guests</h4>
                  <h5 className="text-white">{reservation.paxNumber}</h5>
                </div>

                <div>
                  <h4 className="text-pink">Date</h4>
                  <h5 className="text-white">
                    {new Date(reservation.reservationDate).toLocaleDateString()}
                  </h5>
                </div>
                <div>
                  <h4 className="text-pink">Time</h4>
                  <h5 className="text-white">
                    {new Date(reservation.reservationTime).toLocaleTimeString()}
                  </h5>
                </div>
                <div>
                  <h4 className="text-pink">Fee</h4>
                  <h5 className="text-white">{reservation.depositFee}</h5>
                </div>
                <div>
                  <h4 className="text-pink">Status</h4>
                  <h5 className="text-white">{reservation.status}</h5>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      )}
      <h1 className="text-white ml-5 my-5 ">Customer Details</h1>
      {customer && (
        <Spin spinning={loadingCustomer}>
          <div className="flex justify-center">
            <div className="w-4/5 bg-bg h-reservation mr-5 rounded-r-2xl rounded-l-2xl p-4">
              <div className="flex justify-between gap-4">
                <div>
                  <h4 className="text-pink">Name</h4>

                  <h5 className="text-white">{customer.fullName}</h5>
                </div>

                <div>
                  <h4 className="text-pink">Email</h4>
                  <h5 className="text-white">{customer.emailAddress}</h5>
                </div>
                <div>
                  <h4 className="text-pink">Phone</h4>
                  <h5 className="text-white">{customer.phoneNumber}</h5>
                </div>

                <div>
                  <h4 className="text-pink">Payment Method</h4>
                  <h5 className="text-white">{reservation.paymentMethod}</h5>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      )}
      <div className="absolut bottom-0 flex justify-center mt-8">
        {" "}
        <Button title="Edit" onClick={openModal} />
      </div>
      <EditReservation
        open={isModalOpen}
        close={closeModal}
        reservation={selectedReservation}
        customer={customer}
      />
    </div>
  );
};

export default Page;
