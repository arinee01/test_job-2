import { type Weather } from "@/entites";
import styles from "./index.module.scss";

interface ForecastProps {
  weather: Weather["list"];
}
export const Forecast = ({ weather }: ForecastProps) => {
  const uniqueDates = weather
    ?.map((item) => item.dt_txt)
    .filter((element, index) => {
      return weather.map((item) => item.dt_txt).indexOf(element) === index;
    });

  return (
    <div className={styles.grid}>
      {uniqueDates &&
        uniqueDates.map((item, index) => {
          return (
            <>
              <div className={styles.main_date}>
                {`Дата: ${
                  weather!.filter((weather) => weather.dt_txt === item)[0]
                    .dt_txt
                }`}
              </div>
              <div key={index} className={styles.column}>
                {weather!
                  .filter((weather) => weather.dt_txt === item)
                  ?.map((element, index) => (
                    <div key={index} className={styles.card}>
                      <img
                        src={`http://openweathermap.org/img/w/${element.weather[0].icon}.png`}
                        alt=""
                      />
                      <div>{`Время: ${element.dt}`}</div>
                      <div>Температура : {element.main.temp} С</div>
                      <div>Погода : {element.weather[0].description}</div>
                      <div>Скорость ветра : {element.wind.speed} м/с</div>
                      <div>Влажность : {element.main.humidity}%</div>
                    </div>
                  ))}
              </div>
            </>
          );
        })}
    </div>
  );
};
