import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";

function App() {
  return (
    <>
      <h1>SoundStash</h1>
      <SearchBar />
      <SearchResults />
      <Playlist />
    </>
  );
}

export default App;
