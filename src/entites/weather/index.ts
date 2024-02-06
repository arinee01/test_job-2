/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { DateTime } from "luxon";

export type Weather = {
  list?: {
    dt: number | string;
    dt_txt: string;
    main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_kf: number;
      temp_max: number;
      temp_min: number;
    };
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
    wind: {
      deg: number;
      gust: number;
      speed: number;
    };
  }[];
};

const convertToCelcia = (temp: number) => Math.round(temp - 273.15);

export async function getWeather(
  params: { lat: number; lon: number },
  callback?: (value: Weather["list"] | null) => void
) {
  const weatherUrl = import.meta.env.VITE_WEATHER_API_CALL;
  const appId = import.meta.env.VITE_API_KEY;

  try {
    const response = await axios.get<Weather>(
      `${weatherUrl}?appId=${appId}&lat=${params.lat}&lon=${params.lon}&lang=ru`
    );

    // Дополнительная проверка наличия response.data.list
    if (response?.data.list) {
      const changedArray = response.data.list.map((item) => ({
        ...item,
        dt_txt: DateTime.fromFormat(
          item.dt_txt,
          "yyyy-MM-dd hh:mm:ss"
        ).toFormat("d LLL yyyy", { locale: "ru" }),
        dt: DateTime.fromFormat(item.dt_txt, "yyyy-MM-dd hh:mm:ss").toFormat(
          "hh:mm",
          { locale: "ru" }
        ),
        main: { ...item.main, temp: convertToCelcia(item.main.temp) },
      }));

      callback?.(changedArray);
    } else {
      // Если нет данных, вызываем callback с null
      callback?.(null);
    }

    console.log(response);
  } catch (error: any) {
    console.error("Error fetching weather data:", error);

    // Обработка ошибок
    if (axios.isAxiosError(error)) {
      // Ошибка Axios
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Axios error:", error.message);
      }
    } else {
      // Другие ошибки
      console.error("Other error:", error.message);
    }

    // Вызов callback с null в случае ошибки
    callback?.(null);
  }
}
