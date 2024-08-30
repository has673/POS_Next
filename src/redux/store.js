const { configureStore } = require("@reduxjs/toolkit");
const userReducer = require("./slices/userslice").default;
const orderReducer = require("./slices/orderslice").default;
export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});
