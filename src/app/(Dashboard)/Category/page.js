"use client";
import Button from "@/app/Components/Button";
import CategoryCard from "@/app/Components/CategoryCard";
import Subheading from "@/app/Components/Subheading";
import { Modal, Label } from "flowbite-react";
import React, { useState } from "react";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    menu: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/categories",
        formData
      );
      console.log(response.data);

      setFormData({
        name: "",
        menu: "",
        description: "",
      });

      closeModal();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="text-white bg-black w-full p-4">
      <div className="flex justify-between">
        <Subheading title="Categories" />
        <button
          id="button"
          className="bg-pink h-15 w-auto p-2 rounded-sm text-black"
          onClick={openModal}
        >
          Add New Category
        </button>
      </div>
      <Modal
        show={isModalOpen}
        dismissible
        size="md"
        onClose={closeModal}
        position="center"
        className="w-popup h-1/2 bg-bg"
      >
        <Modal.Header closeButton={true} className="bg-bg" />
        <Modal.Body className="bg-bg">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white text-center dark:text-white">
              Add New Category
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="Name" value="Name" className="text-white" />
                <input
                  id="Name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                />
              </div>

              <div className="col-span-1">
                <Label
                  htmlFor="description"
                  value="descriptiom"
                  className="text-white"
                />
                <textarea
                  id="descriprion"
                  placeholder="Enter Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="bg-input h-auto p-3 rounded-md w-full"
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="menu" value="Menu" className="text-white" />
                <select
                  id="menu"
                  placeholder="Select menu"
                  value={formData.menu}
                  onChange={handleChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                >
                  <option value="">Select role</option>
                  <option value="NORMAL">Normal</option>
                  <option value="STAFF">STAFF</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Button title="Confirm" onClick={handleSubmit} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <CategoryCard />
    </div>
  );
};

export default page;
