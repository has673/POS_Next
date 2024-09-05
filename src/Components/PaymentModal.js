"use client";
import { useState } from "react";
import axios from "axios";
import { Modal, ModalBody } from "flowbite-react";
import { loadStripe } from "@stripe/stripe-js";

const PaymentModal = ({ open, close, order }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [postcode, setPostcode] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!order) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:4000/stripe/${order.id}`,
        { amount: amount }
      );
      setClientSecret(response.data.clientSecret);

      const stripe = await loadStripe(
        "pk_test_51Pva7W08hJPE4rWMbqMdDgrMA5OFvgD0GzoQ1Ai5cHKIKMvxRbf986vpGcFDNsVa8PihJKPkHfRi6JSmvY3ye31700QpCD6UOJ"
      ); // Replace with your Stripe public key

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: cardNumber,
            exp_month: parseInt(expiryDate.split("/")[0], 10),
            exp_year: parseInt(expiryDate.split("/")[1], 10),
            cvc: "123", // Dummy CVC for testing
          },
          billing_details: {
            address: {
              postal_code: postcode,
            },
          },
        },
      });

      if (error) {
        console.error("Payment failed:", error);
      } else {
        console.log("Payment succeeded");
        close(); // Close the modal after payment
      }
    } catch (err) {
      console.error("Error processing payment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={open}
      onClose={close}
      size="md"
      dismissible
      className="w-popup h-2/3 shadow-sm z-10 text-white"
    >
      <Modal.Header closeButton={true} className="bg-bg">
        Payment for Order #{order?.id}
      </Modal.Header>
      <ModalBody className="bg-bg p-4">
        <h5>Bill : {order?.totalPrice}</h5>

        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-xs font-medium text-gray-300"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-2/3 p-2 border border-gray-300 rounded-md bg-input text-white"
              placeholder="Enter card number"
            />
          </div>
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-xs font-medium text-gray-300"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-2/3 p-2 border border-gray-300 rounded-md bg-input text-white"
              placeholder="Enter card number"
            />
          </div>
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-xs font-medium text-gray-300"
            >
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="mt-1 block w-2/3 p-2 border border-gray-300 rounded-md bg-input text-white"
              placeholder="Enter expiry date"
            />
          </div>
          <div>
            <label
              htmlFor="postcode"
              className="block text-xs font-medium text-gray-300"
            >
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="mt-1 block w-2/3 p-2 border border-gray-300 rounded-md bg-input text-white"
              placeholder="Enter postcode"
            />
          </div>
        </div>
      </ModalBody>
      <Modal.Footer className="bg-bg flex justify-center">
        <button
          onClick={handlePayment}
          className="bg-pink text-black px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
