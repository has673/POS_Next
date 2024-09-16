const { configureStore } = require("@reduxjs/toolkit");
const userReducer = require("./slices/userslice").default;
const orderReducer = require("./slices/orderslice").default;
const itemReducer = require("./slices/itemslice").default;
export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    item: itemReducer,
  },
});
