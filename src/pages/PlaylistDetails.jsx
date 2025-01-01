import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To fetch artist ID from URL
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { fetchplaylistsByID } from "../../fetch"; // Assuming the fetch function exists
import { useRef } from "react";

import SongGrid from "../components/SongGrid";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Footer from "../components/footer";

const PlaylistDetails = () => {
  const { id } = useParams(); // Extract the artist ID from the URL
  const [details, setDetails] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 800; // Scroll left by 800px
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 800; // Scroll right by 800px
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchplaylistsByID(id); // Fetch artist details based on the ID
        setDetails(data);
        // console.log(data); // Log data for debugging
      } catch (err) {
        setError("Error fetching Playlists details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); // Fetch details whenever the ID changes

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <img src="/public/Loading.gif" alt="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        {error}
      </div>
    );
  }

  const playlistData = details.data || {}; // Fallback to an empty object if `data` is undefined
  const playlistImage = playlistData.image?.[2]?.url || ""; // Safely access image URL

  return (
    <>
      <Navbar />

      <div className="my-[6rem] mx-[2rem] text-zinc-300">
        {/* Playlist Header */}
        <div className="flex gap-8 items-center">
          {playlistImage && (
            <img
              src={playlistImage}
              alt={playlistData.name}
              className="h-[15rem]  rounded-[20px] object-cover shadow-md DetailImg"
            />
          )}
          <div className="flex lg:flex-col gap-2">
            <h1 className="text-3xl font-bold text-white">
              {playlistData.name}
            </h1>
            <p>Total Songs : {playlistData.songCount}</p>
          </div>
        </div>

        {/* Top Songs Section */}
        <h2 className="mt-8 text-2xl font-semibold text-white">Top Songs</h2>

        {/* Scrollable Songs Section */}
        <div className="relative flex justify-center items-center mt-4">
          <MdOutlineKeyboardArrowLeft
            className=" hidden lg:block left-0 text-4xl text-zinc-400 cursor-pointer hover:text-white hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={scrollLeft}
          />
          <span className="flex w-full lg:w-[85vw]  ">
            <div
              className="grid  grid-flow-col-dense grid-row-2 w-full lg:w-[85vw]  overflow-x-scroll scroll-hide items-center gap-3  px-0 scroll-smooth"
              ref={scrollRef}
            >
              {playlistData.songs.map((playlist) => (
                <SongGrid key={playlist.id} {...playlist} />
              ))}
            </div>
          </span>
          <MdOutlineKeyboardArrowRight
            className="hidden lg:block right-0  text-4xl text-zinc-400 cursor-pointer hover:text-white hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={scrollRight}
          />
        </div>
      </div>

      <Player />
      <Footer />
    </>
  );
};

export default PlaylistDetails;
