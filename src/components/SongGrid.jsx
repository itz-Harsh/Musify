import { useContext } from "react";
import MusicContext from "../context/MusicContext";
import he from "he";

const SongGrid = ({ name, artists, duration, downloadUrl, image, id , song }) => {
  
  const { playMusic } = useContext(MusicContext);

  const imageUrl = image[2]?.url || image; 
  const artistNames = Array.isArray(artists?.primary)
    ? artists?.primary.map((artist) => artist.name).join(", ")
    : "Unknown Artist";

 
    downloadUrl = downloadUrl ? downloadUrl[4]?.url ||  downloadUrl: song.audio;
  return (
    <span
      className="card w-[9.5rem] h-[11.9rem] overflow-clip p-1  rounded-lg cursor-pointer shadow-md"
      onClick={() =>
        playMusic(downloadUrl, name, duration, imageUrl, id, artists , song)
      }
    >
      <div className="">
        <div className="p-1">
          <img
            src={imageUrl}
            alt=""
            className=" top-0 rounded-lg imgs  "
          />

          </div>
      <div className="text-[13px] w-full flex flex-col justify-center pl-2">
        <span className="font-semibold overflow-clip w-[9rem] h-[1.2rem] pr-2">{name
                                    ? he.decode(name)
                                    : "Empty"}</span>
        <span className="flex gap-1">by<p className="font-semibold">{he.decode(artistNames)}</p></span>
      </div>
        </div>
  
    </span>
  );
};

export default SongGrid;
