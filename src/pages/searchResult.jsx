import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSongbyQuery, searchAlbumByQuery } from "../../fetch";
import SongSlider from "../components/Sliders/SongSlider";
import Navbar from "../components/Navbar";
import Player from "../components/Player";

const SearchResult = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState({ songs: [], albums: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
       <img src="/public/Loading.gif" alt="" />
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

    <div className="p-4 text-white mt-[5rem] ">
      <h2 className="text-xl font-bold mb-4 text-center">Search Results for "{query}"</h2>

      {searchResults.songs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2 ml-[5rem]">Songs</h3>
          <SongSlider results={searchResults.songs} />
        </div>
      )}

      {searchResults.albums.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-2 ml-[5rem]">Albums</h3>
          <SongSlider results={searchResults.albums} />
        </div>
      )}
    </div>

    <Player />
 </> );
};

export default SearchResult;
