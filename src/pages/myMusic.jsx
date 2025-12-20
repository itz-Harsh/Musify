import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Navigator from "../components/Navigator";
import SongsList from "../components/SongsList";

import { FaHeart } from "react-icons/fa6";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import PlaylistItems from "../components/Items/PlaylistItems";
import AlbumItems from "../components/Items/AlbumItems";
import { useNavigate } from "react-router";

const MyMusic = () => {
  const navigate = useNavigate();
  const [likedSongs, setLikedSongs] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [list, setList] = useState({});
  const [likedPlaylists, setLikedPlaylists] = useState([]);
  const [spotx, setSpotx] = useState([]);
  const [inputvalue, setInputvalue] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  // Separate refs for albums and playlists
  const albumsScrollRef = useRef(null);
  const playlistsScrollRef = useRef(null);

  useEffect(() => {
    const storedLikedSongs =
      JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(storedLikedSongs);
    setList(storedLikedSongs);

    setLikedAlbums(JSON.parse(localStorage.getItem("likedAlbums")) || []);
    setLikedPlaylists(JSON.parse(localStorage.getItem("likedPlaylists")) || []);
    setSpotx(JSON.parse(localStorage.getItem("spotx")) || []);
  }, []);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 800, behavior: "smooth" });
  };

  const handleInputChange = (event) => {
    setInputvalue(event.target.value);
  };

  const ConvertApi = async (id) => {
    setLoading(true);
    try {
      const raw = await fetch(`https://spotify-to-musify.vercel.app/api/${id}`);
      const data = await raw.json();

      const s = data.data;
      console.log(s);
      // 1️⃣ Read existing array from localStorage
      const stored = JSON.parse(localStorage.getItem("spotx")) || [];

      const exists = stored.some((p) => p.name === s.name);

      if (!exists) {
        stored.push({
          date: s.year,
          name: s.name,
          image: s.image,
          idx: stored.length,
          songs: s.songs,
        });
      }

      // 3️⃣ Save back as array
      localStorage.setItem("spotx", JSON.stringify(stored));
      navigate("/Music")
    } catch (err) {
      setMsg(err.message);
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const importSpotifyPlaylist = () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }

    // If input is visible → submit & hide it
    setDisplayed(inputvalue);

    const id = inputvalue.split("/").pop().split("?")[0];

    ConvertApi(id);

    setInputvalue("");
    setShowInput(false);
  };
  const theme = localStorage.getItem("theme");
  return (
    <>
      <Navbar />
      <div className="flex flex-col mb-[12rem] gap-[2rem] body">
        {loading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className={
              theme === "dark"
              ? "bg-[#111114] text-white rounded-xl p-3 shadow-xl text-center "
              : "bg-white rounded-xl p-3 shadow-xl text-center"
             }>
              <img src="/Loading.gif" alt="Loading..." />
              Loading...
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Header */}
        <div className="lg:ml-[3rem] ml-[2rem] flex items-center gap-5 mt-[9rem] lg:mt-[6rem]">
          <span className=" flex justify-center items-center h-[8rem] w-[8rem] lg:h-[12rem] lg:w-[12rem] rounded-lg liked ">
            <FaHeart className="text-5xl  icon " />
          </span>
          <span className="flex flex-col  w-[50%]">
            <h2 className="text-[1.8rem] lg:text-3xl font-semibold lg:font-bold ml-4">
              My Music
            </h2>
            <div className="lg:flex flex-col hidden  ">
              <span className="lg:flex items-center ml-4 ">
                <p className="text-xs ">
                  Import your favourite playlist from spotify :
                </p>
                <button
                  onClick={importSpotifyPlaylist}
                  className=" bg-green-500 hover:bg-green-600 flex  justify-center  font-semibold  rounded-lg px-2 py-1 ml-2 gap-2"
                >
                  <p className="font-bold text-[12px] flex items-center ">
                    Spotify
                  </p>
                  <svg
                    className="h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="#1ed760"
                      d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                    />
                    <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
                  </svg>
                </button>
              </span>
              <p>{msg}</p>
              {showInput && (
                <input
                  type="text"
                  className="spotx bg-transparent outline-none border-green-600 h-[2.6rem] pl-4 rounded-[20px] w-[70%] m-4
"
                  value={inputvalue}
                  onChange={handleInputChange}
                  placeholder="Spotify Playlist URL"
                />
              )}
            </div>
          </span>
        </div>
        <div className="lg:hidden ">
          <span className="flex items-center justify-center ">
            <p className="text-xs ">
              Import your favourite playlist from spotify :
            </p>
            <button
              onClick={importSpotifyPlaylist}
              className=" bg-green-500 hover:bg-green-600 flex  justify-center  font-semibold  rounded-lg px-2 py-1 ml-2 gap-2"
            >
              <p className="font-bold text-[12px] ">Spotify</p>
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="#1ed760"
                  d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                />
                <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
              </svg>
            </button>
          </span>

          {showInput && (
            <input
              type="text"
              className="spotix bg-transparent outline-none h-[2.6rem] pl-4 rounded-[20px] w-[70%] m-4
"
              value={inputvalue}
              onChange={handleInputChange}
              placeholder="Spotify Playlist URL"
            />
          )}
        </div>
        <div className="flex lg:gap-[1rem] flex-col ">
          <div>
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
                        song={list}
                      />
                    )
                )}
              </div>
            )}
          </div>

          <div>
            {likedAlbums.length > 0 && (
              <>
                <h1 className="text-2xl font-semibold lg:ml-4 p-4">
                  Liked Albums
                </h1>

                <div className="flex mx-1 lg:mx-8 items-center gap-3">
                  <MdOutlineKeyboardArrowLeft
                    className=" arrow-btn absolute left-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block"
                    onClick={() => scrollLeft(albumsScrollRef)}
                  />
                  <div
                    className="grid grid-rows-1 grid-flow-col gap-3 lg:gap-2 overflow-x-auto scroll-hide w-max  px-3 lg:px-0 scroll-smooth"
                    ref={albumsScrollRef}
                  >
                    {likedAlbums.map((album) => (
                      <AlbumItems key={album.id} {...album} />
                    ))}
                  </div>

                  {/* Scroll Right Button */}
                  <MdOutlineKeyboardArrowRight
                    className="arrow-btn absolute right-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block"
                    onClick={() => scrollRight(albumsScrollRef)}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            {spotx.length > 0 && (
              <>
                <h1 className="text-2xl font-semibold lg:ml-4 p-4">
                  Spotify Imports
                </h1>

                <div className="flex mx-1 lg:mx-8 items-center gap-3">
                  {/* Scroll Left Button */}
                  <MdOutlineKeyboardArrowLeft
                    className="arrow-btn absolute left-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block"
                    onClick={() => scrollLeft(playlistsScrollRef)}
                  />

                  {/* Scrollable Container */}
                  <div
                    className="grid grid-rows-1 grid-flow-col gap-3 lg:gap-[0.66rem] overflow-x-auto scroll-hide w-max  px-3 lg:px-0 scroll-smooth"
                    ref={playlistsScrollRef}
                  >
                    {spotx.map((playlist) => (
                      <PlaylistItems key={playlist.idx} {...playlist} />
                    ))}
                  </div>

                  {/* Scroll Right Button */}
                  <MdOutlineKeyboardArrowRight
                    className="arrow-btn absolute right-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block "
                    onClick={() => scrollRight(playlistsScrollRef)}
                  />
                </div>
              </>
            )}
          </div>

          <div>
            {likedPlaylists.length > 0 && (
              <>
                <h1 className="text-2xl font-semibold lg:ml-4 p-4">
                  Liked Playlists
                </h1>

                <div className="flex mx-1 lg:mx-8 items-center gap-3">
                  {/* Scroll Left Button */}
                  <MdOutlineKeyboardArrowLeft
                    className="arrow-btn absolute left-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block"
                    onClick={() => scrollLeft(playlistsScrollRef)}
                  />

                  {/* Scrollable Container */}
                  <div
                    className="grid grid-rows-1 grid-flow-col gap-3 lg:gap-[0.66rem] overflow-x-auto scroll-hide w-max  px-3 lg:px-0 scroll-smooth"
                    ref={playlistsScrollRef}
                  >
                    {likedPlaylists.map((playlist) => (
                      <PlaylistItems key={playlist.id} {...playlist} />
                    ))}
                  </div>

                  {/* Scroll Right Button */}
                  <MdOutlineKeyboardArrowRight
                    className="arrow-btn absolute right-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block "
                    onClick={() => scrollRight(playlistsScrollRef)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {likedSongs.length === 0 &&
          likedAlbums.length === 0 &&
          spotx.length === 0 &&
          likedPlaylists.length === 0 && (
            <li className="list-disc text-xl ml-[3rem]">
              No Liked Songs, Albums, or Playlists.
            </li>
          )}
      </div>

      <Player />
      <Navigator />
    </>
  );
};

export default MyMusic;
