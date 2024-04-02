import {
  ExportFields,
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
  exportFields: ExportFields[];
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
  exportFields: [
    {
      name: "Essential Fields In Exports",
      fields: [
        "Google ID",
        "Name",
        "Description 1",
        "Description 2",
        "Description 3",
        "Is closed",
        "Main type",
        "All types",
        "Website",
        "Website (root url)",
        "Phone",
        "Phone international",
        "Timezone",
        "Full address",
        "Borough",
        "Street 1",
        "Street 2",
        "City",
        "Postal code",
        "State",
        "Level 1 division",
        "Level 2 division",
        "Country",
        "Country code",
        "Longitude",
        "Latitude",
        "Link",
        "Owner name",
        "Owner Id",
        "Place Id",
        "Email",
        "Facebook link",
        "Youtube link",
        "Twitter link",
        "Instagram link",
        "Linkedin link",
        "First seen on",
        "First seen on (timestamp)",
      ],
    },
    {
      name: "GMap Additional Fields In Exports",
      fields: [
        "Price range",
        "Reviews ID",
        "Reviews count",
        "Reviews rating",
        "Reviews per score",
        "Photos count",
        "Photo 1",
        "Photo 2",
        "Occupancy",
        "Is claimed",
        "Working hours",
        "Characteristics",
      ],
    },
    {
      name: "Website Additional Fields In Exports",
      fields: [
        "Website title",
        "Website meta keywords",
        "Website meta description",
        "Website meta image",
        "Website meta generator",
        "Website lang",
        "Email 2",
        "Email 3",
        "Email 4",
        "Email 5",
        "All emails",
        "Contact page 1",
        "Contact page 2",
        "Contact page 3",
        "Contact page 4",
        "Contact page 5",
        "All contact pages",
        "All facebook links",
        "All youtube links",
        "All twitter links",
        "All instagram links",
        "All linkedin links",
        "Website technologies",
        "Website ad pixels",
      ],
    },
  ],
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
      if (action.payload.length) state.allPlaces = action.payload;
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
