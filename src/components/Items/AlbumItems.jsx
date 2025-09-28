import { Link } from "react-router-dom";
import he from "he";

const AlbumItems = ({ name, artists, id, image }) => {
  // Ensure 'artists' is an array and fallback if empty or undefined
  const artistNames = Array.isArray(artists?.primary)
    ? artists.primary.map((artist) => artist.name).join(" , ")
    : "";

  // Ensure image is an array with at least 3 elements, or provide a fallback image
  const imageUrl = image[2].url || image;

  return (
    <Link
      to={`/albums/${id}`}
      className="card  lg:w-[9.5rem] lg:h-[11.9rem] w-[7.5rem] h-[10rem] overflow-clip  border-[0.1px]  p-1  rounded-lg shadow-md "
    >
      <div className="p-1">
        <img
          src={imageUrl || "/Unknown.png"}
          alt={name}
          className="rounded-lg imgs"
        />
      </div>
      <div className="text-[13px] w-full flex flex-col justify-center pl-2">
        <span className="font-semibold overflow-x-clip">
          {name ? he.decode(name) : "Empty"}
        </span>
        <span className="flex gap-1">
          by<p className="font-semibold">{artistNames}</p>
        </span>
      </div>
    </Link>
  );
};

export default AlbumItems;
