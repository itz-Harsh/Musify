import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRef } from "react";
import AlbumItems from "../Items/albumItems";  // Assuming AlbumItems component exists

const MiniSlider = ({ albums }) => {
  const scrollRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 800; // Scroll left by 800px
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 800; // Scroll right by 800px
    }
  };

  return (
    <div className="flex justify-center items-center gap-3">
      {/* Left Arrow */}
      <MdOutlineKeyboardArrowLeft
        className="text-4xl hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
        onClick={scrollLeft}
      />

      {/* Album List with Scrollable Div */}
      <div
        className="grid grid-rows-1 grid-flow-col-dense justify-between overflow-x-scroll scroll-hide items-center gap-4 w-full lg:w-[78vw] px-5 scroll-smooth"
        ref={scrollRef}
      >
        {/* Check if albums are an array and map through it */}
        {Array.isArray(albums) && albums.length > 0 ? (
          albums.map((album) => (
            <AlbumItems key={album.id} {...album} />  // Ensure AlbumItems can handle the passed props correctly
          ))
        ) : (
          <div>No albums available</div>  // Fallback message if no albums are available
        )}
      </div>

      {/* Right Arrow */}
      <MdOutlineKeyboardArrowRight
        className="text-4xl hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
        onClick={scrollRight}
      />
    </div>
  );
};

export default MiniSlider;
