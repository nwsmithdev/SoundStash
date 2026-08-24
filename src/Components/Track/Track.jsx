import styles from "./Track.module.css";

function Track(props) {
  return (
    <>
      <h3>{props.track.title}</h3>
      <p>
        {props.track.artist} | {props.track.album}
      </p>
      <button
        aria-label="Add song to playlist"
        onClick={
          props.isPlaylistTrack
            ? () => props.removeTrack(props.track)
            : () => props.addTrack(props.track)
        }
      >
        {props.isPlaylistTrack ? "-" : "+"}
      </button>
    </>
  );
}

export default Track;
