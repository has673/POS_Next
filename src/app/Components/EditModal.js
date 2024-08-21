"use client";
import React, { useState, useEffect } from "react";
import { Modal, Label } from "flowbite-react";
import Button from "./Button";
import axios from "axios";

const EditModal = ({ onOpen, onClose, item }) => {
  const [edititemData, setEditItemData] = useState({
    photo: "",
    name: "",
    price: 0,
    availability: "",
    category: "",
    description: "",
  });

  const handleEditItemChange = (e) => {
    const { id, value } = e.target;
    setEditItemData({ ...edititemData, [id]: value });
  };

  useEffect(() => {
    if (item) {
      setEditItemData({
        photo: item.photo || "",
        name: item.name || "",
        price: item.price || 0,
        availability: item.availability || "",
        category: item.category || "",
        description: item.description || "",
      });

      console.log(`the item data: ${edititemData}`);
    }
  }, [item]);
  const handleItemSubmit = async (e) => {
    console.log("item");
    e.preventDefault();

    try {
      constedititemDataToSend = new FormData();
      if (photo) {
        itemDataToSend.append("file", photo);
      }
      console.log(itemData.price);
      const item = edititemData.price;
      console.log(typeof item);
      itemDataToSend.append("name", edititemData.name);
      itemDataToSend.append("price", parseInt(item));
      itemDataToSend.append("description", edititemData.description);
      itemDataToSend.append("availability", edititemData.availability);
      itemDataToSend.append("categoryId", edititemData.category);
      console.log("PRICE : ", typeof itemDataToSend.price);
      console.log("Data Object : ", itemDataToSend);
      console.log("ITEM DATA: ", itemData);
      const response = await axios.put(
        "http://localhost:4000/items",
        itemDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setEditItemData({
        photo: "",
        name: "",
        price: 0,
        availability: "",
        category: "",
        description: "",
      });
      getitems();
      closeitemModal();
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data);
      } else if (err.request) {
        console.error("Error request:", err.request);
      } else {
        console.error("Error:", err.message);
      }
    }
  };

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
            Edit New Item
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" value="Name" className="text-white" />
              <input
                id="name"
                placeholder="Enter name"
                value={edititemData.name}
                onChange={handleEditItemChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full text-white"
              />
            </div>

            <div>
              <Label htmlFor="Price" value="Price" className="text-white" />
              <input
                id="price"
                placeholder="Enter Price"
                value={edititemData.price}
                onChange={handleEditItemChange}
                required
                type="number"
                className="bg-input h-12 p-3 rounded-md w-full"
              />
            </div>

            <div className="col-span-2">
              <Label
                htmlFor="description"
                value="Description"
                className="text-white"
              />
              <textarea
                id="description"
                placeholder="Enter description"
                value={edititemData.description}
                onChange={handleEditItemChange}
                required
                className="bg-input h-auto p-3 rounded-md w-full"
              />
            </div>
            <div className="col-span-2">
              <Label
                htmlFor="menu"
                value="Availabilty"
                className="text-white"
              />
              <select
                id="`availability"
                placeholder="Select Availabilty"
                value={edititemData.availabilty}
                onChange={handleEditItemChange}
                required
                className="bg-input h-12 p-3 rounded-md w-full"
              >
                <option value="">Select availabilty</option>
                <option value="IN_STOCK">In Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button title="Confirm" onClick={handleItemSubmit} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
