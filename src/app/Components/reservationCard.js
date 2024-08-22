import React from "react";

const ReservationCard = ({ reservation }) => {
  return (
    <div
      id="card"
      className="w-catCard h-catCard bg-dark p-3 rounded-md cursor-pointer"
    >
      <p>{reservation.tableNumber}</p>
      <p>{reservation.floor}</p>
    </div>
  );
};

export default ReservationCard;
