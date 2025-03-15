import {  useEffect, useState } from "react";
import {
  fetchplaylistsByID,
  searchAlbumByQuery,
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
import { artistData } from "../genreData";

const MainSection = () => {
  const [trending, setTrending] = useState([]);
  const [latestSongs, setlatestSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [list , setList ] = useState({});
  const latestSongsScrollRef = useRef(null);
  const songsScrollRef = useRef(null);
  const scrollRef = useRef(null);

  const getRecentlyPlayedSongs = () => {
    const playedSongs = JSON.parse(localStorage.getItem("playedSongs")) || [];
    return playedSongs;
  };

  const recentlyPlayedSongs = getRecentlyPlayedSongs();

  const scrollLeft = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 1000; // Scroll left by 1000px
    }
  };

  const scrollRight = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 1000; // Scroll right by 1000px
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
        setTrending(song.data.songs);
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
        const artist = await artistData;
        setArtists(artist.results);
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

    fetchSongData();
    fetchAlbumData();
    fetchArtistData();
    fetchPlaylistData();
    fetchlatestSongData();
  }, []);

  useEffect(() => {
    // Combine arrays and remove duplicates
    const combineArray = [
      ...recentlyPlayedSongs,
      ...trending,
      ...latestSongs
    ];
    const uniqueSongs = combineArray.filter((song, index, self) => 
      index === self.findIndex((t) => (
        t.id === song.id
      ))
    );
  
    setList(uniqueSongs);
  }, [trending , latestSongs ]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;



  return (
    <div className="pt-[3rem] lg:pt-5 my-[2rem] mt-[5rem] lg:my-[4rem] flex flex-col items-center overflow-x-clip gap-[0.3rem]">
      <div className="hidden lg:block text-2xl w-full  font-semibold lg:ml-[5.5rem] m-1">
            {getGreeting()}
          </div>
      {recentlyPlayedSongs.length > 0 && (
        <div className="flex flex-col justify-center items-center w-full">
        <h2 className=" m-4 mt-0 text-xl lg:text-2xl font-semibold  w-full ml-[3.5rem] lg:ml-[6.5rem]">
          Recently Played
        </h2>
        <div className="flex justify-center items-center gap-3 w-full scroll-smooth">
          {/* Left Arrow */}
          <MdOutlineKeyboardArrowLeft
            className="text-3xl hover:scale-125 cursor-pointer h-[9rem] arrow-btn  hidden lg:block  "
            onClick={() => scrollLeft(scrollRef)}
          />
          <div
            className="grid grid-rows-1  grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth"
            ref={scrollRef}
          >
            {recentlyPlayedSongs?.map((song, index) => (
              <SongGrid key={song.id || index} {...song} song={list}/>
            ))}
          </div>
          {/* Right Arrow */}
          <MdOutlineKeyboardArrowRight
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block  "
            onClick={() => scrollRight(scrollRef)}
          />
        </div>
      </div>
      )}
      

      <div className="flex flex-col items-center w-full">
        <h2 className=" m-4 text-xl lg:text-2xl font-semibold  w-full ml-[3.5rem] lg:ml-[6.5rem]">
          New Songs
        </h2>

        <div className="flex justify-center items-center gap-3 w-full">
          {/* Left Arrow */}
          <MdOutlineKeyboardArrowLeft
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block  "
            onClick={() => scrollLeft(latestSongsScrollRef)}
          />
          <div
            className="grid grid-rows-1 lg:grid-rows-2 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full px-3 lg:px-0 scroll-smooth"
            ref={latestSongsScrollRef}
          >
            {latestSongs?.map((song , index) => (
              <SongGrid key={song.id || index } {...song} song={list}/>
            ))}
          </div>
          {/* Right Arrow */}
          <MdOutlineKeyboardArrowRight
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block  "
            onClick={() => scrollRight(latestSongsScrollRef)}
          />
        </div>
      </div>

      <br />

      {/* Today Trending Section */}
      <div className="flex flex-col justify-center items-center w-full">
        <h2 className=" m-4 mt-0 text-xl lg:text-2xl font-semibold  w-full ml-[3.5rem] lg:ml-[6.5rem]">
          Today Trending
        </h2>
        <div className="flex justify-center items-center gap-3 w-full">
          {/* Left Arrow */}
          <MdOutlineKeyboardArrowLeft
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block  "
            onClick={() => scrollLeft(songsScrollRef)}
          />
          <div
            className="grid grid-rows-1 sm:grid-rows-2 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth"
            ref={songsScrollRef}
          >
            {trending?.map((song) => (
              <SongGrid key={song.id} {...song} song={list}/>
            ))}
          </div>
          {/* Right Arrow */}
          <MdOutlineKeyboardArrowRight
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block  "
            onClick={() => scrollRight(songsScrollRef)}
          />
        </div>
      </div>

      <br />

      {/* Top Albums Section */}
      <div className="w-full">
        <h2 className=" m-4 mt-0 text-xl lg:text-2xl font-semibold  w-full ml-[1rem] lg:ml-[3rem] ">
          Top Albums
        </h2>
        <AlbumSlider albums={albums} />
      </div>
      <br />

      {/* Top Artists Section */}
      <div className="w-full">
        <h2 className="pr-1 m-4 mt-0 text-xl lg:text-2xl font-semibold  w-full ml-[1rem] lg:ml-[3.5rem] ">
          Top Artists
        </h2>
        <ArtistSlider artists={artists} />
      </div>
      <br />

      {/* Top Playlists Section */}
      <div className="w-full flex flex-col gap-3">
        <h2 className=" m-1 text-xl lg:text-2xl font-semibold  w-full ml-[1rem] lg:ml-[2.8rem] ">
          Top Playlists
        </h2>
        <PlaylistSlider playlists={playlists} />
      </div>
    </div>
  );
};

export default MainSection;
