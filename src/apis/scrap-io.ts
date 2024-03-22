import { SearchPlaces_Params } from "@/types/store/leads";
import axios from "axios";

export class scrap_io {
  subscriptionInfo = new SubscriptionInfo();
  geoLocations = new GeoLocations();
  places = new Places();
}

class Scrap_io_base {
  #apiKey = "";
  baseUrl = "https://scrap.io/api/v1";
  headers = {
    Authorization: `Bearer ${this.#apiKey}`,
  };
}

class GMap {
  baseData = new Scrap_io_base();
  endPoint = "gmap";
}

class SubscriptionInfo {
  #baseData = new Scrap_io_base();
  #endPoint = "subscription";

  get() {
    return axios.get(`${this.#baseData.baseUrl}/${this.#endPoint}`, {
      headers: this.#baseData.headers,
    });
  }
}

class PlaceType {
  #baseData = new GMap();
  #endPoint = "types";

  get(params?: { search_term?: string; locale?: string }) {
    return axios.get(
      `${this.#baseData.baseData.baseUrl}/${this.#baseData.endPoint}/${
        this.#endPoint
      }`,
      { headers: this.#baseData.baseData.headers, params }
    );
  }
}

class GeoLocations {
  #baseData = new GMap();
  #endPoint = "locations";

  get(params: {
    country_code: string;
    type: "admin1" | "admin2" | "city";
    admin1_code?: string;
    admin2_code?: string;
    search_term?: string;
  }) {
    return axios.get(
      `${this.#baseData.baseData.baseUrl}/${this.#baseData.endPoint}/${
        this.#endPoint
      }`,
      { headers: this.#baseData.baseData.headers, params }
    );
  }
}

class Place {
  #baseData = new GMap();
  #endPoint = "place";

  get(params: { place_id: string; skip_data?: 0 | 1 }) {
    return axios.get(
      `${this.#baseData.baseData.baseUrl}/${this.#baseData.endPoint}/${
        this.#endPoint
      }`,
      { headers: this.#baseData.baseData.headers, params }
    );
  }
}

class SearchPlaces {
  #baseData = new GMap();
  #endPoint = "search";

  get(params: SearchPlaces_Params) {
    return axios.get(
      `${this.#baseData.baseData.baseUrl}/${this.#baseData.endPoint}/${
        this.#endPoint
      }`,
      { headers: this.#baseData.baseData.headers, params }
    );
  }
}

class Places {
  getType = new PlaceType().get;
  getOne = new Place().get;
  getAll = new SearchPlaces().get;
}
