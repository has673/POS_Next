"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";

const page = ({ params }) => {
  const { id } = params;
  let reservation;
  const get = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/reservatons/${id}`);
      reservation = res.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <div className="text-white bg-black w-full">
      <div>
        <img src="table.png" className="w-img h-img"></img>
      </div>
    </div>
  );
};

export default page;
