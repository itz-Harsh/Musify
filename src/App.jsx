import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlbumDetail from "./pages/AlbumDetails";
import Home from "./pages/Home";
import MusicContext from "./context/MusicContext";
import { useState } from "react";
import ArtistsDetails from "./pages/ArtistsDetails";
import SearchResult from "./pages/searchResult";
import PlaylistDetails from "./pages/PlaylistDetails";
import Browse from "./pages/Browse";
import MyMusic from "./pages/myMusic";
import he from "he";
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const [songs, setSongs] = useState([null]); 
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
  
      const newAudio = new Audio(downloadUrl || downloadUrl[4]?.url);
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
  
      // 🎵 Update Notification Panel (Media Session API)
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: name,
          artist: artists?.map((a) => a.name).join(", "),
          album: "My Music App",
          artwork: [
            { src: image[2]?.url || image, sizes: "512x512", type: "image/png" },
          ],
        });
  
        // ⏮ Previous Track
        navigator.mediaSession.setActionHandler("previoustrack", () => {
          prevSong();
        });
  
        // ⏯ Play/Pause
        navigator.mediaSession.setActionHandler("play", () => {
          setIsPlaying(true);
          newAudio.play();
        });
  
        navigator.mediaSession.setActionHandler("pause", () => {
          setIsPlaying(false);
          newAudio.pause();
        });
  
        // ⏭ Next Track
        navigator.mediaSession.setActionHandler("nexttrack", () => {
          nextSong();
        });
  
        // 🔄 Seek (Optional)
        navigator.mediaSession.setActionHandler("seekforward", (event) => {
          newAudio.currentTime += event.seekOffset || 10; // Skip forward 10s
        });
  
        navigator.mediaSession.setActionHandler("seekbackward", (event) => {
          newAudio.currentTime -= event.seekOffset || 10; // Rewind 10s
        });
  
        // ⏹ Stop Music
        navigator.mediaSession.setActionHandler("stop", () => {
          newAudio.pause();
          setIsPlaying(false);
          setCurrentSong(null);
        });
      }
    }
  
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
        link.download = `${currentSong?.name
                                    ? he.decode(currentSong.name)
                                    : "Empty"}.mp3`; // Set the download filename
  
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
      const randomIndex = (currentIndex + 2) % songs.length;
      const nextTrack = songs[randomIndex];
      if (!nextTrack) return;
  
      const audioSource = nextTrack.downloadUrl ? nextTrack.downloadUrl[4]?.url || nextTrack.downloadUrl : nextTrack.audio;
      const { name, duration, image, id, artists } = nextTrack;
      
      playMusic(audioSource, name, duration, image, id, artists);
  
    } else {

      if (repeatMode === "all") {

        let nextIndex = (currentIndex + 1) % songs.length;  
        const nextTrack = songs[nextIndex];
        if (!nextTrack) return;
  
        const audioSource = nextTrack.downloadUrl ? nextTrack.downloadUrl[4]?.url || nextTrack.downloadUrl : nextTrack.audio;
        const { name, duration, image, id, artists } = nextTrack;
  
        playMusic(audioSource, name, duration, image, id, artists);

      } else {
       
        let nextIndex = (currentIndex + 1) % songs.length;
        const nextTrack = songs[nextIndex];
        if (!nextTrack) return;
  
        const audioSource = nextTrack.downloadUrl ? nextTrack.downloadUrl[4].url || nextTrack.downloadUrl : nextTrack.audio;
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
      prevIndex = (index - 3) % songs.length;
    } else {
      prevIndex = index === 0 ? songs.length - 1 : index - 1;
    }
    const song = songs[prevIndex];
    const audioSource = song.downloadUrl ? song.downloadUrl[4].url || song.downloadUrl : song.audio;
  
    playMusic(audioSource, song.name, song.duration, song.image, song.id, song.artists);
  };
  

  const toggleRepeatMode = () => {
  setRepeatMode((prevState) => {
    if (prevState === "none") return "one"; // Change to repeat the current song
    if (prevState === "one") return "all"; // Change to repeat the entire playlist
    return "none"; // No repeat
  });
};

  const toggleShuffle = () => {
    setShuffle((prevState) => !prevState);
  };
  return (
    <>
    <Analytics />
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

          <Route path="/playlists/:id" element={<PlaylistDetails />} />
          
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Music" element={<MyMusic />} />
          
        </Routes>
      </Router>
    </MusicContext.Provider>
  
    </>);
}


