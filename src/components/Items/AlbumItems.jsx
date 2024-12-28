import { Link } from "react-router-dom";

const AlbumItems = ({ name, artists, id, image }) => {
  // Ensure 'artists' is an array and fallback if empty or undefined
  const artistNames = Array.isArray(artists?.primary) 
    ? artists.primary.map((artist) => artist.name).join(" , ") 
    : "";

  // Ensure image is an array with at least 3 elements, or provide a fallback image
  const imageUrl = image[2].url;

  return (
    <Link
      to={`/albums/${id}`}
      className=" w-[10rem] pl-5 h-[12.5rem] overflow-clip"
    >
      <div>
      <img
        src={imageUrl}
        alt={name}
        className="rounded-lg card "
      />
      
      </div>
      <div className="text-[13px] w-full flex flex-col justify-center items-center">
        <span className="font-semibold overflow-x-clip">{name}</span>
        <p>{artistNames}</p>
      </div>
    </Link>
  );
};

export default AlbumItems;

