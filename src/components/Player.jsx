import { useContext, useRef, useState, useEffect } from "react";
import { IoIosClose, IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";
import { PiShuffleBold } from "react-icons/pi";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { FaPlay, FaPause, FaHeart, FaRegHeart } from "react-icons/fa";
import {
  MdDownload,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { CiMaximize1 } from "react-icons/ci";
import { PiSpeakerLowFill } from "react-icons/pi";
import MusicContext from "../context/MusicContext";
import ArtistItems from "./Items/ArtistItems";
import he from "he";
import { getSongById, getSuggestionSong } from "../../fetch";
import SongGrid from "./SongGrid";
import { Link } from "react-router";

const Player = () => {
  const {
    currentSong,
    song,
    playMusic,
    isPlaying,
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
  const [currentTime, setCurrentTime] = useState(0);
  const [detail, setDetails] = useState({});
  const [list, setList] = useState({});
  const [suggetions, setSuggetion] = useState([]);
  const [likedSongs, setLikedSongs] = useState(() => {
    return JSON.parse(localStorage.getItem("likedSongs")) || [];
  });

  const inputRef = useRef();

  useEffect(() => {
    if (!currentSong) return;

    const audio = currentSong?.audio;
    setCurrentTime(audio.currentTime);

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      const progress =
        (audio.currentTime / Number(currentSong?.duration)) * 100;
      inputRef.current.style.setProperty("--progress", `${progress}%`);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [currentSong, isPlaying]);

  const scrollRef = useRef(null);
  const scrollLeft = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 1000; // Scroll left by 800px
    }
  };

  const scrollRight = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 1000; // Scroll right by 800px
    }
  };

  useEffect(() => {
    setIsVisible(!!(currentSong || isPlaying));
  }, [currentSong, isPlaying]);

  const artistNames = currentSong?.artists?.primary
    ? currentSong.artists.primary.map((artist) => artist.name).join(", ")
    : "Unknown Artist";

  useEffect(() => {
    const albumDetail = async () => {
      const result = await getSongById(currentSong.id);
      setDetails(result.data[0]);
      // console.log(detail);
    };
    if (currentSong?.id) {
      albumDetail();
    }
  }, [currentSong]);

  useEffect(() => {
    const fetchSuggestions = async () => {
        if (!currentSong?.id) return;
        const suggestions = await getSuggestionSong(currentSong.id);

        setList(suggestions.data);
        setSuggetion(suggestions.data);
     
    };

    fetchSuggestions();

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

      const handleEndSong = () => {
        if (!currentSong || !currentSong.id) return; // Prevents running if currentSong is missing
        nextSong(); // Call nextSong when the current song ends
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", handleEndSong);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("ended", handleEndSong);
      };
    }
  }, [currentSong, volume, nextSong]);

  const handleProgressChange = (event) => {
    const newPercentage = parseFloat(event.target.value);
    const newTime = (newPercentage / 100) * Number(currentSong.duration);
    currentSong.audio.currentTime = newTime;
    setCurrentTime(newTime);

    // Update currentTime to match slider
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value) / 100;
    setVolume(newVolume * 100);
    localStorage.setItem("volume", newVolume * 100); // Save volume to localStorage
    if (currentSong?.audio) {
      currentSong.audio.volume = newVolume;
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
  const name = currentSong?.name || "Unknown Title";
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: he.decode(name),
        artist: he.decode(artistNames),
        album: "Musify",
        artwork: [
          {
            src: currentSong?.image || "/Unknown.png",
            sizes: "500x500",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => {
        playMusic(
          currentSong?.audio.currentSrc,
          currentSong?.name,
          currentSong?.duration,
          currentSong?.image,
          currentSong?.id,
          song
        );
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        playMusic(
          currentSong?.audio.currentSrc,
          currentSong?.name,
          currentSong?.duration,
          currentSong?.image,
          currentSong?.id,
          song
        );
      });

      navigator.mediaSession.setActionHandler("previoustrack", prevSong);
      navigator.mediaSession.setActionHandler("nexttrack", nextSong);
    }
  }, [currentSong, artistNames, playMusic, prevSong, nextSong, song, name]);
  const theme = document.documentElement.getAttribute("data-theme");

  if (currentSong) {
    if (repeatMode === "one") {
      currentSong.audio.loop = true;
    } else {
      currentSong.audio.loop = false;
    }
  }

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
                <span className=" text-xs ">{formatTime(currentTime)} </span>
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
                  style={{
                    background: `linear-gradient(to right, ${
                      theme === "dark" ? "#ddd" : "#09090B"
                    } ${
                      (currentTime / Number(currentSong?.duration)) * 100
                    }%, ${theme === "dark" ? "#252525" : "#dddddd"} ${
                      (currentTime / Number(currentSong?.duration)) * 100
                    }%)`,
                  }}
                  onChange={handleProgressChange}
                  className="range"
                />
                <span className=" text-xs">
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
                      <div className="flex flex-col overflow-y-clip p-1 w-[14rem] h-[2.9rem]">
                        <span className=" w-fit h-[1.5rem] overflow-hidden">
                          {currentSong?.name
                            ? he.decode(currentSong.name)
                            : "Empty"}
                        </span>

                        <span className="text-xs h-1 ">
                          {he.decode(artistNames)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:items-center gap-5   p-2">
                    <div className="flex gap-5 justify-end lg:justify-center items-center">
                      {repeatMode === "none" ? (
                        <LuRepeat
                          className={` text-2xl hidden lg:block cursor-pointer hover:text-[#ff3448] `}
                          onClick={toggleRepeatMode}
                          title={`Repeat Mode: ${
                            repeatMode === "none" ? "none" : "one"
                          }`}
                        />
                      ) : (
                        <LuRepeat1
                          className={
                            " text-2xl hidden lg:block cursor-pointer text-[#ff3448]"
                          }
                          onClick={toggleRepeatMode}
                          title={`Repeat Mode: ${
                            repeatMode === "none" ? "none" : "one"
                          }`}
                        />
                      )}
                      <IoMdSkipBackward
                        className="icon hidden lg:block hover:scale-110 text-2xl cursor-pointer"
                        onClick={prevSong}
                      />
                      <div className=" rounded-full p-2">
                        {isPlaying ? (
                          <FaPause
                            className="  p-[0.1rem] icon hover:scale-110 text-xl lg:text-2xl cursor-pointer"
                            onClick={() =>
                              playMusic(
                                currentSong?.audio.currentSrc,
                                currentSong?.name,
                                currentSong?.duration,
                                currentSong?.image,
                                currentSong?.id,
                                song
                              )
                            }
                          />
                        ) : (
                          <FaPlay
                            className=" icon p-[0.1rem] hover:scale-110 text-xl lg:text-2xl cursor-pointer"
                            onClick={() =>
                              playMusic(
                                currentSong?.audio.currentSrc,
                                currentSong?.name,
                                currentSong?.duration,
                                currentSong?.image,
                                currentSong?.id,
                                song
                              )
                            }
                          />
                        )}
                      </div>
                      <IoMdSkipForward
                        className="icon hidden lg:block hover:scale-110 text-2xl cursor-pointer"
                        onClick={nextSong}
                      />
                      <PiShuffleBold
                        className={` hidden lg:block hover:text-[#fd3a4e] text-2xl cursor-pointer ${
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
                        <FaRegHeart className="icon" />
                      )}
                    </button>
                    <MdDownload
                      className="hover:text-[#fd3a4e] icon  text-2xl cursor-pointer"
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
                        className="volume icon rounded-lg appearance-none cursor-pointer w-[80px] h-1"
                        style={{
                          background: `linear-gradient(to right, ${
                            theme === "dark" ? "#ddd" : "#09090B"
                          } ${volume}%, ${
                            theme === "dark" ? "#252525" : "#dddddd"
                          } ${volume}%)`,
                        }}
                        title="Volume"
                      />
                    </div>
                    <div className="flex">
                      <CiMaximize1
                        title="Maximize"
                        className="icon p-1 text-2xl rounded icon cursor-pointer"
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
              <div className="flex w-full bottom-0 flex-col p-2 pt-2 lg:h-[40rem] h-[45rem] gap-4 scroll-hide overflow-y-scroll rounded-tl-2xl rounded-tr-2xl Player scroll-smooth">
                <div className=" flex w-[97%] justify-end ">
                  <IoIosClose
                    className="  icon text-[3rem] cursor-pointer"
                    onClick={handleMaximized}
                  />
                </div>
                <div className=" ">
                  <div className="flex lg:flex-row flex-col">
                    <div className=" flex  justify-center items-center lg:pl-[2.5rem]">
                      <img
                        src={currentSong?.image || " "}
                        className=" h-[22rem] lg:h-[17rem]  rounded-lg object-cover shadow-2xl profile"
                      />
                    </div>

                    <div className="flex flex-col justify-center lg:w-[70%] lg:pl-5 p-1  gap-4">
                      <div className="flex  flex-col  gap-[0.5rem] mt-5 lg:ml-1 ml-[1.5rem]">
                        <span className=" text-2xl font-semibold h-auto  justify-between  flex  overflow-clip  ">
                          {currentSong?.name
                            ? he.decode(currentSong.name)
                            : "Empty"}

                        </span>
                        <span className="overflow-hidden  flex  w-[98%] mb-1  text-base font-medium  justify-between h-[1.84rem]      ">
                          {he.decode(artistNames)}
                          <span className="flex gap-3 justify-center place-items-center ">
                            <button
                              onClick={toggleLikeSong}
                              title="Like Song"
                              className=" "
                            >
                              {likedSongs.some(
                                (song) => song.id === currentSong?.id
                              ) ? (
                                <FaHeart className="text-red-500 text-2xl" />
                              ) : (
                                <FaRegHeart className="icon text-2xl hover:text-red-500" />
                              )}
                            </button>
                            <MdDownload
                              className="lg:hover:text-[#fd3a4e] active:text-[#fd3a4e]  flex self-center text-[1.8rem] cursor-pointer icon"
                              onClick={downloadSong}
                              title="Download Song"
                            />
                          </span>
                        </span>
                      </div>
                      <form className="flex items-center w-full gap-3 h-[0px]">
                        <span className="lg:hidden block  text-xs ">
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
                              ? (currentTime / Number(currentSong.duration)) *
                                100
                              : 0
                          }
                          style={{
                            background: `linear-gradient(to right, ${
                              theme === "dark" ? "#ddd" : "#252525"
                            } ${
                              (currentTime / Number(currentSong?.duration)) *
                              100
                            }%, ${theme === "dark" ? "#252525" : "#dddddd"} ${
                              (currentTime / Number(currentSong?.duration)) *
                              100
                            }%)`,
                          }}
                          onChange={handleProgressChange}
                          className="range"
                        />
                        <span className="lg:hidden block  text-xs">
                          {formatTime(currentSong?.duration || 0)}
                        </span>
                      </form>
                      <div className="flex flex-col items-center ">
                        <div className="flex items-center justify-end lg:w-full lg:gap-[20rem] gap-[0.5rem] ">
                          <div className="flex  items-center gap-5 p-8 w-full lg:w-[36%] justify-end ">
                            {repeatMode === "none" ? (
                              <LuRepeat
                                className={` text-2xl  cursor-pointer lg:hover:text-[#ff3448] `}
                                onClick={toggleRepeatMode}
                                title={`Repeat Mode: ${
                                  repeatMode === "none" ? "none" : "one"
                                }`}
                              />
                            ) : (
                              <LuRepeat1
                                className={
                                  " text-2xl cursor-pointer text-[#ff3448]"
                                }
                                onClick={toggleRepeatMode}
                                title={`Repeat Mode: ${
                                  repeatMode === "none" ? "none" : "one"
                                }`}
                              />
                            )}
                            <IoMdSkipBackward
                              className="icon lg:hover:scale-110 text-3xl cursor-pointer"
                              onClick={prevSong}
                            />
                            <div>
                              {isPlaying ? (
                                <FaPause
                                  className="p-[0.1rem] icon lg:hover:scale-110 text-3xl cursor-pointer"
                                  onClick={() =>
                                    playMusic(
                                      currentSong?.audio.currentSrc,
                                      currentSong?.name,
                                      currentSong?.duration,
                                      currentSong?.image,
                                      currentSong?.id,
                                      song
                                    )
                                  }
                                />
                              ) : (
                                <FaPlay
                                  className=" icon p-[0.1rem] lg:hover:scale-110 text-3xl cursor-pointer"
                                  onClick={() =>
                                    playMusic(
                                      currentSong?.audio.currentSrc,
                                      currentSong?.name,
                                      currentSong?.duration,
                                      currentSong?.image,
                                      currentSong?.id,
                                      song
                                    )
                                  }
                                />
                              )}
                            </div>
                            <IoMdSkipForward
                              className="icon lg:hover:scale-110 text-3xl cursor-pointer"
                              onClick={nextSong}
                            />
                            <PiShuffleBold
                              className={` text-3xl cursor-pointer  lg:hover:text-[#fd3a4e] ${
                                shuffle ? " text-[#fd3a4e] " : ""
                              }`}
                              onClick={toggleShuffle}
                            />
                          </div>

                          <IoShareSocial
                            className="icon text-3xl hidden lg:block cursor-pointer  lg:hover:scale-105 mr-4 "
                            onClick={() =>
                              navigator.share({
                                title: currentSong.name,
                                text: `Listen to ${currentSong.name} on Musify`,
                                url: `${window.location.origin}/albums/${detail.album.id}`,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col overflow-hidden  p-1">
                    <div>
                       {suggetions.length >= 0 && (
                          <div className="flex flex-col justify-center items-center w-full ">
                            <h2 className="pr-1 m-4 text-xl lg:text-2xl font-semibold w-full ml-[2.5rem] lg:ml-[5.5rem] ">
                              You Might Like
                            </h2>
                            <div className="flex justify-center items-center gap-3 w-full">
                              {/* Left Arrow */}
                               <MdOutlineKeyboardArrowLeft
                                className="text-3xl hover:scale-125 cursor-pointer h-[9rem]   hidden lg:block arrow-btn"
                                onClick={() => scrollLeft(scrollRef)}
                              />
                              <div
                                className="grid grid-rows-1  grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-[.35rem] w-full  px-3 lg:px-0 scroll-smooth"
                                ref={scrollRef}
                              >
                                {suggetions?.map((song, index) => (
                                  <SongGrid
                                    key={song.id || index}
                                    {...song}
                                     song={list}
                                  /> 
                                ))}
                              </div>
                              {/* Right Arrow */}
                             <MdOutlineKeyboardArrowRight
                                className="text-3xl hover:scale-125  cursor-pointer h-[9rem] hidden lg:block arrow-btn"
                                onClick={() => scrollRight(scrollRef)}
                              />
                            </div> 
                          </div>
                        )}
                       
                    </div>
                    <div className="flex flex-col pt-3 ">
                      <h2 className="pr-1 text-xl lg:text-2xl font-semibold  w-full ml-[2rem] lg:ml-[3.5rem] lg:m-3 ">
                        Artists
                      </h2>
                      <div className="grid grid-flow-col lg:w-max w-full scroll-smooth gap-[1rem] lg:gap-[1.5rem] lg:pl-[2rem] pl-[1rem] overflow-x-scroll scroll-hide ">
                        {currentSong.artists.primary.map((artist, index) => (
                          <ArtistItems
                            key={`${artist.id || index}`}
                            {...artist}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-[2rem] ">
                      <div className="flex flex-col ">
                        <h2 className="pr-1 text-xl lg:text-2xl font-semibold  w-full ml-[2rem] lg:ml-[3.5rem] ">
                          From Album ...
                        </h2>
                        <Link
                          to={`/albums/${detail.album.id}`}
                          className="card  w-[12.5rem] h-fit overflow-clip  border-[0.1px]  p-1  rounded-lg lg:mx-[2rem] mt-[1rem] "
                        >
                          <div className="p-1">
                            <img
                              src={currentSong.image || "/Unknown.png"}
                              alt={name}
                              className="rounded-lg "
                            />
                          </div>
                          <div className="w-full flex flex-col justify-center pl-2">
                            <span className="font-semibold text-[1.1rem] overflow-x-clip ">
                              {detail.album.name
                                ? he.decode(detail.album.name)
                                : ""}
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
