
import { Link } from "react-router"; 
const PlaylistItems = ({name , image , id , idx}) => {


  // Ensure image is an array with at least 3 elements, or provide a fallback image
  const imageUrl = image[2]?.url || image;

  return (
    <Link
     to={ id ? `/playlists/${id}` : `/playlist/${idx}`}
      className="lg:w-[9.5rem] w-[5.5rem]   flex flex-col justify-center items-center gap-1 rounded-lg"
    > 
      <img
        src={imageUrl || "/Unknown.png"}
        alt={name}
        className="rounded"
      />
      <div className="text-[13px] h-[2.5rem] w-full flex flex-col justify-center items-center">
        <span className="font-semibold overflow-hidden w-[7rem] text-center">{name || ""}</span>
      </div>
    </Link>
  );
};


export default PlaylistItems