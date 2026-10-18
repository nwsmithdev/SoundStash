
import styles from "./Playlist.module.css";
import TrackList from "../TrackList/TrackList.jsx";

function Playlist(props) {
  const hasTracks = props.trackListing.length > 0;

  return (
    <div className={styles.playlist}>
      <div className={styles.heading}>
        <span className={styles.headingIcon} aria-hidden="true">
          ♫
        </span>
        <h2>Your Playlist</h2>
      </div>

      <div className={styles.nameSection}>
        <label className={styles.nameLabel} htmlFor="playlist-name">
          PLAYLIST NAME
        </label>
        <input
          id="playlist-name"
          className={styles.nameInput}
          type="text"
          value={props.name}
          onChange={(e) => props.updatePlaylist(e.target.value)}
        />
      </div>

      {hasTracks ? (
        <TrackList
          tracks={props.trackListing}
          isPlaylistTrack={true}
          removeTrack={props.removeTrack}
        />
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">
            ♫
          </span>
          <p className={styles.emptyTitle}>Your playlist is empty</p>
          <p className={styles.emptyDescription}>
            Add tracks from your search results to get started.
          </p>
        </div>
      )}

      <button
        className={styles.saveButton}
        type="button"
        onClick={props.savePlaylist}
        disabled={!hasTracks || !props.name.trim() || props.isSaving}
      >
        {props.isSaving ? "Saving..." : "Save to Spotify ↗"}
      </button>
      {props.saveMessage && (
        <p
          className={`${styles.saveMessage} ${props.saveStatus === "success" ? styles.success : styles.error}`}
          role="status"
        >
          {props.saveMessage}
        </p>
      )}
    </div>
  );
}

export default Playlist;
