import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { getSearchData, getSongbyQuery } from "../../fetch";
import MusicContext from "../context/MusicContext";

const Navbar = () => {
  const { playMusic } = useContext(MusicContext); // Ensure correct usage
  const [query, setQuery] = useState([]); // State to handle the search query
  const [suggestions, setSuggestions] = useState([]); // State for search suggestions
  const navigate = useNavigate(); // useNavigate to programmatically navigate
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const result = await getSearchData(query);
      const song = await getSongbyQuery(query, 5);

      const allSuggestions = [];
      if (song?.data?.results) {
        allSuggestions.push(
          ...song.data.results.map((item) => ({
            type: "Song",
            name: item.name,
            id: item.id,
            duration: item.duration,
            artist: item.artists,
            image: item.image?.[2]?.url,
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
            image: item.image?.[2]?.url,
          }))
        );
      }
      if (result?.data?.artists?.results) {
        allSuggestions.push(
          ...result.data.artists.results.map((item) => ({
            type: "Artist",
            name: item.title,
            id: item.id,
            image: item.image?.[2]?.url,
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
  
  const getGreeting = () => {
      const hours = new Date().getHours();
      return hours < 12
        ? "Good Morning"
        : hours < 18
        ? "Good Afternoon"
        : "Good Evening";
    };
  

  const handleSuggestionClick = (suggestion) => {
    switch (suggestion.type) {
      case "Song":
        playMusic(
          suggestion.downloadUrl,
          suggestion.name,
          suggestion.duration,
          suggestion.image,
          suggestion.id,
          suggestion.artist
        );
        break;
      case "Album":
        navigate(`/albums/${suggestion.id}`);
        break;
      case "Artist":
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
    <nav className="navbar flex flex-col lg:gap-10 lg:flex-row lg:items-center top-0 z-20 fixed w-full pl-1 pr-1 lg:pl-2 lg:pr-2   lg:h-[4.5em]">
      {/* Logo */}
      <div className="flex  items-center gap-[4rem] mb-2 lg:mb-0 w-fit">
        <div className="flex items-center gap-[4rem]  ">
          <Link to="/" className="flex items-center ">
            <img
              src="/White_musify.svg"
              alt="Musify"
              className="h-[3.6rem] lg:h-[4rem]"
            />
            <div className="">
              <span className="Musi text-zinc-300 font-extrabold text-2xl lg:text-3xl">
                Musi
              </span>
              <span className="fy text-zinc-600 font-extrabold text-2xl lg:text-3xl">
                fy
              </span>
            </div>
          </Link>

          <div className="text-xl pl-6 w-max flex self-center lg:hidden text-[#cecece]  font-semibold ">
            {getGreeting()}
          </div>
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
              className="flex-grow h-11 p-1 pl-5 rounded-l-lg  bg-transparent focus:outline-none text-white"
              value={query} // Controlled input bound to query state
              onChange={handleSearchInputChange} // Update query state on input change
              autoComplete="off"
              autoCorrect="off"
            />
            <button
              type="submit"
              className="bg-white h-11 w-11 rounded-r-lg flex items-center justify-center"
            >
              <img src="/search.svg" alt="search" className="h-6 w-6" />
            </button>
          </div>

          
          {/* Suggestions Dropdown */}
          <div
            className={`suggestionSection lg:shadow-xl  lg:shadow-black absolute scroll-hide top-[2.74rem] lg:top-[4.5rem] left-0 lg:left-auto bg-[#1B1B1B] text-white p-3 grid grid-cols-2 lg:grid-cols-3 gap-3 rounded-lg  w-full max-h-[20rem] overflow-auto transition-transform duration-200 ${
              suggestions.length > 0
                ? "visible opacity-100 left-1 "
                : "invisible opacity-0"
            }`}
          > 
            {suggestions.map((suggestion, index) => (
              
              <div
                key={index}
                className="flex items-center gap-3 bg-zinc-800 p-3 rounded cursor-pointer hover:bg-[#313131]"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <img
                  src={suggestion.image}
                  alt=""
                  className="h-[3rem] w-[3rem] rounded"
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm truncate ">{suggestion.name}</span>
                  <span className="text-gray-500 text-xs">
                    {suggestion.type}
                  </span>
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
