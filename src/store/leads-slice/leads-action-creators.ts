import { scrap_io } from "@/apis/scrap-io";
import { AppDispatch } from "@/types/store";
import { loaded, loading, setGeoLocations } from "@/store/general-slice";
import {
  setAllPlaces,
  setOnePlace,
  setPlaceTypes,
  setSubscriptionInfo,
} from "@/store/leads-slice";
import { SearchPlaces_Params } from "@/types/store/leads";

const api = new scrap_io();

export function getSubscriptionInfo() {
  return async (dispatch: AppDispatch) => {
    dispatch(loading("subscriptionInfo"));

    const respons = await api.subscriptionInfo
      .get()
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setSubscriptionInfo(respons));
    dispatch(loaded("subscriptionInfo"));
  };
}

export function getGeoLocations(
  country_code: string,
  type: "admin1" | "admin2" | "city",
  admin1_code?: string,
  admin2_code?: string,
  search_term?: string
) {
  return async (dispatch: AppDispatch) => {
    dispatch(loading(type));

    const response = await api.geoLocations
      .get({ country_code, type, admin1_code, admin2_code, search_term })
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setGeoLocations({ type, locations: response }));
    dispatch(loaded(type));
  };
}

export function getPlaceTypes() {
  return async (dispatch: AppDispatch) => {
    dispatch(loading("placeTypes"));

    const response = await api.places
      .getType()
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setPlaceTypes(response));
    dispatch(loaded("placeTypes"));
  };
}

export function getOnePlace(place_id: string, skip_data?: 0 | 1) {
  return async (dispatch: AppDispatch) => {
    dispatch(loading("onePlace"));

    const response = await api.places
      .getOne({ place_id, skip_data })
      .then(({ data }) => data)
      .catch((error) => alert(error));

    // CHECK DATA STATUS
    dispatch(setOnePlace(response.data));
    dispatch(loaded("onePlace"));
  };
}

export function getAllPlaces(params: SearchPlaces_Params) {
  return async (dispatch: AppDispatch) => {
    dispatch(loading("allPlaces"));

    const response = await api.places
      .getAll({ ...params })
      .then(({ data }) => data)
      .catch((error) => error);

    // CHECK DATA STATUS
    dispatch(setAllPlaces(response.data));
    dispatch(loaded("allPlaces"));
  };
}
