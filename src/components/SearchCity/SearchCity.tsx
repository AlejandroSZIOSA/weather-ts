import { type FC, useState, type SubmitEvent } from "react";

interface SearchCityProps {
  onSearch: (city: string) => void;
  onCityChange?: (city: string) => void;
}

export const SearchCity: FC<SearchCityProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmite = (e: SubmitEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmite}>
      <label htmlFor="city">City:</label>
      <input
        type="text"
        placeholder="city"
        id="city"
        name="city"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        required
      />
      <button type="submit" disabled={city.trim().length < 3}>
        Search
      </button>
    </form>
  );
};
