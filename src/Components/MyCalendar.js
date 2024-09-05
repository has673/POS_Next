import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ reservations }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("day");

  // Handle day navigation
  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  // Handle view change (optional, since you want to focus on the "day" view)
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  const MIN_TIME = new Date();
  MIN_TIME.setHours(12, 0, 0, 0); // Set minimum time to 08:00 AM

  const MAX_TIME = new Date();
  MAX_TIME.setHours(22, 0, 0, 0);
  // Filter reservations for the currently viewed day
  const filteredReservations = (reservations || []).filter(
    (reservation) =>
      new Date(reservation.reservationDate).toLocaleDateString() ===
      new Date(currentDate).toLocaleDateString()
  );

  // Map filtered reservations to events
  const events = filteredReservations.map((reservation) => {
    const title = `TF-${reservation.tableNumber}  Floor-${reservation.floor}`;
    const start = new Date(reservation.reservationTime);
    const end = reservation.reservationEndTime
      ? new Date(reservation.reservationEndTime)
      : moment(start).add(1, "hour").toDate();

    return {
      id: reservation.id,
      title,
      start,
      end,
    };
  });

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white text-black my-5 ">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        view={currentView}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        date={currentDate}
        toolbar={true}
        defaultView="day"
        min={MIN_TIME} // Set minimum time limit
        max={MAX_TIME}
      />
    </div>
  );
};

export default MyCalendar;
