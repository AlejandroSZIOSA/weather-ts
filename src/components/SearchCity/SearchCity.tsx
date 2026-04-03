import { type FC, type SubmitEvent, useEffect } from "react";
import styles from "./SearchCity.module.css";

interface SearchCityProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSearch: (city: string) => void;
}

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

  const minInputEntry = city.trim().length < 4;
  const maxInputEntry = city.trim().length == 20;

  return (
    <form className={styles["formContainer"]} onSubmit={handleSubmite}>
      <label htmlFor="city">City Name</label>
      <div>
        <input
          type="text"
          placeholder="city"
          id="city"
          name="city"
          maxLength={20}
          ref={inputRef}
          onChange={(e) => setCity(e.target.value)}
          value={city}
          required
        />
        <button type="submit" disabled={minInputEntry || maxInputEntry}>
          Search
        </button>
      </div>
      {minInputEntry && <p>At least 4 characters.</p>}
      {maxInputEntry && <p>Maximun 20 characthers.</p>}
    </form>
  );
};
