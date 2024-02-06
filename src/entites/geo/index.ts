/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

export type Geo = {
  country: string;
  lat: number;
  local_names: { ru: string };
  lon: number;
  name: string;
  state: string;
};

export type CurrentGeoType = {
  data: Geo[];
};

export const getCurrentGeo = (
  q: string,
  callback?: (value: CurrentGeoType["data"]| null) => void
) => {
  const geoUrl = import.meta.env.VITE_GEO_API_CALL;
  const appId = import.meta.env.VITE_API_KEY;

  axios
    .get(`${geoUrl}?appId=${appId}&q=${q},RU`)
    .then(function (response: CurrentGeoType) {
      console.log(response);
      callback?.(response.data);
    })
    .catch(function (error: AxiosError<any> | Error) {
      if (axios.isAxiosError(error)) {
       
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          console.error('Request error:', error.request);
        } else {
          console.error('Axios error:', error.message);
        }
      } else {

        console.error('Error:', error.message);
      }
      callback?.(null);
    });
};