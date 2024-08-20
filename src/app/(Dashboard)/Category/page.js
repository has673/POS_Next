"use client";
import Button from "@/app/Components/Button";
import CategoryCard from "@/app/Components/CategoryCard";
import Subheading from "@/app/Components/Subheading";
import { Modal, Label } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    icon: "",
    name: "",
    menu: "",
    description: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("icon", formData.icon);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("menu", formData.menu);
      formDataToSend.append("description", formData.description);

      const response = await axios.post(
        "http://localhost:4000/categories",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      setFormData({
        icon: "",
        name: "",
        menu: "",
        description: "",
      });

      closeModal();
      // Optionally, refresh categories after submission
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:4000/categories");
      setCategories(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      <Spin spinning={loading} size="loading" indicator="green">
        {" "}
        <div className="mt-6 flex justify-center gap-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Spin>

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
                <Label htmlFor="icon" value="Icon" className="text-white" />
                <input
                  id="icon"
                  placeholder="Select an icon"
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.files[0] })
                  }
                  required
                  type="file"
                  className="bg-input h-20 w-auto p-3 rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="name" value="Name" className="text-white" />
                <input
                  id="name"
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
                  value="Description"
                  className="text-white"
                />
                <textarea
                  id="description"
                  placeholder="Enter description"
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
                  <option value="">Select menu</option>
                  <option value="NORMAL">Normal</option>
                  <option value="STAFF">Staff</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Button title="Confirm" onClick={handleSubmit} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page;
