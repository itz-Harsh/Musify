import { useRef } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import SongItems from "../Items/SearchItems";

const SongSlider = ({ results }) => {
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
    
    <div className="flex justify-center items-center gap-1 ">
      <MdOutlineKeyboardArrowLeft
        className="text-4xl hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block  hover:text-white"
        onClick={scrollLeft}
      />

      <div
        className="grid grid-rows-1 grid-flow-col-dense overflow-x-scroll scroll-hide gap-4 w-full lg:w-[87vw]  items-center  scroll-smooth"
        ref={scrollRef}
      >
        {results.map((result) => (
          <SongItems key={result.id} {...result} />
        ))}
      </div>

      <MdOutlineKeyboardArrowRight
        className="text-4xl hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
        onClick={scrollRight}
      />
    </div>
  );
};

export default SongSlider;
