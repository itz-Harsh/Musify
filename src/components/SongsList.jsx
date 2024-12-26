import { GoPlay } from "react-icons/go";
import { useContext } from "react";
import MusicContext from "../context/MusicContext";

const SongsList = ({ name, artists, duration, downloadUrl, image, id }) => {
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
    <div className="rounded-xl w-full song-item flex justify-between items-center p-2 border-b border-zinc-700 song-info">
      <GoPlay
        className="text-3xl ml-1 text-zinc-200 cursor-pointer"
        onClick={() =>
          playMusic(
            downloadUrl,
            name,
            duration,
            imageUrl,
            id,
            artists,
          )
        }
      />
      <div className="w-full pl-5">
        <h3 className={`text-sm font-medium text-white ${id === currentSong?.id && "text-[#46c7b6ff]"}`}>
          {name}
        </h3>
        <p className="text-xs text-gray-400">
          {artistNames}
        </p>
      </div>
      <div className="song-duration mr-2">
        <span className="text-xs text-gray-300">{convertTime(duration)}</span>
      </div>
    </div>
  );
};

export default SongsList;
