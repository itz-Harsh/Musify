import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRef } from "react";
import AlbumItems from "../Items/AlbumItems";

const AlbumSlider = ({ albums }) => {
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
        className="text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
        onClick={scrollLeft}
      />

  
      <div
        className="grid lg:grid-rows-2  grid-flow-col-dense justify-between overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full px-3 lg:px-0 scroll-smooth"
        ref={scrollRef}
      >
        {albums?.map((album) => (
          <AlbumItems
          key={album.id}
          {...album}// Fallback image
        />
        ))}
      </div>

      {/* Right Arrow */}
      <MdOutlineKeyboardArrowRight
        className="text-3xl  w-[2rem]  hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer  h-[9rem] text-[#1b1b1b]  hidden lg:block hover:text-white"
        onClick={scrollRight}
      />
    </div>
    
    
    </>
  );
};

export default AlbumSlider;
