import { type FC, type SubmitEvent, useEffect } from "react";

interface SearchCityProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;

  onSearch: (city: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const SearchCity: FC<SearchCityProps> = ({
  onSearch,
  inputRef,
  city,
  setCity,
}) => {
  /*   const [city, setCity] = useState(""); */

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
    <form onSubmit={handleSubmite}>
      <label htmlFor="city">City Name</label>
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
      {minInputEntry && <p style={{ color: "black" }}>at least 4 character.</p>}
      {maxInputEntry && <p style={{ color: "black" }}>max 20 characthers.</p>}
    </form>
  );
};
