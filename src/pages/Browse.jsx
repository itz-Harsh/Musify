import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Navigator from "../components/Navigator";
import Player from "../components/Player";
import { genreData } from "../genreData";
import { useNavigate } from "react-router";
import he from "he";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

function Browse() {
  const genres = ["For You", "Hindi" , "English" , "Punjabi", "Rajasthani" ,  "Tamil" , "Telugu", "Marathi", "Gujarati", "Bengali", "Kannada"];
  const [selectedGenre, setSelectedGenre] = useState("For You");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);


  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 800; // Scroll left by 800px
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 800; // Scroll right by 800px
    }
  };


  useEffect(() => {
    setPlaylists(genreData["For You"]);
  }, []);


  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);

    if (genre === "For You") {
      setPlaylists(genreData["For You"]); // Load local data for "For You"
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://jsaavn-api.vercel.app/api/search/playlists?query=${genre.toLowerCase()}&limit=30`);
      const data = await response.json();
     
      setPlaylists(data.data.results); 
       
    } catch (error) {
      console.error("Error fetching data:", error);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };


    const navigate = useNavigate();
    const handlePlaylistClick = (genre) => {
      navigate(`/playlists/${genre.id}`);
    };

    return (
      <>
        <Navbar />
        <div className="mt-[8.3rem] lg:mt-[6em] mb-[12rem] lg:mb-[4rem]">
        <ul className=" flex scroll-smooth items-center lg:justify-center gap-[1.5rem] border-b-[1px] px-4 pb-5 border-[#2c2c2c] overflow-scroll scroll-hide lg:overflow-auto lg:flex-wrap ">
        {genres.map((genre) => (
          <pre
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`flex font-semibold text-[#cccccc] items-center cursor-pointer w-fit p-1 list-none   text-center px-5 text-base  rounded-3xl transition-all duration-500
              ${
                selectedGenre === genre
                  ? "bg-zinc-600 text-white " // Selected Button Style
                  : " bg-[#2b2b2b] "
              }`}
          >
            {genre}
          </pre>
        ))}
         </ul> 
        <div className="flex flex-col gap-5 ">
          <h2 className="text-2xl font-semibold ml-[1.5rem] lg:ml-[4rem] grey  mt-3 " >• {genres}</h2>
          <div className="flex justify-center items-center">

            <MdOutlineKeyboardArrowLeft
              className="text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer  h-[9rem]
                 text-[#1b1b1b] hidden lg:block hover:text-white "
              onClick={scrollLeft}
            />

            <div
              ref={scrollRef}
              className=" grid lg:grid-rows-2 lg:grid-cols-none scroll-smooth grid-cols-2  lg:grid-flow-col-dense gap-[1.4rem] w-full px-[1.4rem] overflow-x-scroll scroll-hide">
              {playlists.map((genre) => (
                <span key={genre.id} onClick={() => handlePlaylistClick(genre)} className="h-[13rem] overflow-hidden w-[10rem] cursor-pointer py-1 bg-[#202020] rounded-md ">
                  <img src={genre.image[2].url} className="h-[10rem] p-3  rounded-2xl hover:brightness-[0.65] " />
                  <p className="text-center text-[14px] px-1">{genre.name ? he.decode(genre.name) : "Empty"}</p>
                </span>
              ))}
            </div>
            <MdOutlineKeyboardArrowRight
              className="text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
              onClick={scrollRight}
            />

          </div>
        </div>
        </div>
        <Player />
        <Navigator />
      </>
    );
  }

  export default Browse;
