import styles from "./TrackList.module.css";
import Track from "../Track/Track.jsx";

function TrackList(props) {
  return (
    <>
      {props.tracks.map((track) => {
        return (
          <Track
            title={track.title}
            artist={track.artist}
            album={track.album}
            key={track.id}
          />
        );
      })}
    </>
  );
}

export default TrackList;
