"use client";
import React, { useState } from "react";
import { Radio, Switch, ConfigProvider } from "antd";

import Cookies from "js-cookie";
import axios from "axios";

// Assuming toggleArray is correctly imported or defined elsewhere
const toggleArray = ["Category", "Staff", "Reservation"];

const UserCard = ({ user }) => {
  const Url = process.env.NEXT_PUBLIC_NEST_BACKEND_SERVER;
  const [toggleStates, setToggleStates] = useState({
    allowCategoryModify: false,
    allowStaffModify: false,
    allowReservation: false,
  });

  // Handle toggle change
  const handleToggleChange = (item) => {
    setToggleStates((prevStates) => ({
      ...prevStates,
      [item]: !prevStates[item],
    }));
  };

  const handleSubmit = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.patch(
        `${Url}/auth/${user.id}/accesschange`,
        toggleStates,
        {
          headers: {
            Authorization: token,
            "ngrok-skip-browser-warning": "abc",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-white">
      <div className="flex justify-start p-4 gap-4">
        <h2>{user.username}</h2>

        <div className="bg-pink text-black p-2 text-sm">
          <p>{user.role}</p>
        </div>
      </div>
      <h2 className="text-pink ml-4">{user.email}</h2>
      <div className="flex justify-evenly gap-3 mt-3 mb-2">
        {toggleArray.map((item, index) => (
          <div key={index}>
            <p className="text-xs">{item}</p>
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: "pink",

                  // Alias Token
                },
              }}
            >
              <Switch
                checked={toggleStates[item]}
                onChange={() => handleToggleChange(item)}
              >
                {item}
              </Switch>
            </ConfigProvider>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-pink p-2 text-black rounded-sm w-auto my-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <hr></hr>
    </div>
  );
};

export default UserCard;
