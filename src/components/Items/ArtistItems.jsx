import { Link } from "react-router-dom";

const ArtistItems = ({ name, artists, id, image }) => {
  // Ensure 'artists' is an array and fallback if empty or undefined
  const artistNames = Array.isArray(artists?.primary) 
    ? artists.primary.map((artist) => artist.name).join(" , ") 
    : "";

  // Ensure image is an array with at least 3 elements, or provide a fallback image
  const imageUrl = image[2].url;

  return (
    <Link
      to={`/artists/${id}`}
      className="w-[160px] max-h-[200px] overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg"
    >
      <img
        src={imageUrl}
        alt={name}
        className="rounded-full"
      />
      <div className="text-[13px] w-full flex flex-col justify-center items-center">
        <span className="font-semibold overflow-x-clip">{name}</span>
        <p>{artistNames}</p>
      </div>
    </Link>
  );
};

export default ArtistItems;
