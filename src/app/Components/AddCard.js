import React from "react";

const AddCard = () => {
  return (
    <div className="bg-bg w-profileCard h-add text-white rounded-md ml-7 mt-11 p-3">
      <h3> Add New User</h3>
      <div className="my-5">
        <div>
          <input
            className="bg-input w-full rounded-sm h-fivevh p-3"
            placeholder="Name"
            type="Name"
          />
        </div>
        <div className="mt-2">
          <input
            className="bg-input  w-full rounded-sm  h-fivevh p-3"
            placeholder="Email"
          />
        </div>
        <div className="mt-2">
          <input
            className="bg-input w-full rounded-sm  h-fivevh p-3"
            placeholder="Role"
          />
        </div>
        <div className="mt-2">
          <input
            className="bg-input   w-full rounded-sm  h-fivevh p-3"
            placeholder="Password"
          />
        </div>
      </div>
      <button className="bg-pink w-full text-black rounded-md h-threevh">
        Add
      </button>
    </div>
  );
};

export default AddCard;
