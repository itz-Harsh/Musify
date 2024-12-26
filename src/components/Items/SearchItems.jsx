import { Link } from "react-router-dom";

const SearchItems = ({ id, name, artists, image }) => {
  const artistNames = Array.isArray(artists?.primary)
    ? artists.primary.map((artist) => artist.name).join(", ")
    : "Unknown Artist";

  // Fallback image
  const imageUrl = Array.isArray(image) && image.length > 2 ? image[2].url : "/placeholder.png";

  return (
    <Link
      to={`/albums/${id}`}
      className="w-[134px] max-h-[200px] flex flex-col justify-center items-center gap-3 rounded-lg overflow-hidden"
    >
      <img src={imageUrl} alt={name} className="rounded-lg w-full" />
      <div className="text-[13px] w-full flex flex-col justify-center items-center">
        <span className="font-semibold text-center truncate">{name}</span>
        <p className="text-center text-gray-400">{artistNames}</p>
      </div>
    </Link>
  );
};

export default SearchItems;
