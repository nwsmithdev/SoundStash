import TrackList from "../TrackList/TrackList.jsx";

function SearchResults(props) {
  return (
    <>
      <h2>Search Results</h2>
      <TrackList tracks={props.tracks} addTrack={props.addTrack} />
    </>
  );
}

export default SearchResults;
