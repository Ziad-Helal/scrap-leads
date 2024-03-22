import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LeadsState {}

const initialState: LeadsState = {};

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
});

export const {} = leadsSlice.actions;

export default leadsSlice.reducer;

export * from "./leads-action-creators";
