import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ reservations }) => {
  // Map reservations to events
  const events = (reservations || []).map((reservation) => {
    const title = reservation.tableNumber
      ? `Table ${reservation.tableNumber} - Floor ${reservation.floor}`
      : "Reservation";

    const start = reservation.reservationTime
      ? new Date(reservation.reservationDate).toLocaleDateString()
      : new Date();

    const end = reservation.reservationEndTime
      ? new Date(reservation.reservationEndTime).toLocaleDateString()
      : moment(start).add(1, "hours").toDate();

    console.log(start);
    return {
      id: reservation.id || Math.random(), // Provide a default id if id is missing
      title,
      start,
      end,
    };
  });

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white text-black">
      <Calendar
        localizer={localizer}
        events={events} // Pass events array
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView={"month"}
        toolbar={true}
      />
    </div>
  );
};

export default MyCalendar;
