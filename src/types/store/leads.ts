export interface SubscriptionInfo {
  plan: string;
  active: boolean;
  on_trial: boolean;
  pending_cancelation: boolean;
  renewal_date: string;
  features: {
    EXPORT_CREDITS: {
      name: "Export credits";
      consumed: number;
      remaining: number;
      total: number;
    };
    SCRAPING_SPEED: {
      name: "Scraping speed";
      value: string;
    };
    SEARCH_CITY: {
      name: "Search by city";
      value: boolean;
    };
    SEARCH_ADMIN2_CODE: {
      name: "Search by level 2 division";
      value: boolean;
    };
    SEARCH_ADMIN1_CODE: {
      name: "Search by level 1 division";
      value: boolean;
    };
    SEARCH_WHOLE_COUNTRY: {
      name: "Search on whole country";
      value: boolean;
    };
    ESSENTIAL_SEARCH_FILTERS: {
      name: "Essential search filters";
      value: boolean;
    };
    ADVANCED_SEARCH_FILTERS: {
      name: "Advanced search filters";
      value: boolean;
    };
    GMAP_EXPORT_ADDITIONAL_FIELDS: {
      name: "GMap additional fields in exports";
      value: boolean;
    };
    WEB_EXPORT_ADDITIONAL_FIELDS: {
      name: "Website additional fields in exports";
      value: boolean;
    };
    API_ACCESS: {
      name: "API Access";
      value: boolean;
    };
  };
}

export interface GType_OR_GLocation {
  id: string;
  text: string;
}

export interface OnePlace {
  google_id: string;
  name: string;
  types: {
    type: string;
    deleted: boolean;
    is_main: boolean;
  }[];
  is_closed: boolean;
  descriptions: string[];
  website: string;
  phone: string;
  phone_international: string;
  timezone: string;
  location_full_address: string;
  location_borough: string;
  location_street_1: string;
  location_street_2: string;
  location_city: string;
  location_postal_code: string;
  location_state: string;
  location_latitude: string;
  location_longitude: string;
  location_country_code: string;
  location_admin1_code: string;
  location_admin2_code: string;
  link: string;
  place_id: string;
  owner_name: string;
  owner_id: string;
  price_range: string;
  reviews_id: string;
  reviews_count: number;
  reviews_rating: number;
  reviews_per_score: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
  photos_count: string;
  photos: string[];
  characteristics: any;
  occupancy: {
    monday: {
      "4 AM": string;
      "5 AM": string;
      "6 AM": string;
      "7 AM": string;
      "8 AM": string;
      "9 AM": string;
      "10 AM": string;
      "11 AM": string;
      "12 PM": string;
      "1 PM": string;
      "2 PM": string;
      "3 PM": string;
      "4 PM": string;
      "5 PM": string;
      "6 PM": string;
      "7 PM": string;
      "8 PM": string;
      "9 PM": string;
      "10 PM": string;
      "11 PM": string;
      "12 AM": string;
      "1 AM": string;
      "2 AM": string;
      "3 AM": string;
    };
    tuesday: {
      "4 AM": string;
      "5 AM": string;
      "6 AM": string;
      "7 AM": string;
      "8 AM": string;
      "9 AM": string;
      "10 AM": string;
      "11 AM": string;
      "12 PM": string;
      "1 PM": string;
      "2 PM": string;
      "3 PM": string;
      "4 PM": string;
      "5 PM": string;
      "6 PM": string;
      "7 PM": string;
      "8 PM": string;
      "9 PM": string;
      "10 PM": string;
      "11 PM": string;
      "12 AM": string;
      "1 AM": string;
      "2 AM": string;
      "3 AM": string;
    };
    wednesday: {
      "4 AM": string;
      "5 AM": string;
      "6 AM": string;
      "7 AM": string;
      "8 AM": string;
      "9 AM": string;
      "10 AM": string;
      "11 AM": string;
      "12 PM": string;
      "1 PM": string;
      "2 PM": string;
      "3 PM": string;
      "4 PM": string;
      "5 PM": string;
      "6 PM": string;
      "7 PM": string;
      "8 PM": string;
      "9 PM": string;
      "10 PM": string;
      "11 PM": string;
      "12 AM": string;
      "1 AM": string;
      "2 AM": string;
      "3 AM": string;
    };
    thursday: {
      "4 AM": string;
      "5 AM": string;
      "6 AM": string;
      "7 AM": string;
      "8 AM": string;
      "9 AM": string;
      "10 AM": string;
      "11 AM": string;
      "12 PM": string;
      "1 PM": string;
      "2 PM": string;
      "3 PM": string;
      "4 PM": string;
      "5 PM": string;
      "6 PM": string;
      "7 PM": string;
      "8 PM": string;
      "9 PM": string;
      "10 PM": string;
      "11 PM": string;
      "12 AM": string;
      "1 AM": string;
      "2 AM": string;
      "3 AM": string;
    };
    friday: {
      "4 AM": string;
      "5 AM": string;
      "6 AM": string;
      "7 AM": string;
      "8 AM": string;
      "9 AM": string;
      "10 AM": string;
      "11 AM": string;
      "12 PM": string;
      "1 PM": string;
      "2 PM": string;
      "3 PM": string;
      "4 PM": string;
      "5 PM": string;
      "6 PM": string;
      "7 PM": string;
      "8 PM": string;
      "9 PM": string;
      "10 PM": string;
      "11 PM": string;
      "12 AM": string;
      "1 AM": string;
      "2 AM": string;
      "3 AM": string;
    };
    saturday: {
      "4 AM": string;
      "5 AM": string;
      "6 AM": string;
      "7 AM": string;
      "8 AM": string;
      "9 AM": string;
      "10 AM": string;
      "11 AM": string;
      "12 PM": string;
      "1 PM": string;
      "2 PM": string;
      "3 PM": string;
      "4 PM": string;
      "5 PM": string;
      "6 PM": string;
      "7 PM": string;
      "8 PM": string;
      "9 PM": string;
      "10 PM": string;
      "11 PM": string;
      "12 AM": string;
      "1 AM": string;
      "2 AM": string;
      "3 AM": string;
    };
    sunday: {
      "4 AM": string;
      "5 AM": string;
      "6 AM": string;
      "7 AM": string;
      "8 AM": string;
      "9 AM": string;
      "10 AM": string;
      "11 AM": string;
      "12 PM": string;
      "1 PM": string;
      "2 PM": string;
      "3 PM": string;
      "4 PM": string;
      "5 PM": string;
      "6 PM": string;
      "7 PM": string;
      "8 PM": string;
      "9 PM": string;
      "10 PM": string;
      "11 PM": string;
      "12 AM": string;
      "1 AM": string;
      "2 AM": string;
      "3 AM": string;
    };
  };
  is_claimed: boolean;
  working_hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  status: string;
  scraped_at: string;
  first_seen_at: string;
  website_data: {
    url: string;
    domain: string;
    is_responding: boolean;
    is_empty: string;
    title: string;
    meta_keywords: any;
    meta_description: string;
    meta_og_title: string;
    meta_og_image: string;
    meta_generator: string;
    lang: string;
    contact_pages: string[];
    facebook: string[];
    youtube: string[];
    twitter: string[];
    instagram: string[];
    linkedin: string[];
    technologies: string[];
    ad_pixels: string[];
    emails: { email: string; sources: string[] }[];
    phones: { phone: string; sources: string[] }[];
    status: string;
    scraped_at: string;
  };
}

export interface SearchPlaces_Params {
  type: string;
  country_code: string;
  admin1_code?: string;
  admin2_code?: string;
  city?: string;
  postal_code?: string;
  skip_data?: 0 | 1;
  per_page?: 1 | 10 | 25 | 50;
  cursor?: string;
  gmap_is_main_type?: 0 | 1;
  gmap_is_closed?: 0 | 1;
  gmap_is_claimed?: 0 | 1;
  gmap_has_website?: 0 | 1;
  gmap_has_phone?: 0 | 1;
  website_has_title?: 0 | 1;
  website_has_meta_keywords?: 0 | 1;
  website_has_meta_description?: 0 | 1;
  website_has_contact_pages?: 0 | 1;
  website_has_emails?: 0 | 1;
  website_has_phones?: 0 | 1;
  website_has_facebook?: 0 | 1;
  website_has_youtube?: 0 | 1;
  website_has_twitter?: 0 | 1;
  website_has_instagram?: 0 | 1;
  website_has_linkedin?: 0 | 1;
  website_has_ad_pixels?: 0 | 1;
  gmap_reviews_count_lte?: string | number;
  gmap_reviews_count_lt?: string | number;
  gmap_reviews_count_gte?: string | number;
  gmap_reviews_count_gt?: string | number;
  gmap_reviews_rating_lte?: string | number;
  gmap_reviews_rating_lt?: string | number;
  gmap_reviews_rating_gte?: string | number;
  gmap_reviews_rating_gt?: string | number;
  gmap_photos_count_lte?: string | number;
  gmap_photos_count_lt?: string | number;
  gmap_photos_count_gte?: string | number;
  gmap_photos_count_gt?: string | number;
  gmap_price_range?: "$" | "$$" | "$$$" | "$$$$";
}

export interface SearchFilters {
  is_main_type?: "0" | "1" | "all";
  is_closed?: "0" | "1" | "all";
  has_website?: "0" | "1" | "all";
  has_phone?: "0" | "1" | "all";
  has_email?: "0" | "1" | "all";
  has_facebook?: "0" | "1" | "all";
  has_instagram?: "0" | "1" | "all";
  has_youtube?: "0" | "1" | "all";
  has_twitter?: "0" | "1" | "all";
  has_linkedin?: "0" | "1" | "all";
  is_claimed?: "0" | "1" | "all";
  price_range?: "all" | "$" | "$$" | "$$$" | "$$$$";
  reviews_rating_lte?: string | undefined;
  reviews_rating_gte?: string | undefined;
  reviews_count_lte?: string | undefined;
  reviews_count_gte?: string | undefined;
  gmap_photos_count_lte?: string | undefined;
  gmap_photos_count_gte?: string | undefined;
  has_contact_pages?: "0" | "1" | "all";
  has_ad_pixels?: "0" | "1" | "all";
}

export interface ExportFields {
  name:
    | "Essential Fields In Exports"
    | "GMap Additional Fields In Exports"
    | "Website Additional Fields In Exports";
  fields: string[];
}

export interface ReadyToConvertFields {
  "Google Place ID": string;
  "Place Name": string;
  "Description 1": string;
  "Description 2": string;
  "Description 3": string;
  "Place is Closed": string;
  "Main Type": string;
  "All Types": string;
  Website: string;
  "Website Root": string;
  "Phone Number": string;
  "International Phone Number": string;
  Timezone: string;
  "Full Address": string;
  Borough: string;
  "Street 1": string;
  "Street 2": string;
  City: string;
  "Postal code": string;
  State: string;
  "Level 1 division": string;
  "Level 2 division": string;
  Country: string;
  "Country code": string;
  Longitude: string;
  Latitude: string;
  "Location Link on Google Maps": string;
  "Owner name": string;
  "Owner Id": string;
  "Place Id": string;
  Email: string;
  Facebook: string;
  Youtube: string;
  Twitter: string;
  Instagram: string;
  Linkedin: string;
  "First seen on": string;
  "First seen on (timestamp)": string;
  "Price Range": string;
  "Reviews ID": string;
  "Reviews count": string;
  "Reviews Rating": string;
  "Reviews per Score": string;
  "Photos Count": string;
  "Photo 1": string;
  "Photo 2": string;
  Occupancy: string;
  "Is Claimed": string;
  "Working Hours": string;
  Characteristics: string;
  "Website Title": string;
  "Website Meta Keywords": string;
  "Website Meta Description": string;
  "Website Meta Image": string;
  "Website Meta Generator": string;
  "Website Language": string;
  "Email 2": string;
  "Email 3": string;
  "Email 4": string;
  "Email 5": string;
  "All Emails": string;
  "Contact Page 1": string;
  "Contact Page 2": string;
  "Contact Page 3": string;
  "Contact Page 4": string;
  "Contact Page 5": string;
  "All Contact Pages": string;
  "All Facebook Links": string;
  "All Youtube Links": string;
  "All Twitter Links": string;
  "All Instagram Links": string;
  "All Linkedin Links": string;
  "Website Technologies": string;
  "Website Ad Pixels": string;
}
