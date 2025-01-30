import { useContext, useRef, useState, useEffect } from "react";
import { BiRepeat } from "react-icons/bi";
import { IoIosClose, IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay, FaPause, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { CiMaximize1 } from "react-icons/ci";
import { PiSpeakerLowFill } from "react-icons/pi";
import MusicContext from "../context/MusicContext";
import ArtistItems from "./Items/ArtistItems";


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
    return Number(localStorage.getItem("volume")) || 100;
  });

  const [isVisible, setIsVisible] = useState(false); // For showing and hiding the player
  const [isMaximized, setisMaximized] = useState(false); // For minimizing the player
  const [currentTime, setCurrentTime] = useState(0); // Real-time song progress
  const [likedSongs, setLikedSongs] = useState(() => {
    return JSON.parse(localStorage.getItem("likedSongs")) || [];
  });

  const inputRef = useRef();

  useEffect(() => {
    setIsVisible(!!(currentSong || isPlaying));
  }, [currentSong, isPlaying]);

  const artistNames = currentSong?.artists?.primary
    ? currentSong.artists.primary.map((artist) => artist.name).join(", ")
    : "Unknown Artist";
  

  useEffect(() => {
    if (currentSong) {
      const audioElement = currentSong.audio;

      audioElement.volume = volume / 100;

      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime); // Update currentTime state
        const duration = Number(currentSong.duration);
        const newTiming = (audioElement.currentTime / duration) * 100;
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
    setCurrentTime(newTime); // Update currentTime to match slider
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

  const handleMaximized = () => {
    setisMaximized(!isMaximized); // Toggle minimize state
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const toggleLikeSong = () => {
    if (!currentSong) return;

    // Extract only necessary properties
    const songData = {
      id: currentSong.id,
      name: currentSong.name,
      audio: currentSong.audio.currentSrc, // Ensure this is a URL
      duration: currentSong.duration,
      image: currentSong.image,
      artists: currentSong.artists,
    };

    const updatedLikedSongs = likedSongs.some(
      (song) => song.id === currentSong.id
    )
      ? likedSongs.filter((song) => song.id !== currentSong.id) // Remove song if already liked
      : [...likedSongs, songData]; // Add cleaned song data

    setLikedSongs(updatedLikedSongs);
    localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));
  };

  return (
    <div
      className={` ${isVisible ? "lg:flex " : "hidden"}
      fixed bottom-14 lg:bottom-0 left-0 w-screen z-20 flex   justify-center items-center   `}
    >
      <div
        className={`flex flex-col h-auto w-screen bg-auto rounded-tl-xl rounded-tr-xl  relative transition-all ease-in-out duration-500  ${
          isMaximized
            ? "  pt-[26rem] backdrop-brightness-[0.4]"
            : "lg:h-[6rem] h-auto p-4 Player"
        }`}
      >
        <div className="flex flex-col w-full">
          {!isMaximized && (
            <>
              <form className="flex items-center w-full mb-4 gap-3 h-[0px]">
                <span className="text-white text-xs ">
                  {formatTime(currentTime)}{" "}
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step="0.1"
                  ref={inputRef}
                  value={
                    currentSong?.audio?.currentTime
                      ? (currentTime / Number(currentSong.duration)) * 100
                      : 0
                  }
                  onChange={handleProgressChange}
                  className="h-[3px] flex w-full text-emerald-500 range "
                />
                <span className="text-white text-xs">
                  {formatTime(currentSong?.duration || 0)}
                </span>
              </form>
              <div className="h-[3rem] w-full">
                <div className="flex justify-between items-center  mb-4">
                  <div
                    className="flex w-full  lg:w-auto"
                    onClick={handleMaximized}
                  >
                    <div className="flex items-center gap-3 ">
                      <img
                        src={currentSong?.image || " "}
                        alt={currentSong?.name || ""}
                        width={55}
                        className="rounded"
                      />
                      <div className="flex flex-col overflow-y-clip w-[15rem] h-[2.9rem]">
                        <span>{currentSong?.name || "No Song Playing"}</span>
                        <span className="text-xs text-gray-400">
                          {artistNames}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:items-center gap-5  w-full lg:w-[90rem] p-2">
                    <div className="flex gap-5 justify-end lg:justify-center items-center">
                      <BiRepeat
                        className={`text-2xl hidden lg:block cursor-pointer ${
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
                        className=" hidden lg:block hover:scale-110 text-2xl cursor-pointer"
                        onClick={prevSong}
                      />
                      <div className="  bg-[#292929] active:bg-[#1d1d1d] rounded-full p-2">
                        {isPlaying ? (
                          <FaPause
                            className="  p-[0.1rem] text-zinc-200 hover:scale-110 text-xl lg:text-2xl cursor-pointer"
                            onClick={handlePlayPause}
                          />
                        ) : (
                          <FaPlay
                            className=" text-zinc-200 p-[0.1rem] hover:scale-110 text-xl lg:text-2xl cursor-pointer"
                            onClick={handlePlayPause}
                          />
                        )}
                      </div>
                      <IoMdSkipForward
                        className=" hidden lg:block hover:scale-110 text-2xl cursor-pointer"
                        onClick={nextSong}
                      />
                      <PiShuffleBold
                        className={` hidden lg:block hover:scale-110 text-2xl cursor-pointer ${
                          shuffle ? "text-[#fd3a4e]" : ""
                        }`}
                        onClick={toggleShuffle}
                      />
                    </div>
                  </div>

                  <div className="lg:flex hidden  items-center gap-5 justify-end">
                    <button onClick={toggleLikeSong} title="Like Song">
                      {likedSongs.some(
                        (song) => song.id === currentSong?.id
                      ) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-white" />
                      )}
                    </button>
                    <MdDownload
                      className="hover:text-[#fd3a4e]  text-2xl cursor-pointer"
                      onClick={downloadSong}
                      title="Download Song"
                    />
                    <div className="items-center gap-1 flex ">
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
                    <div className="flex">
                      <CiMaximize1
                        title="Maximize"
                        className=" p-1 text-white hover:text-[#fd3a4e] text-2xl rounded hover:bg-zinc-800 cursor-pointer"
                        onClick={handleMaximized}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {isMaximized && (
            <>
              {/* <Navbar /> */}
              <div className="flex w-full bottom-0 flex-col p-2 pt-2 lg:h-auto h-[46rem] gap-4 scroll-hide overflow-y-scroll rounded-tl-2xl rounded-tr-2xl Player">
                <div className=" flex w-[97%] justify-end ">
                  <IoIosClose
                    className="  text-white text-[3rem] cursor-pointer"
                    onClick={handleMaximized}
                  />
                </div>
                <div className="flex flex-col  lg:h-[35rem]   gap-3 h-screen   ">
                  <div className=" flex  justify-center items-center">
                    <img
                      src={currentSong?.image || " "}
                      className=" h-[22rem] lg:h-[24.5rem]  rounded-lg object-cover shadow-2xl shadow-zinc-700"
                    />
                  </div>
                  <div className="flex  flex-col  gap-[0.5rem]">
                    <span className=" text-2xl font-semibold h-auto  justify-start  pl-[2.5rem] flex  overflow-clip  ">
                      {currentSong?.name}
                    </span>
                    <span className="overflow-hidden  flex  w-[95%]  text-base font-medium text-zinc-400 justify-between h-[1.84rem] pl-[2.5rem]    ">
                      {artistNames}

                      <div className="flex gap-4 items-center">
                        <button onClick={toggleLikeSong} title="Like Song">
                          {likedSongs.some(
                            (song) => song.id === currentSong?.id
                          ) ? (
                            <FaHeart className="text-red-500 text-2xl" />
                          ) : (
                            <FaRegHeart className="text-white text-2xl" />
                          )}
                        </button>
                        <MdDownload
                          className="hover:text-[#fd3a4e]  flex place-self-start text-[1.8rem] cursor-pointer text-white"
                          onClick={downloadSong}
                          title="Download Song"
                        />
                      </div>
                    </span>
                  </div>
                  <div className="flex flex-col justify-center items-center ">
                    <form className="flex items-center w-full  mb-1 gap-3 p-3 h-[0px]">
                      <span className="text-white text-xs ">
                        {formatTime(currentTime)}{" "}
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step="0.1"
                        ref={inputRef}
                        value={
                          currentSong?.audio?.currentTime
                            ? (currentTime / Number(currentSong.duration)) * 100
                            : 0
                        }
                        onChange={handleProgressChange}
                        className="h-[3px] flex w-full translate-y-[2px] text-emerald-500 range "
                      />
                      <span className="text-white text-xs">
                        {formatTime(currentSong?.duration || 0)}
                      </span>
                    </form>
                    <div className="flex flex-col  gap-10 justify-center">
                      <div className="flex  items-center gap-5 bg-zinc800 p-8">
                        <BiRepeat
                          className={`text-3xl cursor-pointer ${
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
                          className="hover:text-white hover:scale-110 text-3xl cursor-pointer"
                          onClick={prevSong}
                        />
                        {isPlaying ? (
                          <FaPause
                            className="hover:text-white  hover:scale-110 text-3xl cursor-pointer"
                            onClick={handlePlayPause}
                          />
                        ) : (
                          <FaPlay
                            className="hover:text-white hover:scale-110 text-3xl cursor-pointer"
                            onClick={handlePlayPause}
                          />
                        )}
                        <IoMdSkipForward
                          className="hover:text-white hover:scale-110 text-3xl cursor-pointer"
                          onClick={nextSong}
                        />
                        <PiShuffleBold
                          className={`hover:text-white hover:scale-110 text-3xl cursor-pointer ${
                            shuffle ? "text-[#fd3a4e]" : ""
                          }`}
                          onClick={toggleShuffle}
                        />
                      </div>
                      <div className="items-center gap-1 lg:flex hidden relative -translate-y-[6rem] translate-x-[30rem]  ">
                        <PiSpeakerLowFill className="text-xl" />
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume bg-gray-300 rounded-lg appearance-none cursor-pointer w-[9rem]"
                          title="Volume"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col pt-3 -pl-1">
                    <h2 className="text-3xl font-medium pl-[2rem] lg:w-full w-[50%] flex lg:justify-start justify-center">
                      Artists
                    </h2>
                    <div className="grid grid-flow-col justify-between lg:w-max scroll-smooth gap-[1.5rem] p-[2.5rem] overflow-x-auto scroll ">
                      {currentSong?.artists?.primary.map((artist, index) => (
                        <ArtistItems
                          key={`${artist.id || index}`}
                          {...artist}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Player;
