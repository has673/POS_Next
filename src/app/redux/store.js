const { configureStore } = require("@reduxjs/toolkit");
const userReducer = require("./slices/userslice").default;
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
