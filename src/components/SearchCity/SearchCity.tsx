import { type FC, type SubmitEvent, useEffect } from "react";
import styles from "./SearchCity.module.css";
import searchIcon from "@/assets/search-icon.svg";

interface SearchCityProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSearch: (city: string) => void;
}

const MAX_CITY_NAME_LENGTH = 22;
const MIN_CITY_NAME_LENGTH = 4;

export const SearchCity: FC<SearchCityProps> = ({
  onSearch,
  inputRef,
  city,
  setCity,
}) => {
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmite = (e: SubmitEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  const minInputEntry = city.trim().length < MIN_CITY_NAME_LENGTH;
  const maxInputEntry = city.trim().length == MAX_CITY_NAME_LENGTH + 1;

  return (
    <form className={styles["formContainer"]} onSubmit={handleSubmite}>
      <label htmlFor="city">City Name</label>
      <div className={styles["inputContainer"]}>
        <input
          type="text"
          placeholder="name"
          id="city"
          name="city"
          maxLength={MAX_CITY_NAME_LENGTH + 1}
          ref={inputRef}
          onChange={(e) => setCity(e.target.value)}
          value={city}
          required
        />
        <button type="submit" disabled={minInputEntry || maxInputEntry}>
          <img src={searchIcon} alt="search" />
        </button>
      </div>

      <p style={{ height: "18px" }}>
        {minInputEntry
          ? `At least ${MIN_CITY_NAME_LENGTH} characters.`
          : maxInputEntry
            ? `Maximun ${MAX_CITY_NAME_LENGTH} characthers.`
            : null}
      </p>
    </form>
  );
};
