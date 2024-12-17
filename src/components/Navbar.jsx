import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center  h-auto bg-zinc-900 p-1 rounded-xl fixed top-0 w-full flex-col lg:flex-row">
      
      <div className="flex items-center ml-3" >
        <Link to="/" className="flex items-center gap-2">
          <img src="/White_musify.svg" alt="Musify" className="h-16" />
          <h2 className="text-white font-bold text-lg hover:text-emerald-400">Musify</h2>
        </Link>
      </div>

      {/* Navigation links (Music, Library, Profile) */}
      <div className="flex items-center mt-4 lg:mt-0">
        <ul className="flex flex-row gap-8">
          <li><Link to="/Music" className="hover:text-emerald-400 text-lg">Music</Link></li>
          <li><Link to="/library" className="hover:text-emerald-400 text-lg">Library</Link></li>
          <li><Link to="/profile" className="hover:text-emerald-400 text-lg">Go Pro</Link></li>
        </ul>
      </div>

      {/* Search bar */}
      <div className="hidden lg:block flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for Songs , Artists and Playlists"
          className="h-11 lg:w-screen p-1 pl-5 rounded-3xl bg-zinc-800 focus:outline-none"
        />
      </div>

      {/* Login/Signup/Profile (hidden on small devices) */}
      <div className="hidden lg:flex items-center space-x-8 mr-5">
        <ul className="flex items-center gap-8">
          <li><Link to="/login" className="hover:text-emerald-400 text-lg">Log in</Link></li>
          <li><Link to="/signup" className="hover:text-emerald-400 text-lg">Sign Up</Link></li>
          <li>
            <Link to="/profile" className="hover:bg-emerald-600 flex justify-center items-center h-11 w-11 rounded-full">
              <img src="/profile.svg" alt="Profile" className="h-8" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
