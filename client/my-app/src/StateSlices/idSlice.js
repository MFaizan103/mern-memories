import { createSlice } from "@reduxjs/toolkit";

export const idSlice = createSlice({
  name: "ID",
  initialState: { id: 0 },
  reducers: {
    setCurrentID: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setCurrentID } = idSlice.actions;
export default idSlice.reducer;
