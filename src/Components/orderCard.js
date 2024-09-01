import React from "react";
import { LuPen } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-bg w-22vw rounded-sm ml-3 h-auto">
      <div className="flex justify-between gap-2">
        <div className="flex justify-center gap-2">
          <h2 className="bg-pink rounded-sm text-black w-auto p-1.5 m-1 h-2/3 ml-2 ">
            {order.id}
          </h2>
          <div>
            <p>Customer</p>
            <p className="text-xs">Order # 11</p>
          </div>
        </div>
        <div>
          <div className="bg-green text-black text-center text-xs w-5/6 mt-3 rounded-sm">
            status
          </div>
          <select
            id="status"
            // value={status}
            // onChange={handleChange}
            required
            className=" rounded-md bg-bg mr-3 text-xs"
          >
            <option value="IN_PROCESS">In Process</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="READY">Ready</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between my-2 mx-2 text-white text-sm ">
        <p>
          {" "}
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "N / A"}
        </p>
        <p>
          {" "}
          {order.createdAt
            ? new Date(order.createdAt).toLocaleTimeString()
            : "N / A"}
        </p>
      </div>
      <hr></hr>
      <div className="flex justify-between gap-2 text-white text-xs">
        <div className="flex justify-center gap-2">
          <h2 className="ml-2">Qty</h2>

          <p>items</p>
        </div>
        <div>
          <div className="text-white mr-3  ">price</div>
        </div>
      </div>
      {order.orderItems && order.orderItems.length > 0 ? (
        order.orderItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between gap-2 text-white text-xs px-2 py-1"
          >
            <div className="flex justify-start gap-2">
              <h2 className="ml-2">{item.quantity}</h2>
              <p>{item.name}</p>
            </div>
            <div>
              <div className="text-white mr-3">{item.price}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-xs text-white py-2">
          No items in order
        </div>
      )}

      <hr></hr>
      <div className="flex justify-between gap-3 text-xs mt-3">
        <h4 className="mx-3"> Sub Total</h4>
        <h4 className="mx-3">{order.totalPrice}</h4>
      </div>
      <div className="flex justify-center gap-2 my-3">
        <div className="w-1/5 border-2 border-pink p-2  flex justify-center items-center rounded-md ">
          <LuPen className="text-pink " />
        </div>
        <div className="w-1/5 border-2 border-pink flex justify-center items-center  rounded-md ">
          <MdDelete className="text-pink" />
        </div>
        <button className="bg-pink rounded-md text-center text-black p-2 w-5/12">
          Pay Bill
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
