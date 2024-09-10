"use client";
import AddCard from "@/Components/AddCard";
import UserCard from "@/Components/UserCard";
import { Spin } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Url}/auth`, {
        headers: {
          Authorization: token,
        },
      });
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <Spin spinning={Loading}>
        <div className="w-60vw bg-bg text-white h-auto rounded-sm">
          {users.map((user) => (
            <UserCard key={user.id} user={user} /> // Add a `key` prop and return the UserCard component
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default page;
