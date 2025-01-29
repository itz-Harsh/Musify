import { useContext, useEffect, useState } from "react";
import {
  fetchplaylistsByID,
  searchAlbumByQuery,
  searchArtistByQuery,
  searchPlayListByQuery,
} from "../../fetch"; // Assuming the function is imported correctly
import AlbumSlider from "./Sliders/AlbumSlider";
import PlaylistSlider from "./Sliders/PlaylistSlider";
import ArtistSlider from "./Sliders/ArtistSlider";
import SongGrid from "./SongGrid";
import { useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import MusicContext from "../context/MusicContext";

const MainSection = () => {
  const [songs, setSong] = useState([]);
  const [latestSongs, setlatestSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSongs } = useContext(MusicContext);
  // Create separate refs for each scrollable section
  const latestSongsScrollRef = useRef(null);
  const songsScrollRef = useRef(null);
  const scrollRef = useRef(null);

  const getRecentlyPlayedSongs = () => {
    const playedSongs = JSON.parse(localStorage.getItem("playedSongs")) || [];
    return playedSongs;
  };

  // You can then use this function to display the songs on the UI, for example:
  const recentlyPlayedSongs = getRecentlyPlayedSongs();


  const scrollLeft = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 1000; // Scroll left by 800px
    }
  };

  const scrollRight = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 1000; // Scroll right by 800px
    }
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    return hours < 12
      ? "Good Morning"
      : hours < 18
      ? "Good Afternoon"
      : "Good Evening";
  };

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const song = await fetchplaylistsByID(110858205);
        setSong(song.data.songs);
        setSongs(song.data.songs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchlatestSongData = async () => {
      try {
        const latestSongs = await fetchplaylistsByID(6689255);
        setlatestSongs(latestSongs.data.songs);
        setSongs(latestSongs.data.songs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAlbumData = async () => {
      try {
        const album = await searchAlbumByQuery("latest");
        setAlbums(album.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchArtistData = async () => {
      try {
        const artist = await searchArtistByQuery("top-artists");
        setArtists(artist.data.results);
        // console.log(artist.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlaylistData = async () => {
      try {
        const playlist = await searchPlayListByQuery("Top");
        setPlaylists(playlist.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch all data simultaneously
    fetchSongData();
    fetchAlbumData();
    fetchArtistData();
    fetchPlaylistData();
    fetchlatestSongData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  return (
    <div className="pt-8 my-[2rem] mt-[5rem] lg:my-[4rem] flex flex-col items-center overflow-x-clip ">
      <div className="hidden lg:block text-xl w-full text-[#d6d6d6] font-semibold lg:mt-3 lg:ml-[5.5rem]">
            {getGreeting()}
          </div>
      {recentlyPlayedSongs.length > 0 && (
        <div className="flex flex-col justify-center items-center w-full">
        <h2 className=" lg:ml-[3rem] lg:-translate-x-[37rem] lg:text-center m-4 text-xl sm:text-2xl font-semibold text-zinc-200 pl-3 sm:pl-[3rem] w-full">
          Recently Played
        </h2>
        <div className="flex justify-center items-center gap-3 w-full">
          {/* Left Arrow */}
          <MdOutlineKeyboardArrowLeft
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
            onClick={() => scrollLeft(scrollRef)}
          />
          <div
            className="grid grid-rows-1  grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth"
            ref={scrollRef}
          >
            {recentlyPlayedSongs?.map((song, index) => (
              <SongGrid key={song.id || index} {...song} />
            ))}
          </div>
          {/* Right Arrow */}
          <MdOutlineKeyboardArrowRight
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
            onClick={() => scrollRight(scrollRef)}
          />
        </div>
      </div>
      )}
      

      <div className="flex flex-col items-center w-full">
        <h2 className="pt-4 lg:pt-0 m-4 pl-[0.8rem] lg:-translate-x-[37rem] lg:text-center w-full text-xl sm:text-2xl font-semibold text-zinc-200 lg:ml-[3rem]">
          New Songs
        </h2>

        <div className="flex justify-center items-center gap-3 w-full">
          {/* Left Arrow */}
          <MdOutlineKeyboardArrowLeft
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
            onClick={() => scrollLeft(latestSongsScrollRef)}
          />
          <div
            className="grid grid-rows-1 lg:grid-rows-2 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full px-3 lg:px-0 scroll-smooth"
            ref={latestSongsScrollRef}
          >
            {latestSongs?.map((song) => (
              <SongGrid key={song.id} {...song} />
            ))}
          </div>
          {/* Right Arrow */}
          <MdOutlineKeyboardArrowRight
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
            onClick={() => scrollRight(latestSongsScrollRef)}
          />
        </div>
      </div>

      <br />

      {/* Today Trending Section */}
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className=" lg:ml-[3rem] lg:-translate-x-[37rem] lg:text-center m-4 text-xl sm:text-2xl font-semibold text-zinc-200 pl-3 sm:pl-[3rem] w-full">
          Today Trending
        </h2>
        <div className="flex justify-center items-center gap-3 w-full">
          {/* Left Arrow */}
          <MdOutlineKeyboardArrowLeft
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
            onClick={() => scrollLeft(songsScrollRef)}
          />
          <div
            className="grid grid-rows-1 sm:grid-rows-2 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth"
            ref={songsScrollRef}
          >
            {songs?.map((song) => (
              <SongGrid key={song.id} {...song} />
            ))}
          </div>
          {/* Right Arrow */}
          <MdOutlineKeyboardArrowRight
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
            onClick={() => scrollRight(songsScrollRef)}
          />
        </div>
      </div>

      <br />

      {/* Top Albums Section */}
      <div className="w-full">
        <h2 className="lg:ml-[3.5rem] m-4 lg:-translate-x-[37rem] lg:text-center text-xl sm:text-2xl font-semibold text-zinc-200 lg:pl-3 ">
          Top Albums
        </h2>
        <AlbumSlider albums={albums} />
      </div>
      <br />

      {/* Top Artists Section */}
      <div className="w-full">
        <h2 className="m-3 lg:-translate-x-[37rem] lg:text-center text-xl sm:text-2xl font-semibold text-zinc-200 pl-3 lg:pl-[3rem]">
          Top Artists
        </h2>
        <ArtistSlider artists={artists} />
      </div>
      <br />

      {/* Top Playlists Section */}
      <div className="w-full">
        <h2 className="m-3 lg:-translate-x-[37rem] lg:text-center text-xl sm:text-2xl font-semibold text-zinc-200 pl-3 lg:pl-[3rem]">
          Top Playlists
        </h2>
        <PlaylistSlider playlists={playlists} />
      </div>
    </div>
  );
};

export default MainSection;
