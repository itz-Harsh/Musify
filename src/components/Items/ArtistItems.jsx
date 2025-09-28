import { Link } from "react-router-dom";

const ArtistItems = ({ name, artists, id, image }) => {
  // Ensure 'artists' is an array and fallback if empty or undefined
  const artistNames = Array.isArray(artists?.primary) 
    ? artists.primary.map((artist) => artist.name).join(" , ") 
    : "";

  // Ensure image is an array with at least 3 elements, or provide a fallback image
  const imageUrl = image[2]?.url;
  
  return (
    <Link
      to={`/artists/${id}`}
      className="w-[5rem] lg:w-[8rem] lg:h-[10.5rem] drop-shadow-lg overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg"
    >
      <img
        src={imageUrl || "/Unknown.png"}
        alt={name}
        className="rounded-[3rem]  lg:hover:scale-105 transition-all duration-200 ease-in-out"
      />
      <div className="text-[13px] lg:h-[2rem] h-[1.9rem] flex flex-col justify-center items-center">
        <span className="font-semibold overflow-x-clip">{name}</span>
      </div>
    </Link>
  );
};

export default ArtistItems;
