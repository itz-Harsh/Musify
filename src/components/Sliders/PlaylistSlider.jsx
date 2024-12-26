import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRef } from "react";
import PlaylistItems from "../Items/PlaylistItems";

const PlaylistSlider = ({playlists}) => {
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
  
    return (
      <>
  
      <div className="flex justify-center items-center gap-3">
        {/* Left Arrow */}
        <MdOutlineKeyboardArrowLeft
          className="text-4xl hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
          onClick={scrollLeft}
        />
  
    
        <div
          className="grid grid-rows-1 grid-flow-col-dense justify-between overflow-x-scroll scroll-hide items-center gap-4 w-full lg:w-[78vw] px-5 scroll-smooth"
          ref={scrollRef}
        >
          {playlists?.map((playlist) => (
            <PlaylistItems
            key={playlist.id}
            {...playlist}// Fallback image
          />
          ))}
        </div>
  
        {/* Right Arrow */}
        <MdOutlineKeyboardArrowRight
          className="text-4xl hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
          onClick={scrollRight}
        />
      </div>
      
      
      </>
    );
  };
  
export default PlaylistSlider