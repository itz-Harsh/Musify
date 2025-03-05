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

const MyMusic = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [likedAlbums, setLikedAlbums] = useState([]);
  const [list , setList ] = useState({});
  const [likedPlaylists, setLikedPlaylists] = useState([]);

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
    // console.log(likedPlaylists);
  }, []);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 800, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col mb-[12rem] gap-[2rem] ">
        {/* Header */}
        <div className="lg:ml-[3rem] ml-[2rem] flex items-center gap-5 mt-[9rem] lg:mt-[6rem]">
          <span className=" flex justify-center items-center h-[8rem] w-[8rem] lg:h-[12rem] lg:w-[12rem] rounded-lg liked ">
            <FaHeart className="text-5xl  icon " />
          </span>
          <h2 className="text-[1.8rem] lg:text-3xl font-semibold lg:font-bold ml-4">
            My Music
          </h2>
        </div>

        <div className="flex gap-[1.5rem] flex-col ">
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
              <h1 className="text-2xl font-semibold lg:ml-4 p-4">Liked Albums</h1>

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
            </>)}
          </div>

          <div>
            {likedPlaylists.length > 0 && (
              <>
                <h1 className="text-2xl font-semibold lg:ml-4 p-4">Liked Playlists</h1>

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
