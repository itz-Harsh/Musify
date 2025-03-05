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
import { FaPlay } from "react-icons/fa";

const PlaylistDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [list , setList ] = useState({});
  const [error, setError] = useState(null);
  const { playMusic } = useContext(MusicContext);
  const [likedPlaylists, setLikedPlaylists] = useState(() => {
    return JSON.parse(localStorage.getItem("likedPlaylists")) || [];
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchplaylistsByID(id);
        setDetails(data);
        setList(data.data.songs);

        // console.log(list);
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
      updatedPlaylists = updatedPlaylists.filter(
        (p) => p.id !== playlistData.id
      );
    } else {
      updatedPlaylists.push({
        id: playlistData.id,
        name: playlistData.name,
        image: playlistImage, // Store the image as well
      });
    }

    setLikedPlaylists(updatedPlaylists);
  };

  const playFirstSong = () => {
    if (playlistData.songs && playlistData.songs.length > 0) {
      const firstSong = playlistData.songs[0];
      const audioSource = firstSong.downloadUrl
        ? firstSong.downloadUrl[4]?.url || firstSong.downloadUrl
        : firstSong.audio;
      const { name, duration, image, id, artists } = firstSong;

      playMusic(
        audioSource,
        name,
        duration,
        image,
        id,
        artists,
        playlistData.songs
      );
    }
  };

  const totalDuration = playlistData.songs
    .map((song) => song.duration)
    .reduce((a, b) => a + b, 0);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return `${hours}h   ${minutes}m `;
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col mt-[11rem] lg:mt-[6rem] ">
        {/* Playlist Header */}
        <div className="flex items-center lg:pl-[2rem] lg:flex-row flex-col gap-[1rem] lg:gap-[2rem]">
          <img
            src={playlistImage}
            alt={playlistData.name || "Playlist"}
            className="w-[10rem] lg:w-[15rem] rounded object-cover DetailImg"
          />
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-2xl lg:text-3xl font-bold ">
              {playlistData.name}
            </h1>
            <p className="text-sm lg:text-lg font-semibold">
              Total Songs : {playlistData.songCount || 0}
            </p>
            <p className="text-sm lg:text-lg font-semibold">
              Total Duration : {formatDuration(totalDuration)}
            </p>
            <div className="flex lg:mt-4 gap-4">
              <span className=" hidden lg:flex justify-center items-center h-[3rem] w-[3rem] border-[1px] border-[#8f8f8f6e]  rounded-full cursor-pointer ">
                <FaPlay
                  className=" text-xl icon active:scale-90"
                  onClick={playFirstSong}
                />
              </span>
              <button
              onClick={toggleLikePlaylist}
              title="Like Playlist"
              className="hidden mb-[1.4rem] border-[1px] border-[#8f8f8f6e] h-[3rem] w-[3rem] lg:flex justify-center items-center rounded-full "
            >
              {likedPlaylists.some((p) => p.id === playlistData.id) ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="icon text-2xl" />
              )}
            </button>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={toggleLikePlaylist}
              title="Like Playlist"
              className="lg:hidden mb-[1.4rem] border-[1px] border-[#8f8f8f6e] h-[3rem] w-[3rem] flex justify-center items-center rounded-full "
            >
              {likedPlaylists.some((p) => p.id === playlistData.id) ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="icon text-2xl" />
              )}
            </button>
            <span className=" lg:hidden flex justify-center items-center h-[3rem] w-[3rem] border-[1px] border-[#8f8f8f6e] rounded-full cursor-pointer ">
              <FaPlay
                className=" text-xl icon active:scale-90"
                onClick={playFirstSong}
              />
            </span>
          </div>
        </div>

        <div>
          <h2 className="lg:mt-8   mt-2 mb-2 ml-2 text-2xl font-semibold ">
            Top Songs
          </h2>
          <div className="flex flex-col">
            {playlistData.songs && playlistData.songs.length > 0 ? (
              playlistData.songs.map((song) => (
                <SongsList key={song.id} {...song} song={list} />
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
