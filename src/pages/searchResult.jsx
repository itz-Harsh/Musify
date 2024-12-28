import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSongbyQuery, searchAlbumByQuery } from "../../fetch";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SongGrid from "../components/SongGrid";
import AlbumItems from "../components/Items/AlbumItems";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Footer from "../components/footer";

const SearchResult = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState({ songs: [], albums: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const songsScrollRef = useRef(null); // Ref for Songs section
  const albumsScrollRef = useRef(null); // Ref for Albums section

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollLeft -= 800; // Scroll left by 800px
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollLeft += 800; // Scroll right by 800px
    }
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const [songsResponse, albumsResponse] = await Promise.all([
          getSongbyQuery(query),
          searchAlbumByQuery(query),
        ]);

        setSearchResults({
          songs: songsResponse.data.results || [],
          albums: albumsResponse.data.results || [],
        });
      } catch (err) {
        setError("Error fetching search results");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchData();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center text-white">
        <img src="/Loading.gif" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen justify-center items-center text-pink-500">
        {error}
      </div>
    );
  }

  if (!searchResults.songs.length && !searchResults.albums.length) {
    return (
      <div className="flex h-screen w-screen justify-center items-center text-white">
        No results found for "{query}"
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-4 text-white mt-[5rem] py-[2rem]">
       
        {searchResults.songs.length > 0 && (
          <div className="pb-10">
            <h3 className="text-2xl font-bold mb-2 ml-[7rem]">Search Results</h3>
            <div className="flex justify-center items-center mt-4">
              <MdOutlineKeyboardArrowLeft
                className="hidden lg:block left-0 text-4xl text-zinc-400 cursor-pointer hover:text-white hover:scale-150 transition-all duration-200 ease-in-out"
                onClick={() => scrollLeft(songsScrollRef)}
              />
              <div
                className="grid grid-rows-2 grid-flow-col-dense w-full lg:w-[85vw] overflow-x-auto scroll-hide items-center gap-8 scroll-smooth"
                ref={songsScrollRef}
              >
                {searchResults.songs.map((song) => (
                  <SongGrid key={song.id} {...song} />
                ))}
              </div>
              <MdOutlineKeyboardArrowRight
                className="hidden lg:block right-0 text-4xl text-zinc-400 cursor-pointer hover:text-white hover:scale-150 transition-all duration-200 ease-in-out"
                onClick={() => scrollRight(songsScrollRef)}
              />
            </div>
          </div>
        )}

        {searchResults.albums.length > 0 && (
          <div className="pb-10">
            <h3 className="text-2xl font-bold mb-3 ml-[7rem]">Related Albums</h3>
            <div className="flex justify-center items-center mt-4">
              <MdOutlineKeyboardArrowLeft
                className="hidden lg:block left-0 text-4xl text-zinc-400 cursor-pointer hover:text-white hover:scale-110 transition-all duration-200 ease-in-out"
                onClick={() => scrollLeft(albumsScrollRef)}
              />
              <div
                className="grid grid-rows-2 grid-flow-col-dense w-full lg:w-[85vw] gap-9 overflow-x-auto scroll-hide items-center px-2 scroll-smooth"
                ref={albumsScrollRef}
              >
                {searchResults.albums.map((album) => (
                  <AlbumItems key={album.id} {...album} />
                ))}
              </div>
              <MdOutlineKeyboardArrowRight
                className="hidden lg:block right-0 text-4xl text-zinc-400 cursor-pointer hover:text-white hover:scale-110 transition-all duration-200 ease-in-out"
                onClick={() => scrollRight(albumsScrollRef)}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
      <Player />
    </>
  );
};

export default SearchResult;
