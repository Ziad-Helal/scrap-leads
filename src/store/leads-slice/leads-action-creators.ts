import { AppDispatch } from "@/types/store";
import { loaded, loading, setGeoLocations } from "@/store/general-slice";
import {
  setAllPlaces,
  setOnePlace,
  setPlaceTypes,
  setSubscriptionInfo,
} from "@/store/leads-slice";
import { SearchPlaces_Params } from "@/types/store/leads";
import { toast } from "sonner";
import axios from "axios";

const baseUrl = "http://localhost:3500/api/leads-scraper/";

export function getSubscriptionInfo() {
  return async (dispatch: AppDispatch) => {
    dispatch(loading("subscriptionInfo"));

    const endPoint = "subscriptionInfo";
    const respons = await axios
      .get(baseUrl + endPoint)
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setSubscriptionInfo(respons));
    dispatch(loaded("subscriptionInfo"));
  };
}

export function getGeoLocations(params: {
  country_code: string;
  type: "admin1" | "admin2" | "city";
  admin1_code?: string;
  admin2_code?: string;
  search_term?: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(loading(params.type));

    const endPoint = "geoLocations";
    const response = await axios
      .get(baseUrl + endPoint, { params })
      .then(({ data }) => data)
      .catch((error) => alert(error));

    console.log(params.type, response);

    dispatch(setGeoLocations({ type: params.type, locations: response }));
    dispatch(loaded(params.type));
  };
}

export function getPlaceTypes(params?: {
  search_term?: string;
  locale?: "en" | "fr";
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(loading("placeTypes"));

    const endPoint = "placeTypes";
    const response = await axios
      .get(baseUrl + endPoint, { params })
      .then(({ data }) => data)
      .catch((error) => alert(error));

    dispatch(setPlaceTypes(response));
    dispatch(loaded("placeTypes"));
  };
}

export function getOnePlace(params: { place_id: string; skip_data?: 0 | 1 }) {
  return async (dispatch: AppDispatch) => {
    dispatch(loading("onePlace"));

    const endPoint = "onePlace";
    const response = await axios
      .get(baseUrl + endPoint, { params })
      .then(({ data }) => data)
      .catch((error) => alert(error));

    if (response.meta.status == "incomplete")
      toast("The result is incomplete", {
        description:
          "The maximum unmber of exports for this month has been reached.",
        classNames: {
          title: "text-red-500",
          toast: "group-[.toaster]:pointer-events-auto",
        },
      });

    dispatch(setOnePlace(response.data));
    dispatch(loaded("onePlace"));
  };
}

export function getAllPlaces(params: SearchPlaces_Params) {
  return async (dispatch: AppDispatch) => {
    dispatch(loading("allPlaces"));

    const endPoint = "allPlaces";
    const response = await axios
      .get(baseUrl + endPoint, { params })
      .then(({ data }) => data)
      .catch((error) => alert(error));

    console.log(response.meta.status, response.meta.count);
    response.data.length && console.log(response.data);

    if (response) {
      if (response.meta.status == "incomplete")
        toast("The result is incomplete", {
          description:
            "The maximum number of exports for this month has been reached.",
          classNames: {
            title: "text-red-500",
            toast: "group-[.toaster]:pointer-events-auto",
          },
        });
      else if (response.meta.status == "completed")
        toast("Successfull Request", {
          description: `${response.meta.count} Results Found`,
          classNames: {
            title: "text-green-500",
            toast: "group-[.toaster]:pointer-events-auto",
          },
        });

      if (!params.skip_data) dispatch(setAllPlaces(response.data));
    } else {
      toast("Faild Request", {
        classNames: {
          title: "text-red-500",
          toast: "group-[.toaster]:pointer-events-auto",
        },
      });
    }

    dispatch(loaded("allPlaces"));
  };
}
