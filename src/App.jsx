import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlbumDetail from "./pages/AlbumDetails";
import Home from "./pages/Home";
import MusicContext from "./context/MusicContext";
import { useState } from "react";
import ArtistsDetails from "./pages/ArtistsDetails";
import SearchResult from "./pages/searchResult";
import SongsList from "./components/SongsList";
import PlaylistDetails from "./pages/PlaylistDetails";
import SongDetails from "./pages/SongDetails";



export default function App() {
  const [songs, setSongs] = useState([]); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null); 
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");

  const playMusic = async (downloadUrl, name, duration, image, id, artists) => {
    if (currentSong && currentSong.id === id) {
      if (isPlaying) {
        setIsPlaying(false);
        currentSong.audio.pause();
      } else {
        setIsPlaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        currentSong.audio.pause();
        setIsPlaying(false);
      }

      const newAudio = new Audio(downloadUrl[4]?.url || ""); // Safely access the link
      setCurrentSong({
        name,
        duration,
        image: image[2].url || image, // Use fallback if image is undefined
        id,
        audio: newAudio,
        artists,
      });

      setIsPlaying(true);
      await newAudio.play();
    }
  };

  const downloadSong = () => {
    if (currentSong?.audio?.currentSrc) {
      const link = document.createElement("a");
      link.href = currentSong.audio.currentSrc; // Use the currentSrc property as the download URL
      link.download = `${currentSong.name}.mp3`; // Set the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Download URL not available!");
    }
  };
  


  const nextSong = () => {
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);
      
      if (shuffle) {
        // Shuffle mode: Pick a random song
        const randomIndex = Math.floor(Math.random() * songs.length);
        const { downloadUrl, name, duration, image, id, artists } = songs[randomIndex];
        playMusic(downloadUrl, name, duration, image, id, artists);
      } else {
        // Regular mode: Go to next song
        if (index === songs.length - 1) {
          const { downloadUrl, name, duration, image, id, artists } = songs[0];
          playMusic(downloadUrl, name, duration, image, id, artists);
        } else {
          const { downloadUrl, name, duration, image, id, artists } = songs[index + 1];
          playMusic(downloadUrl, name, duration, image, id, artists);
        }
      }
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const index = songs.findIndex((song) => song.id === currentSong.id);

      if (shuffle) {
        // Shuffle mode: Pick a random song
        const randomIndex = Math.floor(Math.random() * songs.length);
        const { downloadUrl, name, duration, image, id, artists } = songs[randomIndex];
        playMusic(downloadUrl, name, duration, image, id, artists);
      } else {
        // Regular mode: Go to previous song
        if (index === 0) {
          const { downloadUrl, name, duration, image, id, artists } = songs[songs.length - 1];
          playMusic(downloadUrl, name, duration, image, id, artists);
        } else {
          const { downloadUrl, name, duration, image, id, artists } = songs[index - 1];
          playMusic(downloadUrl, name, duration, image, id, artists);
        }
      }
    }
  };

  const toggleRepeatMode = () => {
    setRepeatMode((prevMode) =>
      prevMode === "none" ? "one" : prevMode === "one" ? "all" : "none"
    );
  };

  const toggleShuffle = () => {
    setShuffle((prevState) => !prevState);
  };
  return (
    <>
    
    <MusicContext.Provider
      value={{
        songs,
        setSongs,
        playMusic,
        setIsPlaying,
        isPlaying,
        currentSong,
        nextSong,
        prevSong,
        shuffle,
        toggleShuffle,
        downloadSong,
        toggleRepeatMode,
        repeatMode,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists/:id" element={<ArtistsDetails />} />
          
          <Route path="/albums/:id" element={<AlbumDetail />} />
          <Route path="/search/:query" element={<SearchResult />} />

          <Route path="/albums/:id" element={<AlbumDetail /> || <SongsList />} />
          <Route path="/playlists/:id" element={<PlaylistDetails />} />

        </Routes>
      </Router>
    </MusicContext.Provider>
    </>);
}


