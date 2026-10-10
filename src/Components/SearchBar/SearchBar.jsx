import { useState } from "react";

function SearchBar(props) {
  const [currSearchTerm, setCurrSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchSpotify(currSearchTerm);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search Songs"
          aria-label="Search for songs"
          value={currSearchTerm}
          onChange={(e) => setCurrSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default SearchBar;
