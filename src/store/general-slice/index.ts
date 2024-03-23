import { countries } from "@/assets/countries";
import { GType_OR_GLocation } from "@/types/store/leads";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Loading =
  | "admin1"
  | "admin2"
  | "city"
  | "placeTypes"
  | "onePlace"
  | "allPlaces"
  | "subscriptionInfo";

export interface GeneralState {
  isLoading: {
    admin1: boolean;
    admin2: boolean;
    city: boolean;
    placeTypes: boolean;
    onePlace: boolean;
    allPlaces: boolean;
    subscriptionInfo: boolean;
  };
  countries: { iso2: string; text: string }[];
  admin1?: GType_OR_GLocation[];
  admin2?: GType_OR_GLocation[];
  city?: GType_OR_GLocation[];
}

const initialState: GeneralState = {
  isLoading: {
    admin1: false,
    admin2: false,
    city: false,
    placeTypes: false,
    onePlace: false,
    allPlaces: false,
    subscriptionInfo: false,
  },
  countries: Object.keys(countries).map((countryIso) => ({
    iso2: countryIso,
    text: countries[countryIso],
  })),
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    loading(state, action: PayloadAction<Loading>) {
      state.isLoading[action.payload] = true;
    },
    loaded(state, action: PayloadAction<Loading>) {
      state.isLoading[action.payload] = false;
    },
    setGeoLocations(
      state,
      action: PayloadAction<{
        type: "admin1" | "admin2" | "city";
        locations: GType_OR_GLocation[];
      }>
    ) {
      state[action.payload.type] = action.payload.locations;
    },
  },
});

export const { loading, loaded, setGeoLocations } = generalSlice.actions;

export default generalSlice.reducer;
