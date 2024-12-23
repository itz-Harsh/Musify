import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumDetail from './pages/AlbumDetails';
import Home from './pages/Home';
import MusicContext from './context/MusicContext';
import { useState } from 'react';

function App() {
  const [tracks, setTracks] = useState([]); // All available tracks
  const [isPlaying, setIsPlaying] = useState(false); // Playback status
  const [currentSong, setCurrentSong] = useState(null); // Currently playing song

  const playMusic = async (track, name, duration, image, id, artists) => {
    try {
      if (!track) {
        console.error('No track provided.');
        return;
      }

      if (!track.preview_url) {
        console.log('Preview URL is not available for this track.');
        return;
      }

      // Pause the current song if playing
      if (currentSong?.audio) {
        currentSong.audio.pause();
      }

      // If the track clicked is already the current track
      if (currentSong && currentSong.id === id) {
        if (isPlaying) {
          setIsPlaying(false);
        } else {
          await currentSong.audio.play();
          setIsPlaying(true);
        }
      } else {
        // Create new audio object and play it
        const newAudio = new Audio(track.preview_url);
        newAudio.onended = () => setIsPlaying(false); // Stop when done

        setCurrentSong({
          name,
          duration,
          image: image[2].link,
          id,
          audio: newAudio,
          artists,
        });

        await newAudio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing music:", error);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        tracks,
        setTracks,
        isPlaying,
        setIsPlaying,
        currentSong,
        playMusic,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums/:id" element={<AlbumDetail />} />
        </Routes>
      </Router>
    </MusicContext.Provider>
  );
}

export default App;
