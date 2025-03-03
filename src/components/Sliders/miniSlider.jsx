import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import AlbumItems from "../Items/AlbumItems";
import { useRef } from "react";

const MiniSlider = ({ albums }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -800, behavior: "smooth" }); // Smooth scroll left
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 800, behavior: "smooth" }); // Smooth scroll right
    }
  };

  return (
    <div className="flex justify-center items-center gap-3">
      {/* Left Arrow */}
      <MdOutlineKeyboardArrowLeft
        className="text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block "
        onClick={scrollLeft}
      />

      {/* Albums Grid */}
      <div
        className="grid grid-rows-1 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full px-3 lg:px-0 scroll-smooth"
        ref={scrollRef}
      >
        {albums?.map((album) => (
          <AlbumItems
            key={album.id}
            {...album} // Pass album props
          />
        ))}
      </div>

      {/* Right Arrow */}
      <MdOutlineKeyboardArrowRight
        className="text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block "
        onClick={scrollRight}
      />
    </div>
  );
};

export default MiniSlider;
