import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";
import redirectToSpotifyAuth, {
  handleSpotifyCallback,
  searchTracks,
} from "../../util/Spotify.js";

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  useEffect(() => {
    console.log("App useEffect ran");
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.log("code from url:", code);
    if (code) {
      handleSpotifyCallback();
    }
  }, []);

  const [tracksArr, setTracksArr] = useState([
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
  ]);

  const searchSpotify = async (searchTerm) => {
    const searchResults = await searchTracks(searchTerm);
    if (Array.isArray(searchResults)) {
      setTracksArr(searchResults);
    }
  };

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
      <SearchBar searchSpotify={searchSpotify} />
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
