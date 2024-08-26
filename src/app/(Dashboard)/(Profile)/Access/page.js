"use client";
import AddCard from "@/app/Components/AddCard";
import UserCard from "@/app/Components/UserCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <div className="w-60vw bg-bg text-white h-auto rounded-sm">
        {users.map((user) => (
          <UserCard key={user.id} user={user} /> // Add a `key` prop and return the UserCard component
        ))}
      </div>
    </div>
  );
};

export default page;
