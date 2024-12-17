import { Link } from "react-router-dom";  // Ensure the correct import for React Router
import PropTypes from "prop-types";

const AlbumItems = ({ name, artists, id, image }) => {
  return (
    <Link
      to={`/albums/${id}`}
      className="w-[160px] max-h-[220px] overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg"
    >
      {/* Display the album image */}
      <img
        src={image && image[2]?.link}  // Ensure image exists and the link exists in the third image size
        alt={name}  // Add alt text for better accessibility
        className="rounded-xl"
      />

      <div className="text-[13px] w-full flex flex-col justify-center items-center">
        {/* Display the album name */}
        <span className="font-semibold overflow-x-clip">{name}</span>

        {/* Map through the artists and display their names */}
        <p className="text-center">
          {artists?.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </Link>
  );
};


AlbumItems.propTypes = {
  name: PropTypes.string.isRequired,  // 'name' should be a string and is required
  artists: PropTypes.arrayOf(        // 'artists' should be an array of objects
    PropTypes.shape({
      name: PropTypes.string.isRequired  // Each artist should have a 'name' property which is a string and required
    })
  ).isRequired,
  id: PropTypes.string.isRequired,   // 'id' should be a string and is required
  image: PropTypes.arrayOf(          // 'image' should be an array of objects
    PropTypes.shape({
      link: PropTypes.string.isRequired  // Each image object should have a 'link' property which is a string and required
    })
  ).isRequired
};


export default AlbumItems;
