import { type FC } from "react";

export const SearchCity: FC = () => {
  return (
    <form>
      <label htmlFor="city">City:</label>
      <input type="text" id="city" name="city" />
      <button type="submit">Search</button>
    </form>
  );
};
