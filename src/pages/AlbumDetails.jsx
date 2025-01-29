import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // To fetch album ID from URL
import Navbar from "../components/Navbar";
import SongsList from "../components/SongsList";
import Player from "../components/Player";
import { fetchAlbumByID } from "../../fetch";
import { useContext } from "react";
import MusicContext from "../context/MusicContext";
import Footer from "../components/footer";
import Navigator from "../components/Navigator";
import ArtistItems from "../components/Items/ArtistItems";

const AlbumDetail = () => {
  const { id } = useParams(); // Extract the album ID from the URL
  const [details, setDetails] = useState(null); // Set initial state to null to avoid errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSongs } = useContext(MusicContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchAlbumByID(id); // Fetch album details based on the album ID
        setDetails(data);
        setSongs(data.data.songs);
        console.log(data);
      } catch (err) {
        setError("Error fetching album details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); // Fetch details when the id changes (when navigating to a different album)

  if (loading)
    return (
      <div className="flex h-screen w-screen justify-center items-center ">
        {" "}
        <img src="/Loading.gif" alt="" />{" "}
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        {error}
      </div>
    );
  const artistId = details.data.artists.primary[0].id;
  const artistName = details.data.artists.primary[0].name;

  return (
    <>
      <Navbar />

      <div className="flex flex-col   gap-[2rem] lg:gap-[4rem] text-zinc-300 pt-[10rem] lg:pt-[6rem]   ">
        <div className="flex items-center pl-[2rem]">
          <img
            src={ details.data.image[2].url}
            alt={details.name}
            className="DetailImg h-[8rem] lg:h-[15rem] lg:rounded rounded-full "
          />

          <div className="flex flex-col pl-[2rem]">
            <h1 className="text-xl lg:text-2xl font-medium lg:font-semibold text-white">
              {details.data.name}
            </h1>
            <pre className="font-sans font-semibold text-sm lg:text-lg">
              {details.data.songCount} Songs by{" "}
              <Link to={`/artists/${artistId}`} className="hover:underline">
                {artistName}
              </Link>{" "}
            </pre>
          </div>
        </div>

        <div className="flex flex-col h-auto gap-4 ">
          <div className="overflow-y-scroll scroll-smooth scroll-hide  pt-3 ">
            {details.data.songs?.map((song) => (
              <SongsList key={song.id} {...song} />
            ))}
          </div>
        </div>
      </div>
     
      <Player />
      <Navigator />
      <Footer />
    </>
  );
};

export default AlbumDetail;
