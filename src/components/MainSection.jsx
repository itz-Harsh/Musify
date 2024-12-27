import { useEffect, useState } from "react";
import {
  searchAlbumByQuery,
  searchArtistByQuery,
  searchPlayListByQuery,
} from "../../fetch"; // Assuming the function is imported correctly
import AlbumSlider from "./Sliders/AlbumSlider";
import ArtistSlider from "./Sliders/artistSlider";
import PlaylistSlider from "./Sliders/PlaylistSlider";

const MainSection = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]); // Corrected variable name from 'artist' to 'artists'
  const [playlists, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        // Fetch New Releases using 'latest' query from JioSaavn API
        const Album = await searchAlbumByQuery("latest");
        setAlbums(Album.data.results); // Assuming the response has 'data.results' with album data
      } catch (err) {
        setError(err.message); // Handle fetch error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    const fetchArtistData = async () => {
      try {
        // Fetch New Releases using 'top-artists' query from JioSaavn API
        const Artist = await searchArtistByQuery("top-artists");
        setArtists(Artist.data.results);
      } catch (err) {
        setError(err.message); // Handle fetch error
      } finally {
        setLoading(true); // Set loading to false
      }
    };

    const fetchPlaylistData = async () => {
      try {
        const playlist = await searchPlayListByQuery("india");
        setPlaylist(playlist.data.results);
      } catch (err) {
        setError(err.message); // Handle fetch error
      } finally {
        setLoading(true); // Set loading to false
      }
    };




    fetchPlaylistData();
    fetchAlbumData();
    fetchArtistData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    
    <div className="my-24 ">
      <div>
        <h2 className="m-4 text-2xl m-4 w-full lg:w-[33vw] font-semibold text-zinc-200 text-center">
          New Releases
        </h2>
        <AlbumSlider albums={albums} /> {/* Pass albums prop correctly */}
      </div>
      <br />
      <div>
        <h2 className="m-4 text-2xl  w-full lg:w-[33vw] font-semibold text-zinc-200 text-center">
          Top Artists
        </h2>
        <ArtistSlider artists={artists} />
      </div>
      <br />
      <div>
      <h2 className="m-4 text-2xl  w-full lg:w-[33vw] font-semibold text-zinc-200 text-center">
          Top Playlists
        </h2>
        <PlaylistSlider playlists={playlists} />
      </div>
    </div>
  );
};

export default MainSection;
