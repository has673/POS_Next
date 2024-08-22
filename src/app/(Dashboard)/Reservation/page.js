"use client";
import React, { useEffect, useState } from "react";
import Subheading from "../../Components/Subheading";
import axios from "axios";
import ReservationCard from "@/app/Components/reservationCard";
import { Spin } from "antd";
import Button from "@/app/Components/Button";

const page = () => {
  const [loading, setLoading] = useState(false);
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
        >
          Add Reservation
        </button>
      </div>
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
