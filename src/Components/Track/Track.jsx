
import styles from "./Track.module.css";

function Track(props) {
  return (
    <div className={styles.track}>
      <div className={styles.trackArtwork} aria-hidden="true">
        ♫
      </div>

      <div className={styles.trackInfo}>
        <h3 className={styles.trackTitle}>
          {props.track.title}
        </h3>

        <p className={styles.trackDetails}>
          {props.track.artist} · {props.track.album}
        </p>
      </div>

      <button
        className={`${styles.trackButton} ${
          props.isPlaylistTrack ? styles.removeButton : styles.addButton
        }`}
        type="button"
        aria-label={
          props.isPlaylistTrack
            ? `Remove ${props.track.title} from playlist`
            : `Add ${props.track.title} to playlist`
        }
        onClick={
          props.isPlaylistTrack
            ? () => props.removeTrack(props.track)
            : () => props.addTrack(props.track)
        }
      >
        {props.isPlaylistTrack ? "−" : "+"}
      </button>
    </div>
  );
}

export default Track;

