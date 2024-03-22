import {
  GType_OR_GLocation,
  OnePlace,
  SubscriptionInfo,
} from "@/types/store/leads";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LeadsState {
  subscriptionInfo?: SubscriptionInfo;
  placeTypes?: GType_OR_GLocation[];
  onePlace?: OnePlace;
  allPlaces?: OnePlace[];
}

const initialState: LeadsState = {};

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setSubscriptionInfo(state, action: PayloadAction<SubscriptionInfo>) {
      state.subscriptionInfo = action.payload;
    },
    setPlaceTypes(state, action: PayloadAction<GType_OR_GLocation[]>) {
      state.placeTypes = action.payload;
    },
    setOnePlace(state, action: PayloadAction<OnePlace>) {
      state.onePlace = action.payload;
    },
    setAllPlaces(state, action: PayloadAction<OnePlace[]>) {
      state.allPlaces = action.payload;
    },
  },
});

export const { setSubscriptionInfo, setPlaceTypes, setOnePlace, setAllPlaces } =
  leadsSlice.actions;

export default leadsSlice.reducer;

export * from "./leads-action-creators";
