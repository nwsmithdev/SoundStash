import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Playlist from "../Playlist/Playlist.jsx";

function App() {
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

  const playlistName = "My Playlist";
  const playlistTracks = [
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
  ];

  return (
    <>
      <h1>SoundStash</h1>
      <SearchBar />
      <SearchResults tracks={tracksArr} />
      <Playlist name={playlistName} trackListing={playlistTracks} />
    </>
  );
}

export default App;
