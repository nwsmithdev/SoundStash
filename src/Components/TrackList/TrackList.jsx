import styles from "./TrackList.module.css";
import Track from "../Track/Track.jsx";

function TrackList() {
  const tracksArr = [
    {
      title: "Hawaii Song",
      artist: "Stick Figure",
      album: "Smoke Stack",
      id: "01",
    },
    {
      title: "The Middle",
      artist: "Jimmy Eat World",
      album: "Bleed American",
      id: "02",
    },
    {
      title: "My Way",
      artist: "Frank Sinatra",
      album: "Nothing But The Best (2008)",
      id: "03",
    },
  ];

  return (
    <>
      {tracksArr.map((track) => {
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
