import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { getArtistbyQuery, getSearchData, getSongbyQuery, getSuggestionSong } from "../../fetch";
import MusicContext from "../context/MusicContext";
import he from "he";
import Theme from "../../theme";
import { IoSearchOutline } from "react-icons/io5";
const Navbar = () => {
  const { playMusic } = useContext(MusicContext);
  const [query, setQuery] = useState([]);
  let List = [];
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const result = await getSearchData(query);
      const song = await getSongbyQuery(query, 5);
      const artist = await getArtistbyQuery(query , 5);
      // console.log(artist);
      const allSuggestions = [];
      if (song?.data?.results) {
        allSuggestions.push(
          ...song.data.results.map((item) => ({
            type: "Song",
            name: item.name,
            id: item.id,
            duration: item.duration,
            artist: item.artists,
            image: item.image[2].url,
            downloadUrl: item.downloadUrl[4].url,
          }))
        );
      }
      if (result?.data?.albums?.results) {
        allSuggestions.push(
          ...result.data.albums.results.map((item) => ({
            type: "Album",
            name: item.title,
            id: item.id,
            artist: item.artist,
            image: item.image?.[2]?.url,
          }))
        );
      }
      if (result?.data?.playlists?.results) {
        allSuggestions.push(
          ...result.data.playlists.results.map((item) => ({
            type: "Playlist",
            name: item.title,
            id: item.id,
            image: item.image[2].url,
          }))
        );
      }
      if (artist?.data.results) {
        allSuggestions.push(
          ...artist.data.results.map((item) => ({
            type: item.type,
            name: item.name,
            id: item.id,
            image: item.image[2].url,
          }))
        );
      }

      setSuggestions(allSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    fetchSuggestions(searchTerm); // Fetch suggestions dynamically
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`); // Navigate to the search results page
      setSuggestions([]); // Clear suggestions after search
    }
  };


  const GetData = async(suggestion) => {
      const response = await getSuggestionSong(suggestion.id);
      const suggestedSongs = response.data || []; 
      return [suggestion, ...suggestedSongs];
  }

  const handleSuggestionClick = async (suggestion) => {
  if (suggestion.type === "Song") {
    List = await GetData(suggestion); 
  }
    switch (suggestion.type) {
      case "Song":
        playMusic(
          suggestion.downloadUrl,
          suggestion.name,
          suggestion.duration,
          suggestion.image,
          suggestion.id,
          suggestion.artist,
          List
        );
        break;
      case "Album":
        navigate(`/albums/${suggestion.id}`);
        break;
      case "artist":
        navigate(`/artists/${suggestion.id}`);
        break;
      case "Playlist":
        navigate(`/playlists/${suggestion.id}`);
        break;
      default:
        console.warn("Unknown suggestion type:", suggestion.type);
    }

    setQuery("");
    setSuggestions([]); // Clear suggestions
  };

  return (
    <nav className="navbar flex flex-col lg:gap-10 lg:flex-row lg:items-center top-0 z-20 fixed w-full pl-1 pr-1 lg:px-2   lg:h-[4.5rem]">
      {/* Logo */}
      <div className="flex  items-center gap-[4rem] mb-2 lg:mb-0 w-fit">
        <div className="flex items-center lg:gap-[4rem] lg:w-auto w-screen lg:justify-normal justify-between gap-5  h-[61px]">
          <Link to="/" className="flex items-center ">
            <span className="bg"></span>
            <div className="">
              <span className="Musi text-zinc-600 font-extrabold text-2xl lg:text-3xl">
                Musi
              </span>
              <span className="fy text-zinc-200 font-extrabold text-2xl lg:text-3xl">
                fy
              </span>
            </div>
          </Link>

          
          <Theme />
        </div>

        <div className="lg:flex gap-[2rem] w-[15rem] grey hidden font-semibold">
          <Link to="/Browse">
            <h2 className="lg:text-xl text-lg">Browse</h2>
          </Link>
          <Link to="/Music">
            <h2 className="lg:text-xl text-lg ">My Music</h2>
          </Link>
        </div>
      </div>

      <div className="flex-grow  ">
        <form
          onSubmit={handleSearchSubmit}
          className="relative  flex flex-col lg:flex-row items-center gap-2"
        >
          <div className="flex w-full ">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for Songs, Artists, and Playlists"
              className="flex-grow h-11 p-1 pl-5 rounded-l-lg  bg-transparent focus:outline-none "
              value={query}
              onChange={handleSearchInputChange}
              autoComplete="off"
              autoCorrect="off"
            />
            <button
              type="submit"
              className="search-btn h-11 w-11 rounded-r-lg flex items-center justify-center"
            >
              <IoSearchOutline className="text-2xl search" />
            </button>
          </div>

          <div
            className={`suggestionSection lg:shadow-xl   absolute scroll-hide top-[2.74rem] lg:top-[4.5rem] left-0 lg:left-auto   p-3 grid grid-cols-2 lg:grid-cols-3 gap-3 rounded-lg  w-full max-h-[20rem] overflow-auto transition-transform duration-200 ${
              suggestions.length > 0
                ? "visible opacity-100 left-1 "
                : "invisible opacity-0"
            }`}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center gap-3  p-3 rounded cursor-pointer hoover "
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <img
                  src={suggestion.image}
                  alt=""
                  className="h-[3rem] w-[3rem] rounded"
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm truncate ">
                    {he.decode(suggestion.name)}
                  </span>
                  <span className=" text-xs">{suggestion.type}</span>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
