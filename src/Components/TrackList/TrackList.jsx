import styles from "./TrackList.module.css";
import Track from "../Track/Track.jsx";

function TrackList(props) {
  return (
    <>
      {props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            addTrack={props.addTrack}
            removeTrack={props.removeTrack}
            isPlaylistTrack={props.isPlaylistTrack}
          />
        );
      })}
    </>
  );
}

export default TrackList;
