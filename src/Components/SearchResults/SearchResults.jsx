import styles from "./SearchResults.module.css";
import TrackList from "../TrackList/TrackList.jsx";

function SearchResults(props) {
  const hasResults = props.tracks.length > 0;

  return (
    <>
      <h2 className={styles.resultsHeading}>Search Results</h2>

      {hasResults ? (
        <TrackList tracks={props.tracks} addTrack={props.addTrack} />
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">
            ♫
          </span>
          <p className={styles.emptyTitle}>Discover your next favorite</p>
          <p className={styles.emptyDescription}>
            Search for songs, artists, or albums to start building your playlist.
          </p>
        </div>
      )}
    </>
  );
}

export default SearchResults;
