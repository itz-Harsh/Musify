import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Navigator from "../components/Navigator";
import SongsList from "../components/SongsList";

const MyMusic = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  
  useEffect(() => {
    const storedLikedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(storedLikedSongs);
    console.log(storedLikedSongs);
  }, []);
 
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-[1rem] lg:mt-[5rem] mt-[8rem] ">
        <h2 className="text-2xl font-semibold ml-4">Liked Songs</h2>
        {likedSongs.length > 0 ? (
          <div className="flex flex-wrap ">
            {likedSongs.map((song, index) => (
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
))}

          </div>
        ) : (
          <span>No liked songs yet.</span>
        )}
      </div>
      <Player />
      <Navigator />
    </>
  );
};

export default MyMusic;
