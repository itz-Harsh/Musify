import { Link } from "react-router-dom";

const ArtistCard = ({ name, id, image }) => {
  // Ensure that the image array exists and contains a valid URL at index 2
  const imageUrl = (image && image[2] && image[2].url) || "/public/placeholder.jpg"; // Fallback image

  return (
    <Link
      to={`/albums/${id}`}
      className="w-[160px] max-h-[200px] overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg"
    >
      <img
        src={imageUrl}
        alt={name || "Artist"} // Use "Artist" if name is not provided
        className=" "
      />
      <div className="text-[13px] w-full flex flex-col justify-center items-center">
        <span className="font-semibold overflow-x-clip">{name || "Unknown Artist"}</span>
      </div>
    </Link>
  );
};

export default ArtistCard;
