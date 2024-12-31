import { useEffect, useState } from "react";
import {
  fetchplaylistsByID,
  searchAlbumByQuery,
  searchArtistByQuery,
  searchPlayListByQuery,
} from "../../fetch"; // Assuming the function is imported correctly
import AlbumSlider from "./Sliders/AlbumSlider";
import PlaylistSlider from "./Sliders/PlaylistSlider";
import ArtistSlider from "./Sliders/ArtistSlider";
import SongGrid from "./SongGrid";
import { useRef } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const MainSection = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollLeft -= 800; // Scroll left by 800px
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollLeft += 800; // Scroll right by 800px
    }
  };


  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const song = await fetchplaylistsByID(110858205);
        setSongs(song.data.songs);
        console.log(song.data.songs);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAlbumData = async () => {
      try {
        const album = await searchAlbumByQuery("latest");
        setAlbums(album.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchArtistData = async () => {
      try {
        const artist = await searchArtistByQuery("top-artists");
        setArtists(artist.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlaylistData = async () => {
      try {
        const playlist = await searchPlayListByQuery("india");
        setPlaylists(playlist.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch all data simultaneously
    fetchSongData();
    fetchAlbumData();
    fetchArtistData();
    fetchPlaylistData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-24 flex flex-col items-center">
      <div className="">
        <h2 className="m-4 text-2xl font-semibold text-zinc-200 pl-[4rem] w-[95%]">
          Today Trending
        </h2>
        <div className="flex justify-center items-center gap-3">
      {/* Left Arrow */}
      <MdOutlineKeyboardArrowLeft
        className="text-4xl hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
        onClick={scrollLeft}
      />

  
      <div
        className="grid grid-rows-2 grid-flow-col-dense justify-between overflow-x-scroll scroll-hide items-center gap-4 w-full lg:w-[78vw] px-5 scroll-smooth"
        ref={scrollRef}
      >
        {songs?.map((song) => (
          <SongGrid
          key={song.id}
          {...song}// Fallback image
        />
        ))}
      </div>

      {/* Right Arrow */}
      <MdOutlineKeyboardArrowRight
        className="text-4xl hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer text-zinc-400 hidden lg:block hover:text-white"
        onClick={scrollRight}
      />
    </div>
      </div>
      <br />

      <div>
        <h2 className="m-4 text-2xl font-semibold text-zinc-200 pl-[4rem] w-[95%]">
          New Releases
        </h2>
        <AlbumSlider albums={albums} />
      </div>
      <br />

      <div>
        <h2 className="m-4 text-2xl font-semibold text-zinc-200 pl-[4rem] w-[95%]">
          Top Artists
        </h2>
        <ArtistSlider artists={artists} />
      </div>
      <br />

      <div>
        <h2 className="m-4 text-2xl font-semibold text-zinc-200 pl-[4rem] w-[95%]">
          Top Playlists
        </h2>
        <PlaylistSlider playlists={playlists} />
      </div>
    </div>
  );
};

export default MainSection;
