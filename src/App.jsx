import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlbumDetail from "./pages/AlbumDetails";
import Home from "./pages/Home";
import MusicContext from "./context/MusicContext";
import { useState } from "react";
import ArtistsDetails from "./pages/ArtistsDetails";
import SearchResult from "./pages/searchResult";
import SongsList from "./components/SongsList";
import PlaylistDetails from "./pages/PlaylistDetails";
import Browse from "./pages/Browse";
import MyMusic from "./pages/myMusic";



export default function App() {
  const [songs, setSongs] = useState([null]); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null); 
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");

  const playMusic = async (downloadUrl, name, duration, image, id, artists ) => {

    const audioUrl = downloadUrl[4]?.url || downloadUrl;
  
    // Pause the current song and clear the source to release memory
    if (currentSong?.audio) {
      currentSong.audio.pause();
      currentSong.audio.src = ""; // Clear audio source to release memory
    }
  
    const newAudio = new Audio(audioUrl || downloadUrl);
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
  
    saveToLocalStorage({ downloadUrl, id, name, duration, image, artists });

    
  };
  
  const saveToLocalStorage = (song) => {
    let playedSongs = JSON.parse(localStorage.getItem("playedSongs")) || [];
  
  
    if (!playedSongs.some(existingSong => existingSong.id === song.id)) {
      playedSongs.unshift(song);
    }
  
    if (playedSongs.length > 20) {
      playedSongs = playedSongs.slice(0, 20);
    }
  
    // Save the updated list back to localStorage
    localStorage.setItem("playedSongs", JSON.stringify(playedSongs));
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
    if (!currentSong || songs.length === 0) return;
  
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  
   
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      const nextTrack = songs[randomIndex];
      if (!nextTrack) return;
  
      const audioSource = nextTrack.downloadUrl ? nextTrack.downloadUrl[4]?.url || nextTrack.downloadUrl[0]?.url : nextTrack.audio;
      const { name, duration, image, id, artists } = nextTrack;
      
      playMusic(audioSource, name, duration, image, id, artists);
  
    } else {
      // Repeat Mode: "one" will repeat the current song
      if (repeatMode === "one") {
        const audioSource = currentSong.audio.src;  // Use the current song's audio source
        const { name, duration, image, id, artists } = currentSong;
        playMusic(audioSource, name, duration, image, id, artists);
  
      } else if (repeatMode === "all") {
        // Repeat Mode "all" will go to next song and loop the playlist
        let nextIndex = (currentIndex + 1) % songs.length;  // Move to next song, wrap to the start if needed
        const nextTrack = songs[nextIndex];
        if (!nextTrack) return;
  
        const audioSource = nextTrack.downloadUrl ? nextTrack.downloadUrl[4]?.url || nextTrack.downloadUrl[0]?.url : nextTrack.audio;
        const { name, duration, image, id, artists } = nextTrack;
  
        playMusic(audioSource, name, duration, image, id, artists);
      } else {
        // Normal mode (no repeat or shuffle): go to the next song sequentially
        let nextIndex = (currentIndex + 1) % songs.length;  // Sequential next
        const nextTrack = songs[nextIndex];
        if (!nextTrack) return;
  
        const audioSource = nextTrack.downloadUrl ? nextTrack.downloadUrl[4]?.url || nextTrack.downloadUrl[0]?.url : nextTrack.audio;
        const { name, duration, image, id, artists } = nextTrack;
  
        playMusic(audioSource, name, duration, image, id, artists);
      }
    }
  };
  

  const prevSong = () => {
    if (!currentSong || songs.length === 0) return;
  
    const index = songs.findIndex((song) => song.id === currentSong.id);
  
    let prevIndex;
    if (shuffle) {
      // Shuffle mode: Pick a random song
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      // Regular mode: Go to previous song (loop back to last song if at index 0)
      prevIndex = index === 0 ? songs.length - 1 : index - 1;
    }
  
    // Extract the song data correctly
    const song = songs[prevIndex];
    const audioSource = song.downloadUrl?.[4]?.url || song.audio; // Handle both types of song data
  
    playMusic(audioSource, song.name, song.duration, song.image, song.id, song.artists);
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

          {/* <Route path="/albums/:id" element={<AlbumDetail /> || <SongsList />} /> */}
          <Route path="/playlists/:id" element={<PlaylistDetails />} />
          
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Music" element={<MyMusic />} />
          
        </Routes>
      </Router>
    </MusicContext.Provider>
  
    </>);
}


