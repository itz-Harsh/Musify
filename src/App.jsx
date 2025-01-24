import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlbumDetail from "./pages/AlbumDetails";
import Home from "./pages/Home";
import MusicContext from "./context/MusicContext";
import { useState } from "react";
import ArtistsDetails from "./pages/ArtistsDetails";
import SearchResult from "./pages/searchResult";
import SongsList from "./components/SongsList";
import PlaylistDetails from "./pages/PlaylistDetails";


export default function App() {
  const [songs, setSongs] = useState([null]); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null); 
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");

  const playMusic = async (downloadUrl, name, duration, image, id, artists) => {
    if (currentSong?.audio) {
      currentSong.audio.pause();
      currentSong.audio.src = ""; // Clear audio source to release memory
    }
  
    const newAudio = new Audio(downloadUrl[4]?.url || downloadUrl);
    newAudio.addEventListener("ended", nextSong); // Auto-play next song when current song ends

    setCurrentSong({
      name,
      duration,
      image: image[2]?.url || image,
      id,
      audio: newAudio,
      artists,
    });
  
    setIsPlaying(true);
    await newAudio.play();
  };
  

  const downloadSong = async () => {
    if (currentSong?.audio?.currentSrc) {
      try {
        const response = await fetch(currentSong.audio.currentSrc); // Fetch the audio file
        const blob = await response.blob(); // Convert the response to a Blob object
  
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // Create an object URL from the Blob
        link.download = `${currentSong.name}.mp3`; // Set the download filename
  
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link);
  
        // Revoke the object URL to release memory
        URL.revokeObjectURL(link.href);
  
      } catch (error) {
        console.error("Error downloading the song:", error);
        alert("Failed to download the song!");
      }
    } else {
      alert("Download URL is not available!");
    }
  };
  



  const nextSong = () => {
    if (!currentSong) return;
  
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  
    if (shuffle) {
      // Shuffle mode: Pick a random song
      const randomIndex = Math.floor(Math.random() * songs.length);
      const { downloadUrl, name, duration, image, id, artists } = songs[randomIndex];
      playMusic(downloadUrl, name, duration, image, id, artists);
    } else if (repeatMode === "one") {
      // Repeat current song
      const { downloadUrl, name, duration, image, id, artists } = currentSong;
      playMusic(downloadUrl, name, duration, image, id, artists);
    } else {
      // Normal mode or Repeat All
      const nextIndex = (currentIndex + 1) % songs.length;
      const { downloadUrl, name, duration, image, id, artists } = songs[nextIndex];
      playMusic(downloadUrl, name, duration, image, id, artists);
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
    setRepeatMode((nextSong) =>
      nextSong === "none" ? "one" : nextSong === "one" ? "all" : "none"
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


