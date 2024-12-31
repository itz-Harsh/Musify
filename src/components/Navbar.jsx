import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [query, setQuery] = useState([null]); // State to handle the search query
  const navigate = useNavigate(); // useNavigate to programmatically navigate to the search route

  const handleSearch = (event) => {
    setQuery(event.target.value);
     
    if (query.trim()) {
      navigate(`/search/${query}`); // Navigate to the search results page
    }
  };

  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <nav className="flex justify-between items-center fixed  h-[4.5em]  p-1 navbar top-0 w-full flex-col lg:flex-row">
      <div className="flex items-center ml-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/White_musify.svg" alt="Musify" className="h-16" />
          <div className="gap-1">
            <span className="text-zinc-200 font-extrabold text-3xl ">Musi</span>
            <span className="text-zinc-600 font-extrabold text-3xl ">fy</span>
          </div>
        </Link>
      </div>
      <div className="text-xl text-[#cecece] font-semibold flex pt-2 w-[25rem] ">{getGreeting()}</div>
      <div className="flex gap-5">


        <div>
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full m-3"
          >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for Songs, Artists, and Playlists"
              className="h-11 w-full lg:w-[85%] p-1 pl-5 rounded-l-lg bg-transparent focus:outline-none text-white"
              value={query} // Controlled input bound to query state
              onChange={handleSearch} // Update query state on input change
            />
            <button
              type="submit"
              className="bg-white h-11 w-11 rounded-r-lg flex items-center justify-center"
            >
              <img src="/search.svg" alt="search" className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
