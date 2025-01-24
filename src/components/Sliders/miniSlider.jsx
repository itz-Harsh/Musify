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
        className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
        onClick={scrollLeft}
      />

      {/* Albums Grid */}
      <div
        className="grid grid-rows-1 grid-flow-col gap-2 lg:gap-4 overflow-x-auto scroll-hide w-full  lg:w-[90vw] px-3 lg:px-6 scroll-smooth"
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
        className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
        onClick={scrollRight}
      />
    </div>
  );
};

export default MiniSlider;
