import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRef } from "react";
import ArtistItems from "../Items/ArtistItems";

const ArtistSlider = ({ artists }) => {
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

    <div className="flex justify-center items-center gap-4 ">
      {/* Left Arrow */}
      <MdOutlineKeyboardArrowLeft
        className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block "
        onClick={scrollLeft}
      />

  
      <div
        className="grid grid-rows-1 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-[1rem] lg:gap-3.5 w-full  px-3 lg:px-0 scroll-smooth"
        ref={scrollRef}
      >
        {artists?.map((artist) => (
          <ArtistItems
          key={artist.id}
          {...artist}// Fallback image
        />
        ))}
      </div>

      {/* Right Arrow */}
      <MdOutlineKeyboardArrowRight
        className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block "
        onClick={scrollRight}
      />
    </div>
    
    
    </>
  );
};

export default ArtistSlider;
