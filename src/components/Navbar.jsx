import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed  h-auto  p-1 navbar top-0 w-full flex-col lg:flex-row">

      <div className="flex items-center ml-3" >
        <Link to="/" className="flex items-center gap-2">
          <img src="/White_musify.svg" alt="Musify" className="h-16" />
          <div className="gap-1">
            <span className="text-zinc-200 font-extrabold text-2xl ">Musi</span><span className="text-zinc-600 font-extrabold text-2xl ">fy</span>
          </div>
        </Link>
      </div>


      <div className="flex gap-5">

      <div className="hidden lg:flex items-center w-full">
  <input
    type="text"
    name="search"
    id="search"
    placeholder="Search for Songs, Artists and Playlists"
    className="h-11 w-full lg:w-[85%] p-1 pl-5 rounded-l-lg bg-transparent focus:outline-none"
  />
  <button className="bg-white h-11 w-11 rounded-r-lg flex items-center justify-center">
    <img src="/public/search.svg" alt="search" className="h-6 w-6" />
  </button>
</div>

      </div>
    </nav>
  );
}

export default Navbar;
