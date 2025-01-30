import { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Navigator from "../components/Navigator";
import SongsList from "../components/SongsList";
import MusicContext from "../context/MusicContext";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const MyMusic = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const scrollRef = useRef(null); // FIXED: Placed inside the component
  const { setSongs } = useContext(MusicContext);

  useEffect(() => {
    const storedLikedSongs =
      JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(storedLikedSongs);
    setSongs(storedLikedSongs);
  }, []);

  useEffect(() => {
    const storedLikedAlbums =
      JSON.parse(localStorage.getItem("likedAlbums")) || [];
    setLikedAlbums(storedLikedAlbums);
  }, []);

  useEffect(() => {
    const storedLikedPlaylists =
      JSON.parse(localStorage.getItem("likedPlaylists")) || [];
    setLikedPlaylists(storedLikedPlaylists);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -800, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 800, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col mb-[8rem] gap-[2rem]">
        {/* Header */}
        <div className="lg:ml-[3rem] ml-[2rem] flex items-center gap-5 mt-[9rem] lg:mt-[6rem]">
          <span className="gradient flex justify-center items-center h-[8rem] w-[8rem] lg:h-[12rem] lg:w-[12rem] rounded DetailImg ">
            <FaHeart className="text-5xl" />
          </span>
          <h2 className="text-[1.8rem] lg:text-3xl font-semibold lg:font-bold ml-4">
            My Music
          </h2>
        </div>

        {/* Liked Songs */}
        {likedSongs.length > 0 && (
          <div className="flex flex-wrap">
            {likedSongs.map(
              (song, index) =>
                song && (
                  <SongsList
                    key={song.id || index}
                    id={song.id}
                    image={song.image}
                    artists={song.artists}
                    name={song.name}
                    duration={song.duration}
                    downloadUrl={song.audio}
                  />
                )
            )}
          </div>
        )}

        {/* Liked Albums Section */}
        {likedAlbums.length > 0 && (
          <div className="flex justify-center items-center gap-3">
            {/* Scroll Left Button */}
            <MdOutlineKeyboardArrowLeft
              className="absolute left-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b] hidden lg:block hover:text-white"
              onClick={scrollLeft}
            />

            {/* Scrollable Container */}
            <div
              className="grid grid-rows-1 grid-flow-col gap-3 lg:gap-2 overflow-x-auto scroll-hide w-[94%]  px-3 lg:px-0 scroll-smooth"
              ref={scrollRef}
            >
              {likedAlbums.map((album) => (
                <Link
                  key={album.id}
                  to={`/albums/${album.id}`}
                  className="card w-[9.5rem] h-[12rem] overflow-hidden border-[0.1px] p-1 rounded-lg"
                >
                  <img
                    src={album.image}
                    alt={album.name}
                    className="rounded-lg imgs p-1"
                  />
                  <div className="text-[14px] w-full flex flex-col justify-center pl-2">
                    <h2 className="font-semibold overflow-x-clip">{album.name}</h2>
                    <span className="flex gap-1 text-xs">
                      by{" "}
                      <p className="font-semibold">
                        {album.artists.primary
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll Right Button */}
            <MdOutlineKeyboardArrowRight
              className="absolute right-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b] hidden lg:block hover:text-white"
              onClick={scrollRight}
            />
          </div>
        )}

        {/* Liked Playlists Section */}
        {likedPlaylists.length > 0 && (
          <div className="flex gap-4 px-[2rem] overflow-x-auto scroll-smooth scroll-hide">
            {likedPlaylists.map((playlist) => (
              <Link to={`/playlists/${playlist.id}`} key={playlist.id}>
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="h-[8rem] rounded-lg"
                />
                <div className="text-center">{playlist.name}</div>
              </Link>
            ))}
          </div>
        )}

        {/* No Liked Content Message */}
        {likedSongs.length === 0 &&
          likedAlbums.length === 0 &&
          likedPlaylists.length === 0 && (
            <li className="list-disc text-xl ml-[3rem]">No Liked Songs or Albums.</li>
          )}
      </div>

      <Player />
      <Navigator />
    </>
  );
};

export default MyMusic;
