import { useContext, useRef, useState, useEffect } from "react";
import { BiRepeat } from "react-icons/bi";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { PiSpeakerLowFill } from "react-icons/pi";

import MusicContext from "../context/MusicContext"; // Import the context

const Player = () => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    shuffle,
    nextSong,
    prevSong,
    toggleShuffle,
    repeatMode,
    toggleRepeatMode,
    downloadSong,
  } = useContext(MusicContext); // Destructure context values

  const [volume, setVolume] = useState(50);

  const inputRef = useRef();

  useEffect(() => {
    if (currentSong) {
      const audioElement = currentSong.audio;

      const handleTimeUpdate = () => {
        const duration = Number(currentSong.duration);
        const currentTime = audioElement.currentTime;
        const newTiming = (currentTime / duration) * 100;
        inputRef.current.value = newTiming;
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentSong]); // Re-run when currentSong changes

  const handleProgressChange = (event) => {
    const newPercentage = parseFloat(event.target.value);
    const newTime = (newPercentage / 100) * Number(currentSong.duration);
    currentSong.audio.currentTime = newTime;
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value) / 100;
    setVolume(newVolume * 100); // Update volume state
    if (currentSong?.audio) {
      currentSong.audio.volume = newVolume; // Set audio volume
    }
  };

 

  const handlePlayPause = () => {
    if (currentSong?.audio) {
      const audioElement = currentSong.audio;

      if (audioElement.paused) {
        audioElement
          .play()
          .then(() => setIsPlaying(true))
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

  return (
    <div className="flex flex-col fixed bottom-0 w-full player">
      {/* Playback Progress */}
      <form className="flex justify-center">
      
        <input
          type="range"
          min={0}
          max={100}
          step="0.1"
          ref={inputRef}
          onChange={handleProgressChange}
          className="h-[3px] w-full  text-emerald-500 range m-0"
        />
      </form>

      {/* Player Controls */}
      <div className="flex justify-between items-center h-[65px] px-3">
        {/* Current Song Info */}
        <div className="flex items-center gap-5 lg:w-[25vw]">
        
          <img
            src={currentSong?.image || " "}
            alt={currentSong?.name || ""}
            width={55}
            className="rounded-lg"
          />
          <div className="hidden lg:block">
            <span>{currentSong?.name || "No Song Playing"}</span>
            <p className="text-xs text-gray-400">{artistNames}</p>
          </div>
        </div>

        {/* Playback Buttons */}
        <div className="flex flex-col items-center lg:w-[40vw]">
          <div className="flex gap-5 ml-[-4rem]">
            <BiRepeat
              className={` text-2xl cursor-pointer ${
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
        <div className="flex items-center gap-5 lg:w-[20vw] justify-end">
          <MdDownload
            className="hover:text-[#fd3a4e] text-2xl cursor-pointer"
            onClick={downloadSong}
            title="Download Song"
          />
          <div className="flex items-center gap-2">
            <PiSpeakerLowFill className="text-xl" />
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={handleVolumeChange}
              className="h-[2px] bg-gray-300 rounded-lg appearance-none cursor-pointer hidden lg:block w-[] volume "
              title="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
