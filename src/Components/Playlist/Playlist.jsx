import styles from "./Playlist.module.css";
import TrackList from "../TrackList/TrackList.jsx";

function Playlist(props) {
  return (
    <>
      <h3>{props.name}</h3>
      <TrackList
        tracks={props.trackListing}
        isPlaylistTrack={true}
        removeTrack={props.removeTrack}
      />
    </>
  );
}

export default Playlist;
