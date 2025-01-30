import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { fetchplaylistsByID } from "../../fetch";
import Footer from "../components/footer";
import MusicContext from "../context/MusicContext";
import SongsList from "../components/SongsList";
import Navigator from "../components/Navigator";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const PlaylistDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSongs } = useContext(MusicContext);
  const [likedPlaylists, setLikedPlaylists] = useState(() => {
    return JSON.parse(localStorage.getItem("likedPlaylists")) || [];
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchplaylistsByID(id);
        setDetails(data);
        setSongs(data.data.songs);
      } catch (err) {
        setError("Failed to fetch playlist details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  useEffect(() => {
    // Update localStorage when likedPlaylists changes
    localStorage.setItem("likedPlaylists", JSON.stringify(likedPlaylists));
  }, [likedPlaylists]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <img src="/Loading.gif" alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen justify-center items-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  const playlistData = details.data || {};
  const playlistImage = playlistData.image?.[2]?.url || "/default-image.png"; // Fallback image

  const toggleLikePlaylist = () => {
    let updatedPlaylists = [...likedPlaylists];

    if (updatedPlaylists.some((p) => p.id === playlistData.id)) {
      updatedPlaylists = updatedPlaylists.filter((p) => p.id !== playlistData.id);
    } else {
      updatedPlaylists.push({
        id: playlistData.id,
        name: playlistData.name,
        image: playlistImage, // Store the image as well
      });
    }

    setLikedPlaylists(updatedPlaylists);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col mt-[11rem] lg:mt-[6rem] text-zinc-300">
        {/* Playlist Header */}
        <div className="flex items-center lg:pl-[2rem] lg:flex-row flex-col gap-[1rem] lg:gap-[2rem]">
          <img
            src={playlistImage}
            alt={playlistData.name || "Playlist"}
            className="w-[10rem] lg:w-[15rem] rounded object-cover DetailImg"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              {playlistData.name}
            </h1>
            <p className="text-sm lg:text-lg">
              Total Songs: {playlistData.songCount || 0}
            </p>
          </div>
          <button onClick={toggleLikePlaylist} title="Like Playlist" className=" mb-[1.4rem] border-[1px] border-[#2c2c2c] h-[3rem] w-[3rem] flex justify-center items-center rounded-full ">
            {likedPlaylists.some((p) => p.id === playlistData.id) ? (
              <FaHeart className="text-red-500 text-2xl" />
            ) : (
              <FaRegHeart className="text-[#bdbdbd] text-2xl" />
            )}
          </button>
        </div>

        <div>
          <h2 className="lg:mt-8   mt-2 mb-2 ml-2 text-2xl font-semibold text-white">
            Top Songs
          </h2>
          <div className="flex flex-col">
            {playlistData.songs && playlistData.songs.length > 0 ? (
              playlistData.songs.map((song) => (
                <SongsList key={song.id} {...song} />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                Playlist is Empty......
              </p>
            )}
          </div>
        </div>
      </div>

      <Player />
      <Navigator />
      <Footer />
    </>
  );
};

export default PlaylistDetails;
