import styles from "./Playlist.module.css";
import TrackList from "../TrackList/TrackList.jsx";

function Playlist(props) {
  return (
    <>
      <input
        type="text"
        value={props.name}
        aria-lable="Playlist Name"
        onChange={(e) => props.updatePlaylist(e.target.value)}
      />
      <TrackList
        tracks={props.trackListing}
        isPlaylistTrack={true}
        removeTrack={props.removeTrack}
      />
    </>
  );
}

export default Playlist;
