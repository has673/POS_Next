"use client";
import Button from "@/Components/Button";
import CategoryCard from "@/Components/CategoryCard";
import Subheading from "@/Components/Subheading";
import { Modal, Label } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Table } from "antd";
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import EditModal from "@/Components/EditModal";

const Page = () => {
  const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isitemModalOpen, setIsItemModalOpen] = useState(false);
  const [iseditModalOpen, setIsEditModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    icon: "",
    name: "",
    menu: "",
    description: "",
  });
  const [itemData, setItemData] = useState({
    photo: "",
    name: "",
    price: 0,
    availability: "",
    categoryId: 0,
    description: "",
  });

  const [edititemData, setEditItemData] = useState({
    photo: "",
    name: "",
    price: 0,
    availability: "",
    categoryId: 0,
    description: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openitemModal = () => setIsItemModalOpen(true);
  const closeitemModal = () => setIsItemModalOpen(false);

  const openeditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };
  const closeeditModal = () => {
    setSelectedItem(null);
    setIsEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleItemChange = (e) => {
    const { id, value } = e.target;
    console.log(
      "I AM GETTING CANGED : ",
      id,
      "---------------",
      value,
      typeof value
    );
    setItemData({ ...itemData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (photo) {
        formDataToSend.append("file", photo);
      }

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
      fetchCategories();
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error("Error request:", err.request);
      } else {
        // Something else triggered the error
        console.error("Error:", err.message);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${Url}/categories`);
      setCategories(result.data);
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // End loading
    }
  };
  const getitems = async () => {
    try {
      setLoadingItem(true);
      const res = await axios.get(`${Url}/items`);
      setItems(res.data);
      console.log("-------------ss-s-s-", res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingItem(false);
    }
  };
  useEffect(() => {
    fetchCategories();
    getitems();
  }, []);

  const itemsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);
  // console.log(items.length);
  // Slice the data to display only the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = items.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onRemove = async (id) => {
    try {
      const res = axios.delete(`http://localhost:4000/items/${id}`);
      console.log(res.data);
      getitems();
    } catch (err) {
      console.log(err);
    }
  };
  const handleItemSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("ITEM DATA: ", itemData);
      console.log(categories);
      const parsedData = {
        ...itemData,
        price: Number(itemData.price),
        categoryId: Number(itemData.categoryId),
      };
      const response = await axios.post(
        "http://localhost:4000/items",
        parsedData
      );

      console.log(response.data);

      setItemData({
        photo: "",
        name: "",
        price: 0,
        availability: "",
        categoryId: 0,
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

  const handleEditItemChange = (e) => {
    const { id, value } = e.target;
    setEditItemData({ ...edititemData, [id]: value });
  };

  useEffect(() => {
    if (selectedItem) {
      setEditItemData({
        photo: selectedItem.photo || "",
        name: selectedItem.name || "",
        price: selectedItem.price || 0,
        availability: selectedItem.availability || "",
        categoryId: selectedItem.categoryId || 0,
        description: selectedItem.description || "",
      });

      console.log(`the item data: ${edititemData}`);
    }
  }, [selectedItem]);

  const editSubmit = async (e) => {
    console.log(selectedItem.id);
    console.log("item");
    e.preventDefault();

    try {
      // if (photo) {
      //   edititemDataToSend.append("file", photo);
      // }
      console.log("update", itemData.price);

      const parsedData = {
        ...edititemData,
        price: Number(edititemData.price),
        categoryId: Number(edititemData.categoryId),
      };

      console.log("ITEM DATA: ", edititemData);
      const response = await axios.patch(
        `http://localhost:4000/items/${selectedItem.id}`,
        parsedData
      );

      console.log(response.data);
      getitems();

      setEditItemData({
        photo: "",
        name: "",
        price: 0,
        availability: "",
        categoryId: 0,
        description: "",
      });

      closeeditModal();
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
        <div className="mt-6 flex justify-center gap-8">
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
        className="w-popup h-full bg-bg"
      >
        <Modal.Header closeButton={true} className="bg-bg" />
        <Modal.Body className="bg-bg">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white text-center dark:text-white">
              Add New Category
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="block text-white font-semibold mb-2"
                >
                  Icon
                </label>
                <input
                  type="file"
                  id="icon"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
                  <option value="SPECIAL">SPECIAL</option>
                  <option value="NEWYEAR">NEWYEAR</option>
                  <option value="DESSERT">DESSERTS</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Button title="Confirm" onClick={handleSubmit} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex justify-between mt-8">
        <Subheading title="MenuItems" />
        <button
          id="button"
          className="bg-pink h-15 w-auto p-2 rounded-sm text-black mr-6"
          onClick={openitemModal}
        >
          Add New Item
        </button>
      </div>
      <Modal
        show={isitemModalOpen}
        dismissible
        size="md"
        onClose={closeitemModal}
        position="center"
        className="w-popup h-2/3 bg-bg"
      >
        <Modal.Header closeButton={true} className="bg-bg" />
        <Modal.Body className="bg-bg">
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-white text-center dark:text-white">
              Add New Item
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" value="Name" className="text-white" />
                <input
                  id="name"
                  placeholder="Enter name"
                  value={itemData.name}
                  onChange={handleItemChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full text-white"
                />
              </div>

              <div>
                <Label htmlFor="Price" value="Price" className="text-white" />
                <input
                  id="price"
                  placeholder="Enter Price"
                  value={itemData.price}
                  onChange={handleItemChange}
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
                  value={itemData.description}
                  onChange={handleItemChange}
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
                  id="availability"
                  placeholder="Select Availabilty"
                  value={itemData.availability}
                  onChange={handleItemChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                >
                  <option value="">Select availabilty</option>
                  <option value="IN_STOCK">In Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>
              </div>

              <div className="col-span-2">
                <Label
                  htmlFor="category"
                  value="Category"
                  className="text-white"
                />
                <select
                  id="categoryId"
                  placeholder="Select Category"
                  value={itemData.categoryId} // Assuming you want to store the selected category in itemData.category
                  onChange={handleItemChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}{" "}
                      {/* Assuming each category has a name property */}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Button title="Confirm" onClick={handleItemSubmit} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Spin spinning={loadingItem}>
        {items.length > 0 ? (
          <div className="relative">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg mt-6">
              <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Availability
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr
                    key={item.id} // Make sure each item has a unique id
                    className={`border-b text-white dark:border-gray-700 ${
                      index % 2 === 0 ? "bg-bg" : "bg-input"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">
                      {item.availability === "IN_STOCK"
                        ? "In Stock"
                        : "Out of Stock"}
                    </td>
                    <td className="px-6 py-4">Category</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => {
                          onRemove(item.id);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <MdDelete />
                      </button>
                      <button
                        onClick={() => {
                          openeditModal(item);
                        }}
                        className="text-white hover:text-red-300 ml-5"
                      >
                        <LuPencil />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-around gap-3">
              <div>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">No items available</p>
        )}
      </Spin>{" "}
      <Modal
        show={iseditModalOpen}
        dismissible
        size="md"
        onClose={closeeditModal}
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
                  htmlFor="Availabilty"
                  value="Availabilty"
                  className="text-white"
                />
                <select
                  id="availability"
                  placeholder="Select Availabilty"
                  value={edititemData.availability}
                  onChange={handleEditItemChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                >
                  <option value="">Select availabilty</option>
                  <option value="IN_STOCK">In Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>
              </div>
              <div className="col-span-2">
                <Label
                  htmlFor="category"
                  value="Category"
                  className="text-white"
                />
                <select
                  id="categoryId"
                  placeholder="Select Category"
                  value={edititemData.categoryId} // Assuming you want to store the selected category in itemData.category
                  onChange={handleEditItemChange}
                  required
                  className="bg-input h-12 p-3 rounded-md w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}{" "}
                      {/* Assuming each category has a name property */}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <Button title="Update" onClick={editSubmit} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Page;
