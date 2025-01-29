import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSongbyQuery, searchAlbumByQuery, searchArtistByQuery, searchPlayListByQuery } from "../../fetch";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Footer from "../components/footer";
import SongGrid from "../components/SongGrid";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import AlbumSlider from "../components/Sliders/AlbumSlider";
import PlaylistSlider from "../components/Sliders/PlaylistSlider";
import ArtistSlider from "../components/Sliders/ArtistSlider";
import Navigator from "../components/Navigator";

const SearchResult = () => {
  const { query } = useParams();
  const [songResults, setSongResults] = useState([]);
  const [AlbumResults, setAlbumsResults] = useState([]);
  const [ArtistsResults, setArtistsResults] = useState([]);
  const [PlaylistsResults, setPlaylistsResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null); // Ref for horizontal scrolling

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const song = await getSongbyQuery(query, 30);
        setSongResults(song.data.results);

        const Album = await searchAlbumByQuery(query);
        setAlbumsResults(Album.data.results);

        const Artist = await searchArtistByQuery(query);
        setArtistsResults(Artist.data.results);
        
        const Playlist = await searchPlayListByQuery(query);
        setPlaylistsResults(Playlist.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

    };
    
    fetchSearchResult();
  }, [query]); // Added `query` as a dependency

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -400, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 400, // Adjust scroll amount
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-[8rem] lg:mt-[6rem]  p-1 gap-5 flex flex-col">
        <h2 className="text-2xl font-semibold ml-[1rem] lg:ml-[7rem] flex flex-col gap-3">
          Top Search Results <p className="text-xl">Songs</p>
        </h2>
        <div className="flex justify-center items-center gap-3 w-full">
          {/* Left Arrow */}
          <MdOutlineKeyboardArrowLeft
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
            onClick={() => scrollLeft(scrollLeft)}
          />
          <div
            className="grid grid-rows-1  grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-2 sm:gap-[1.1rem] w-full sm:w-[75rem] px-3 sm:px-5 scroll-smooth"
            ref={scrollRef}
          >
            {songResults.length > 0 ? ( songResults.map((song) => <SongGrid key={song.id} {...song} />) ) : ( <div className="text-center col-span-full text-gray-500"> No results found. </div> )}
          </div>
          {/* Right Arrow */}
          <MdOutlineKeyboardArrowRight
            className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
            onClick={() => scrollRight(scrollRight)}
          />
        </div>

       
         {AlbumResults.length > 0 && (
          <>
            <p className="text-xl font-semibold  ml-[1rem] lg:ml-[7rem]">Albums</p>
            <AlbumSlider albums={AlbumResults} />
          </>
        )} 

        
        {PlaylistsResults.length > 0 && (
          <>
            <p className="text-xl font-semibold  ml-[1rem] lg:ml-[7rem]">Playlists</p>
            <PlaylistSlider playlists={PlaylistsResults} />
          </>
        )}

      
        {ArtistsResults.length > 0 && (
          <>
            <p className="text-xl font-semibold  ml-[1rem] lg:ml-[7rem]">Artists</p>
            <ArtistSlider artists={ArtistsResults} />
          </>
        )}
      </div>
      <Footer />
      <Navigator />
      <Player />
    </>
  );
};

export default SearchResult;
