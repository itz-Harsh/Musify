import { useContext } from "react";
import MusicContext from "../context/MusicContext";

const SongGrid = ({ name, artists, duration, downloadUrl, image, id }) => {
  const convertTime = (seconds) => {
    if (!seconds || typeof seconds !== "number") {
      return "0:00"; // Fallback for invalid duration
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const { isPlaying, currentSong, playMusic } = useContext(MusicContext);

  const imageUrl = image[2].url || ""; // Safely access the image URL
  const artistNames = Array.isArray(artists?.primary)
    ? artists.primary.map((artist) => artist.name).join(", ")
    : "Unknown Artist";
  // console.log(artistNames);
  return (
    <span
      className="w-[9.5rem] h-[11.9rem] overflow-clip bg-[#242424] border-[0.1px] border-[#444444] p-1  rounded-lg cursor-pointer"
      onClick={() =>
        playMusic(downloadUrl, name, duration, imageUrl, id, artists)
      }
    >
      <div className="">
        <div className="p-1">
          <img
            src={imageUrl}
            alt=""
            className=" top-0 rounded-lg card  "
          />

          </div>
      <div className="text-[13px] w-full flex flex-col justify-center pl-2">
        <span className="font-semibold overflow-x-clip">{name}</span>
        <span className="flex gap-1">by<p className="font-semibold">{artistNames}</p></span>
      </div>
        </div>
  
    </span>
  );
};

export default SongGrid;
