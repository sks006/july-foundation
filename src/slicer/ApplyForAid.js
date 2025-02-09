import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for handling the donation request
export const applyForAid = createAsyncThunk(
  "donate/submit",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const donateSlice = createSlice({
  name: "donate",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetDonateState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForAid.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(applyForAid.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(applyForAid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDonateState } = donateSlice.actions;
export default donateSlice.reducer;
