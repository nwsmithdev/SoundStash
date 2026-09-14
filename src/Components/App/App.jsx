import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";
import redirectToSpotifyAuth from "../../util/Spotify.js";

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");

  const tracksArr = [
    {
      title: "Hawaii Song",
      artist: "Stick Figure",
      album: "Smoke Stack",
      id: "01",
      uri: "",
    },
    {
      title: "The Middle",
      artist: "Jimmy Eat World",
      album: "Bleed American",
      id: "02",
      uri: "",
    },
    {
      title: "My Way",
      artist: "Frank Sinatra",
      album: "Nothing But The Best (2008)",
      id: "03",
      uri: "",
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

  const trackURIs = playlistTracks.map((track) => track.uri);

  const updatePlaylist = (newName) => setPlaylistName(newName);

  const savePlaylist = () => {
    console.log(playlistName);
    console.log(trackURIs);
    setPlaylistName("My Playlist");
    setPlaylistTracks([]);
  };

  return (
    <>
      <h1>SoundStash</h1>
      <button onClick={redirectToSpotifyAuth}>Connect to Spotify</button>
      <SearchBar />
      <SearchResults tracks={tracksArr} addTrack={addTrack} />
      <Playlist
        name={playlistName}
        trackListing={playlistTracks}
        removeTrack={removeTrack}
        updatePlaylist={updatePlaylist}
        savePlaylist={savePlaylist}
      />
    </>
  );
}

export default App;
