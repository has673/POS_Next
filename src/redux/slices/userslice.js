const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  id: null,
  role: null,
  allowStaff: null,
  allowCategory: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    setUserData: (state, action) => {
      state.id = action.payload.userId;
      state.role = action.payload.role;
      state.allowCategory = action.payload.allowCategory;
      state.allowStaff = action.payload.allowStaff;
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, logout, setUserData } =
  userSlice.actions;

export default userSlice.reducer;
