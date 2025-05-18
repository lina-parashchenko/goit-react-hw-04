import css from "./SearchBar.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      toast.error("Please enter a search term");
      return;
    }
    const isValid = /^[\p{L}\d\s]+$/u.test(trimmedQuery);
    if (!isValid) {
      toast.error("Search term contains invalid characters");
      return;
    }

    onSubmit(trimmedQuery);
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}
