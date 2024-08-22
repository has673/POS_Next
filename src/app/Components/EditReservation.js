"use client";
import { Modal, Label } from "flowbite-react";

import React, { useEffect, useState } from "react";

const EditReservation = (onOpen, onClose, reseration, customer) => {
  return (
    <Modal
      show={onOpen}
      dismissible
      size="md"
      onClose={onClose}
      position="center"
      className="w-popup h-2/3 bg-bg"
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
  );
};

export default EditReservation;
