import { useContext, useRef, useState, useEffect } from "react";
import { BiRepeat } from "react-icons/bi";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdDownload, MdMinimize } from "react-icons/md";
import { PiSpeakerLowFill } from "react-icons/pi";
import MusicContext from "../context/MusicContext";

const Player = () => {
  const {
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    shuffle,
    nextSong,
    prevSong,
    toggleShuffle,
    repeatMode,
    toggleRepeatMode,
    downloadSong,
  } = useContext(MusicContext);

  const [volume, setVolume] = useState(() => {
    return Number(localStorage.getItem("volume")) || 5;
  });
  const [isVisible, setIsVisible] = useState(false); // For showing and hiding the player
  const [isMinimized, setIsMinimized] = useState(false); // For minimizing the player

  const inputRef = useRef();

  useEffect(() => {
    if (currentSong && isPlaying) {
      setIsVisible(true); // Show player when a song is playing
    } else {
      setIsVisible(false); // Hide when no song is playing
    }
  }, [currentSong, isPlaying]);

  

  useEffect(() => {
    if (currentSong) {
      const audioElement = currentSong.audio;

      // Set initial volume from saved state
      audioElement.volume = volume / 100;

      const handleTimeUpdate = () => {
        const duration = Number(currentSong.duration);
        const currentTime = audioElement.currentTime;
        const newTiming = (currentTime / duration) * 100;
        if (inputRef.current) {
          inputRef.current.value = newTiming;
        }
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentSong, volume]);

  const handleProgressChange = (event) => {
    const newPercentage = parseFloat(event.target.value);
    const newTime = (newPercentage / 100) * Number(currentSong.duration);
    currentSong.audio.currentTime = newTime;
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value) / 100;
    setVolume(newVolume * 100);
    localStorage.setItem("volume", newVolume * 100); // Save volume to localStorage
    if (currentSong?.audio) {
      currentSong.audio.volume = newVolume;
    }
  };

  const handlePlayPause = () => {
    if (currentSong?.audio) {
      const audioElement = currentSong.audio;

      if (audioElement.paused) {
        audioElement
          .play()
          .then(() => {
            setIsPlaying(true);
            localStorage.setItem("currentSong", JSON.stringify(currentSong)); // Save current song to localStorage
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      } else {
        audioElement.pause();
        setIsPlaying(false);
      }
    }
  };

  const artistNames = Array.isArray(currentSong?.artists?.primary)
    ? currentSong.artists.primary.map((artist) => artist.name).join(", ")
    : "Unknown Artist";

  const handleMinimize = () => {
    setIsMinimized(!isMinimized); // Toggle minimize state
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 flex justify-center items-center bg-transparent transition-opacity duration-50 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-full max-w-6xl bg-[#222222] rounded-xl p-6 relative transition-all ease-in-out duration-700 ${
          isMinimized ? "h-[0px] justify-center w-[12rem]" : "h-[7.5rem]"
        }`}
      >
        {/* Minimize Button in Bottom Right Corner */}
        <MdMinimize
          className="absolute bottom-4 right-4 text-white text-2xl cursor-pointer"
          onClick={handleMinimize}
        />

        {!isMinimized && (
          <>
            {/* Playback Progress */}
            <form className="flex justify-center w-full mb-4">
              <input
                type="range"
                min={0}
                max={100}
                step="0.1"
                ref={inputRef}
                value={
                  currentSong?.audio?.currentTime
                    ? (currentSong.audio.currentTime / Number(currentSong.duration)) * 100
                    : 0
                }
                onChange={handleProgressChange}
                className="h-[3px] flex w-full text-emerald-500 range"
              />
            </form>

            {/* Player Controls */}
            <div className="flex justify-between items-center w-full mb-4">
              {/* Current Song Info */}
              <div className="flex items-center gap-5">
                <img
                  src={currentSong?.image || " "}
                  alt={currentSong?.name || ""}
                  width={55}
                  className="rounded-lg"
                />
                <div className="overflow-y-clip w-[14rem] h-[3.5rem]">
                  <span>{currentSong?.name || "No Song Playing"}</span>
                  <p className="text-xs text-gray-400">{artistNames}</p>
                </div>
              </div>

              {/* Playback Buttons */}
              <div className="flex flex-col items-center gap-5 w-[10rem]">
                <div className="flex gap-5">
                  <BiRepeat
                    className={`text-2xl cursor-pointer ${
                      repeatMode === "one"
                        ? "text-[#f84d5e]"
                        : repeatMode === "all"
                        ? "text-[#fd3a4e]"
                        : ""
                    }`}
                    onClick={toggleRepeatMode}
                    title={`Repeat Mode: ${
                      repeatMode === "none"
                        ? "Off"
                        : repeatMode === "one"
                        ? "Repeat One"
                        : "Repeat All"
                    }`}
                  />
                  <IoMdSkipBackward
                    className="hover:text-white hover:scale-110 text-2xl cursor-pointer"
                    onClick={prevSong}
                  />
                  {isPlaying ? (
                    <FaPause
                      className="hover:text-white hover:scale-110 text-2xl cursor-pointer"
                      onClick={handlePlayPause}
                    />
                  ) : (
                    <FaPlay
                      className="hover:text-white hover:scale-110 text-2xl cursor-pointer"
                      onClick={handlePlayPause}
                    />
                  )}
                  <IoMdSkipForward
                    className="hover:text-white hover:scale-110 text-2xl cursor-pointer"
                    onClick={nextSong}
                  />
                  <PiShuffleBold
                    className={`hover:text-white hover:scale-110 text-2xl cursor-pointer ${
                      shuffle ? "text-emerald-500" : ""
                    }`}
                    onClick={toggleShuffle}
                  />
                </div>
              </div>

              {/* Volume and Download */}
              <div className="flex items-center gap-5 justify-end">
                <MdDownload
                  className="hover:text-[#fd3a4e] text-2xl cursor-pointer"
                  onClick={downloadSong}
                  title="Download Song"
                />
                <div className="items-center gap-1 hidden lg:flex">
                  <PiSpeakerLowFill className="text-xl" />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume bg-gray-300 rounded-lg appearance-none cursor-pointer w-[80px]"
                    title="Volume"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
