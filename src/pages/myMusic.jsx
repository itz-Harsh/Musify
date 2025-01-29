import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Navigator from "../components/Navigator";
import SongsList from "../components/SongsList";
import MusicContext from "../context/MusicContext";
import { FaHeart } from "react-icons/fa6";

const MyMusic = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const { setSongs } = useContext(MusicContext);
  useEffect(() => {
    const storedLikedSongs =
      JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(storedLikedSongs);
    setSongs(storedLikedSongs);
    // console.log(storedLikedSongs);
  }, []);

  return (
    <>
      <Navbar />
      <div className="mb-[8rem]">
      <div className="lg:ml-[3rem] ml-[2rem] flex items-center gap-5 mt-[9rem] lg:mt-[6rem]">
        <span className="gradient flex justify-center items-center h-[8rem] w-[8rem] lg:h-[12rem] lg:w-[12rem] rounded-lg">
          <FaHeart className="text-5xl" />
        </span>
        <h2 className="text-[1.8rem] lg:text-3xl font-semibold lg:font-bold ml-4">Liked Songs</h2>
      </div>
      <div className="flex flex-col gap-[1rem] mt-10">
        <div>

        {likedSongs.length > 0 ? (
          <div className="flex flex-wrap ">
            {likedSongs.map((song, index) =>
              song ? (
                <SongsList
                  key={song.id || index}
                  id={song.id}
                  image={song.image}
                  artists={song.artists}
                  name={song.name}
                  duration={song.duration}
                  downloadUrl={song.audio}
                />
              ) : null // Skip rendering if song is null or undefined
            )}
          </div>
        ) : (
          <span>No liked songs yet.</span>
        )}
        </div>
      </div >
      </div>
      <Player />
      <Navigator />
    </>
  );
};

export default MyMusic;
