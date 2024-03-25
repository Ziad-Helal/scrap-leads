import {
  GType_OR_GLocation,
  OnePlace,
  SearchFilters,
  SubscriptionInfo,
} from "@/types/store/leads";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LeadsState {
  subscriptionInfo?: SubscriptionInfo;
  placeTypes?: GType_OR_GLocation[];
  onePlace?: OnePlace;
  allPlaces?: OnePlace[];
  searchFilters: SearchFilters;
}

const initialState: LeadsState = {
  searchFilters: localStorage.getItem("searchFilters")
    ? JSON.parse(localStorage.getItem("searchFilters")!)
    : {
        is_main_type: "all",
        is_closed: "all",
        has_website: "all",
        has_phone: "all",
        has_email: "all",
        has_facebook: "all",
        has_instagram: "all",
        has_youtube: "all",
        has_twitter: "all",
        has_linkedin: "all",
        is_claimed: "all",
        price_range: undefined,
        reviews_rating_lte: undefined,
        reviews_rating_gte: undefined,
        reviews_count_lte: undefined,
        reviews_count_gte: undefined,
        gmap_photos_count_lte: undefined,
        gmap_photos_count_gte: undefined,
        has_contact_pages: "all",
        has_ad_pixels: "all",
      },
};

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
    setSearchFilters(state, action: PayloadAction<SearchFilters>) {
      localStorage.setItem("searchFilters", JSON.stringify(action.payload));
      state.searchFilters = action.payload;
    },
  },
});

export const {
  setSubscriptionInfo,
  setPlaceTypes,
  setOnePlace,
  setAllPlaces,
  setSearchFilters,
} = leadsSlice.actions;

export default leadsSlice.reducer;

export * from "./leads-action-creators";
