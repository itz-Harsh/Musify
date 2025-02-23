import { GoPlay } from "react-icons/go";
import { useContext, useState } from "react";
import MusicContext from "../context/MusicContext";
import he from "he";

const SongsList = ({ name, artists, duration, downloadUrl, image, id }) => {

  const [hovering, setHovering] = useState(false);
  const { song } = useContext(MusicContext);

  const convertTime = (seconds) => {
    if (!seconds || typeof seconds !== "number") {
      return "0:00"; // Fallback for invalid duration
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const { isPlaying, currentSong, playMusic } = useContext(MusicContext);

  const imageUrl = image[2]?.url || image; // Safely access the image URL
  const artistNames = Array.isArray(artists?.primary)
    ? artists.primary?.map((artist) => artist.name).join(", ")
    : "Unknown Artist";

    downloadUrl = downloadUrl ? downloadUrl[4]?.url  || downloadUrl : song.audio;

  const decodeName = (name) => he.decode(name);
//  console.log(song);
  return (
    <div
      onClick={() =>
        playMusic(downloadUrl, name, duration, imageUrl, id, artists , song)
      }
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="overflow-clip h-[3.5rem] w-full song-item flex justify-between items-center p-2 border-b-[1px] border-zinc-800 song-info"
    >
      <div className="relative cursor-pointer">
        <img
          src={imageUrl}
          alt=""
          className="w-[5rem] object-cover transition-all duration-700"
        />
        {hovering && (
          <GoPlay className="  transition-all duration-700 absolute inset-0 hidden lg:flex items-center justify-center w-[2.35rem] h-[2.35rem] text-zinc-400 opacity-95 backdrop-brightness-[0.3]" />
        )}
      </div>

      <div className="flex w-full pl-5 ">
        <h3
          autoCorrect=""
          className={` text-[0.75rem] lg:text-[0.875rem] font-medium text-white `}
        >
          {decodeName(name)}
        </h3>
      </div>
      <div className="flex w-full">
        <p className=" text-[0.60rem] lg:text-[0.75rem] h-[2rem] flex items-center w-[11rem] overflow-clip lg:w-auto text-gray-400">
          {he.decode(artistNames)}
        </p>
      </div>

      <div className="song-duration mr-2">
        <span className=" text-[0.60rem] lg:text-[0.75rem] text-gray-300">
          {convertTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default SongsList;
