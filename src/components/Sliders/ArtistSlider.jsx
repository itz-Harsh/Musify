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

    <div className="flex justify-center items-center gap-4">
      {/* Left Arrow */}
      <MdOutlineKeyboardArrowLeft
        className="text-3xl  w-[2rem] hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer text-[#1b1b1b] hidden lg:block hover:text-white"
        onClick={scrollLeft}
      />

  
      <div
        className="grid grid-rows-1 grid-flow-col-dense justify-between overflow-x-scroll scroll-hide items-center gap-3 w-full  px-3 scroll-smooth"
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
        className="text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer text-[#1b1b1b] hidden lg:block hover:text-white"
        onClick={scrollRight}
      />
    </div>
    
    
    </>
  );
};

export default ArtistSlider;
