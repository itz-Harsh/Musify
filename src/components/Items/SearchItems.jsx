import { Link } from "react-router-dom";

const SearchItems = ({ search }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {search.map((item) => {
        const { id, name, type, artists, image } = item;

        const artistNames = Array.isArray(artists?.primary)
          ? artists.primary.map((artist) => artist.name).join(", ")
          : "Unknown Artist";

        const imageUrl =
          Array.isArray(image) && image.length > 0
            ? image[2]?.url
            : "/placeholder.png";

        const linkPath = type === "album" ? `/albums/${id}` : `/songs/${id}`;

        return (
          <>
          <Link
            key={id}
            to={linkPath}
            className="w-[134px] max-h-[200px] flex flex-col justify-center items-center gap-3 rounded-lg overflow-hidden"
          >
            <img src={imageUrl} alt={name} className="rounded-lg w-full" />
            <div className="text-[13px] w-full flex flex-col justify-center items-center">
              <span className="font-semibold text-center truncate">
                {name}
              </span>
              <p className="text-center text-gray-400">{artistNames}</p>
            </div>
          </Link>
          <>
            if (type === ) {
              
            }
          </>
          </>);
      })}
    </div>
  );
  };

export default SearchItems;
