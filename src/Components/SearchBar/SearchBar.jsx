function SearchBar() {
  return (
    <>
      <form>
        <input
          type="text"
          name="search"
          placeholder="Search Songs"
          aria-label="Search for songs"
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default SearchBar;
