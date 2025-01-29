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
  
      <div className="flex justify-center items-center gap-3 ">
        {/* Left Arrow */}
        <MdOutlineKeyboardArrowLeft
          className="text-3xl hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
          onClick={scrollLeft}
        />
  
    
        <div
          className="grid grid-rows-1 grid-flow-col-dense overflow-x-scroll scroll-hide items-center h-[13rem] gap-4 w-full px-3 scroll-smooth"
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
          className="text-3xl hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
          onClick={scrollRight}
        />
      </div>
      
      
      </>
    );
  };
  
export default PlaylistSlider