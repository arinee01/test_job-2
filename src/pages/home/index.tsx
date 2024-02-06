import { useEffect, useState } from "react";
import classNames from "classnames";

import { Forecast } from "@/features";

import { type Geo, getCurrentGeo, type Weather, getWeather } from "@/entites";

import { Dropdown, useDebounce } from "@/shared";

import styles from "./index.module.scss";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<Geo | null>(null);
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const [choice, setChoice] = useState<Geo | null>(null);
  const debouncedValue = useDebounce<string>(search, 500);
  const [weather, setWeather] = useState<Weather["list"] | null>(null);

  useEffect(() => {
    if (search) {
      getCurrentGeo(search, (result) => {
        if (result === null) {
          console.error("Error fetching geo data:", "Город не найден");
          return;
        }
        setResult((result?.[0] as Geo) || ({} as Geo));
      });
    }
  }, [debouncedValue]);

  const handleClickInside = () => {
    setIsDropdownShow(true);
  };

  const handleClickOutside = () => {
    setIsDropdownShow(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.choice}>
          {choice?.local_names?.ru || "Ваш город"}
        </div>
        <div className={styles.inputContainer}>
          <input
            onClick={handleClickInside}
            className={styles.search}
            type="text"
            value={search}
            placeholder="Введите название города"
            onChange={(e) => setSearch(e.target.value)}
          />
          {isDropdownShow && (
            <Dropdown
              onClick={() => {
                if (result) {
                  setSearch(result.local_names.ru);
                  setChoice(result);
                  getWeather({ lat: result.lat, lon: result.lon }, (list) =>
                    setWeather(list)
                  );
                }
                setIsDropdownShow(false);
              }}
              className={classNames(
                styles.dropdownItem,
                result && styles.dropdownActiveItem
              )}
              text={result?.local_names?.ru || "Вашего города нет в списке"}
              hideDropdown={handleClickOutside}
            />
          )}
        </div>
        {weather && <Forecast weather={weather} />}
      </div>
    </div>
  );
};
