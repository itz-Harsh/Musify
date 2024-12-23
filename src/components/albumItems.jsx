import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AlbumItems = ({ name, artists, id, image }) => {
    return (
        <Link
            to={`/albums/${id}`}
            className="w-[160px] max-h-[190px] overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg"
        >
            {/* Display the album image */}
            <div>
            <img
                src={image || '/placeholder.jpg'} // Fallback to a placeholder image if no image URL
                alt={name} // Add alt text for better accessibility
                className="rounded-ml "
            />

            <div className="text-[13px] w-full flex flex-col justify-center items-center">
                {/* Display the album name */}
                <span className="font-semibold ">{name}</span>

                {/* Map through the artists and display their names */}
                <p className="text-center">
                    {artists?.map((artist) => artist.name).join(", ")}
                </p>
            </div>
            </div>
        </Link>
    );
};

AlbumItems.propTypes = {
    name: PropTypes.string.isRequired,
    artists: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string // Now it's a string because `url` is passed directly
};

export default AlbumItems;
