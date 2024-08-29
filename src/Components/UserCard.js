import React from "react";
import { Radio, Switch, ConfigProvider } from "antd";

// Assuming toggleArray is correctly imported or defined elsewhere
const toggleArray = ["Category", "Staff", "Reservation"];

const UserCard = ({ user }) => {
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
              <Switch>{item}</Switch>
            </ConfigProvider>
          </div>
        ))}
      </div>
      <hr></hr>
    </div>
  );
};

export default UserCard;
