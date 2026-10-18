import styles from "./App.module.css";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";
import redirectToSpotifyAuth, {
  handleSpotifyCallback,
  searchTracks,
  savePlaylistToSpotify,
} from "../../util/Spotify.js";

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    console.log("App useEffect ran");
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.log("code from url:", code);
    if (code) {
      handleSpotifyCallback();
    }
  }, []);

  const [tracksArr, setTracksArr] = useState([]);

  const searchSpotify = async (searchTerm) => {
    setIsSearching(true);
    try {
      const searchResults = await searchTracks(searchTerm);
      if (Array.isArray(searchResults)) {
        setTracksArr(searchResults);
      }
    } finally {
      setIsSearching(false);
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

  const savePlaylist = async () => {
    setSaveStatus(null);
    setIsSaving(true);
    setSaveMessage("");

    try {
      const saveResult = await savePlaylistToSpotify(playlistName, trackURIs);

      if (saveResult) {
        setPlaylistName("My Playlist");
        setPlaylistTracks([]);
        setSaveMessage("Playlist saved successfully! Your music is now available on Spotify.");
        setSaveStatus("success");
      } else {
        setSaveMessage("Unable to save your playlist. Please try again.");
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Error saving Spotify playlist:", error);
      setSaveMessage("Unable to save your playlist. Please try again.");
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.app}>
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>♫</div>
        <h1>SoundStash</h1>
      </div>

      <button
        className={styles.connectButton}
        onClick={redirectToSpotifyAuth}
      >
        Connect to Spotify
      </button>
    </header>

    <section className={styles.intro}>
      <p className={styles.eyebrow}>YOUR MUSIC, YOUR WAY</p>
      <h2>Your music. Your mix.</h2>
      <p>
        Find your favorite tracks, create your perfect mix,
        and save it directly to Spotify.
      </p>
    </section>

    <section className={styles.searchSection}>
      <SearchBar searchSpotify={searchSpotify} isSearching={isSearching}/>
    </section>

      <main className={styles.content}>
        <section className={styles.resultsPanel}>
          <SearchResults
            tracks={tracksArr}
            addTrack={addTrack}
          />
        </section>

        <section className={styles.playlistPanel}>
          <Playlist
            name={playlistName}
            trackListing={playlistTracks}
            removeTrack={removeTrack}
            updatePlaylist={updatePlaylist}
            savePlaylist={savePlaylist}
            isSaving={isSaving}
            saveMessage={saveMessage}
            saveStatus={saveStatus}
          />
        </section>
      </main>

      <footer className={styles.footer}>
        Built with React and the Spotify Web API.
      </footer>
    </div>
  );
}

export default App;
