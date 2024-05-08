import { countries } from "@/assets/countries";
import {
  GType_OR_GLocation,
  OnePlace,
  ReadyToConvertFields,
} from "@/types/store/leads";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToXLSX(
  data: OnePlace[],
  lev1dev: GType_OR_GLocation[],
  lev2dev: GType_OR_GLocation[]
) {
  const readyData: ReadyToConvertFields[] = [];
  data.forEach(
    ({
      google_id,
      name,
      descriptions,
      is_closed,
      types,
      timezone,
      location_full_address,
      location_borough,
      location_street_1,
      location_street_2,
      location_city,
      location_postal_code,
      location_state,
      location_admin1_code,
      location_admin2_code,
      location_country_code,
      location_longitude,
      location_latitude,
      link,
      owner_name,
      owner_id,
      place_id,
      first_seen_at,
      price_range,
      reviews_id,
      reviews_count,
      reviews_rating,
      reviews_per_score,
      photos_count,
      photos,
      occupancy,
      is_claimed,
      working_hours,
      characteristics,
      phone,
      phone_international,
      website,
      website_data: {
        domain,
        emails,
        facebook,
        youtube,
        twitter,
        instagram,
        linkedin,
        title,
        meta_keywords,
        meta_description,
        meta_og_image,
        meta_generator,
        lang,
        contact_pages,
        technologies,
        ad_pixels,
      },
    }) => {
      readyData.push({
        "Google Place ID": google_id,
        "Place Name": name,
        "Description 1": descriptions && descriptions[0],
        "Description 2": descriptions && descriptions[1],
        "Description 3": descriptions && descriptions[2],
        "Place is Closed": is_closed ? "Yes" : "No",
        "Main Type": types.find(({ is_main }) => is_main)?.type || "",
        "All Types": JSON.stringify(types.filter(({ is_main }) => !is_main)),
        Website: website,
        "Website Root": domain,
        "Phone Number": phone,
        "International Phone Number": phone_international,
        Timezone: timezone,
        "Full Address": location_full_address,
        Borough: location_borough,
        "Street 1": location_street_1,
        "Street 2": location_street_2,
        City: location_city,
        "Postal code": location_postal_code,
        State: location_state,
        "Level 1 division":
          lev1dev.find(({ id }) => id == location_admin1_code)?.text ||
          location_admin1_code,
        "Level 2 division":
          lev2dev.find(({ id }) => id == location_admin2_code)?.text ||
          location_admin2_code,
        Country: countries.find(
          ({ alpha2 }) => alpha2 == location_country_code.toLowerCase()
        )!.name,
        "Country code": location_country_code,
        Longitude: location_longitude,
        Latitude: location_latitude,
        "Location Link on Google Maps": link,
        "Owner name": owner_name,
        "Owner Id": owner_id,
        "Place Id": place_id,
        Email: emails && emails[0].email,
        Facebook: facebook && facebook[0],
        Youtube: youtube && youtube[0],
        Twitter: twitter && twitter[0],
        Instagram: instagram && instagram[0],
        Linkedin: linkedin && linkedin[0],
        "First seen on": first_seen_at,
        "First seen on (timestamp)":
          first_seen_at && new Date(first_seen_at).getTime().toString(),
        "Price Range": price_range,
        "Reviews ID": reviews_id,
        "Reviews count": reviews_count ? reviews_count.toString() : "0",
        "Reviews Rating": reviews_rating ? reviews_rating.toString() : "0",
        "Reviews per Score": JSON.stringify(reviews_per_score),
        "Photos Count": photos_count,
        "Photo 1": photos && photos[0],
        "Photo 2": photos && photos[1],
        Occupancy: JSON.stringify(occupancy),
        "Is Claimed": is_claimed ? "Yes" : "No",
        "Working Hours": JSON.stringify(working_hours),
        Characteristics: JSON.stringify(characteristics),
        "Website Title": title && title,
        "Website Meta Keywords": meta_keywords && meta_keywords,
        "Website Meta Description": meta_description && meta_description,
        "Website Meta Image": meta_og_image && meta_og_image,
        "Website Meta Generator": meta_generator && meta_generator,
        "Website Language": lang && lang,
        "Email 2": emails && emails[1] && emails[1].email,
        "Email 3": emails && emails[2] && emails[2].email,
        "Email 4": emails && emails[3] && emails[3].email,
        "Email 5": emails && emails[4] && emails[4].email,
        "All Emails": JSON.stringify(emails),
        "Contact Page 1": contact_pages && contact_pages[0],
        "Contact Page 2": contact_pages && contact_pages[1],
        "Contact Page 3": contact_pages && contact_pages[2],
        "Contact Page 4": contact_pages && contact_pages[3],
        "Contact Page 5": contact_pages && contact_pages[4],
        "All Contact Pages": contact_pages && JSON.stringify(contact_pages),
        "All Facebook Links": facebook && JSON.stringify(facebook),
        "All Youtube Links": youtube && JSON.stringify(youtube),
        "All Twitter Links": twitter && JSON.stringify(twitter),
        "All Instagram Links": instagram && JSON.stringify(instagram),
        "All Linkedin Links": linkedin && JSON.stringify(linkedin),
        "Website Technologies": technologies && JSON.stringify(technologies),
        "Website Ad Pixels": ad_pixels && JSON.stringify(ad_pixels),
      });
    }
  );

  const workSheet = XLSX.utils.json_to_sheet(readyData);
  const workBook = {
    Sheets: { leads: workSheet },
    SheetNames: ["leads"],
  };
  const file = XLSX.write(workBook, { bookType: "xlsx", type: "array" });
  return new Blob([file], { type: "fileType" });
}
