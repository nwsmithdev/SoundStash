import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);

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

  const addTrack = (track) => {
    const isAlreadyAdded = playlistTracks.some(
      (existingTrack) => existingTrack.id === track.id,
    );
    if (!isAlreadyAdded) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    const updatedTracks = playlistTracks.filter(
      (existingTrack) => existingTrack.id !== track.id,
    );
    setPlaylistTracks(updatedTracks);
  };

  const playlistName = "My Playlist";

  return (
    <>
      <h1>SoundStash</h1>
      <SearchBar />
      <SearchResults tracks={tracksArr} addTrack={addTrack} />
      <Playlist
        name={playlistName}
        trackListing={playlistTracks}
        removeTrack={removeTrack}
      />
    </>
  );
}

export default App;
