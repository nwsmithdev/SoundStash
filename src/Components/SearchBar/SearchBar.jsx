import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const [currSearchTerm, setCurrSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchSpotify(currSearchTerm);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="search"
        name="search"
        placeholder="Search songs, artists, or albums..."
        aria-label="Search for songs"
        value={currSearchTerm}
        onChange={(e) => setCurrSearchTerm(e.target.value)}
      />
      <button className={styles.searchButton} type="submit" disabled={props.isSearching}>
        {props.isSearching ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
