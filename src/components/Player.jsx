import { useContext, useState } from "react";
import { BiRepeat } from "react-icons/bi";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import VolumeController from "./VolumeController";
import MusicContext from "../context/MusicContext"; // Import the context

const Player = () => {
  const { currentSong, isPlaying, setIsPlaying, playMusic } = useContext(MusicContext); // Destructure context values
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const handlePlayPause = () => {
    if (currentSong?.audio) {
      if (isPlaying) {
        currentSong.audio.pause();
        setIsPlaying(false);
      } else {
        currentSong.audio.play();
        setIsPlaying(true);
      }
    }
  };

  const handleNextSong = () => {
    // Implement logic for skipping to the next song (if `tracks` is available in the context)
  };

  const handlePrevSong = () => {
    // Implement logic for skipping to the previous song (if `tracks` is available in the context)
  };

  return (
    <div className="flex flex-col fixed justify-between player bottom-0 w-full">
      <form className="flex">
        <input
          type="range"
          name="progress"
          id="progress"
          min={0}
          max={100}
          step="0.1"
          value={currentSong?.audio?.currentTime || 0}
          className="h-[3px] w-full text-emerald-500 range m-0"
          readOnly
        />
      </form>

      <div className="flex justify-between items-center h-[65px] px-3">
        {/* 1st Div */}
        <div className="flex justify-start items-center gap-5 lg:w-[30vw]">
          <img
            src={currentSong?.image || "/White_musify.svg"}
            alt={currentSong?.name || ""}
            width={80}
            className="rounded-3xl"
          />
          <div className="hidden lg:block">
            <span>{currentSong?.name || "No Song Playing"}</span>
            <p className="text-xs">{currentSong?.artists || "Unknown Artist"}</p>
          </div>
        </div>

        {/* 2nd Div */}
        <div className="flex text-xl lg:text-2xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
          <BiRepeat className="hover:text-emerald-400 cursor-pointer" />
          <IoMdSkipBackward className="hover:text-emerald-400 cursor-pointer" onClick={handlePrevSong} />
          {isPlaying ? (
            <FaPause className="hover:text-emerald-400 cursor-pointer" onClick={handlePlayPause} />
          ) : (
            <FaPlay className="hover:text-emerald-400 cursor-pointer" onClick={handlePlayPause} />
          )}
          <IoMdSkipForward className="hover:text-emerald-400 cursor-pointer" onClick={handleNextSong} />
          <PiShuffleBold className="hover:text-emerald-400 cursor-pointer" />
        </div>

        {/* 3rd Div */}
        <div
          className="flex text-xl lg:text-2xl cursor-pointer lg:mr-2 gap-5 pr-4 lg:w-[30vw] justify-end items-center"
          onMouseEnter={() => setIsVolumeVisible(true)}
          onMouseOut={() => setIsVolumeVisible(false)}
        >
          <FaDownload className="hover:text-emerald-400" />
          <HiSpeakerWave className="hover:text-emerald-400 hidden lg:block" />
          <VolumeController isVolumeVisible={isVolumeVisible} />
        </div>
      </div>
    </div>
  );
};

export default Player;
