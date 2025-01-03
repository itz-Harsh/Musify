
import { Link } from "react-router"; 
const PlaylistItems = ({name , image , id}) => {


  // Ensure image is an array with at least 3 elements, or provide a fallback image
  const imageUrl = image[2].url;

  return (
    <Link
      to={`/playlists/${id}`}
      className="w-[135px] max-h-[200px] overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg"
    >
      <img
        src={imageUrl}
        alt={name}
        className="rounded-full"
      />
      <div className="text-[13px] w-full flex flex-col justify-center items-center">
        <span className="font-semibold overflow-x-clip">{name}</span>
      </div>
    </Link>
  );
};


export default PlaylistItems