import { GoPlay } from "react-icons/go";
import { useContext } from "react";
import MusicContext from "../context/MusicContext";

const SongsList = ({ name, artists, duration_ms, preview_url, image, id }) => {
  // Convert duration from milliseconds to MM:SS format
  const convertTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const { isPlaying, currentSong, playMusic } = useContext(MusicContext);

  return (
    <div className="rounded-xl w-[35rem] song-item flex justify-between items-center p-2 border-b border-zinc-700 song-info">
      <GoPlay
  className="text-3xl ml-1 text-zinc-200 cursor-pointer"
  onClick={() =>
    playMusic(
      preview_url, 
      name, 
      duration_ms, 
      image || [], // Default to an empty array if image is undefined
      id, 
      artists
    )
  }
/>
      <div className="w-full pl-5">
        <h3
          className={`text-sm font-medium text-white ${
            id === currentSong?.id ? "text-[#46c7b6ff]" : ""
          }`}
        >
          {name}
        </h3>
        <p className="text-xs text-gray-400">
          {artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      <div className="song-duration mr-2">
        <span className="text-xs text-gray-300">{convertTime(duration_ms)}</span>
      </div>
    </div>
  );
};

export default SongsList;
