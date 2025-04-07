import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // To fetch album ID from URL
import Navbar from "../components/Navbar";
import SongsList from "../components/SongsList";
import Player from "../components/Player";
import { fetchAlbumByID, getSuggestionSong } from "../../fetch";
import Footer from "../components/footer";
import Navigator from "../components/Navigator";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import SongGrid from "../components/SongGrid";
import { useRef } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
const AlbumDetail = () => {
  const { id } = useParams(); // Extract the album ID from the URL
  const [details, setDetails] = useState(null);
  const [suggetions, setSuggetion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState({});
  const [error, setError] = useState(null);

  const [likedAlbums, setLikedAlbums] = useState(() => {
    return JSON.parse(localStorage.getItem("likedAlbums")) || [];
  });
  const scrollRef = useRef(null);
  const scrollLeft = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 1000; // Scroll left by 800px
    }
  };

  const scrollRight = (scrollRef) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 1000; // Scroll right by 800px
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchAlbumByID(id);
        setDetails(data);
        console.log(data);

        const sugid = data?.data?.songs[0]?.id;
        const suggestions = await getSuggestionSong(sugid);
        setSuggetion(suggestions.data);

        const albumSongs = data.data.songs;
        const suggestedSongs = suggestions.data;

        const filteredSuggestedSongs = suggestedSongs.filter(
          (suggestedSong) =>
            !albumSongs.some((albumSong) => albumSong.id === suggestedSong.id)
        );

        const combineArray = [...albumSongs, ...filteredSuggestedSongs];

        console.log("Combined Songs:", combineArray);

        setList(albumSongs);
      } catch (err) {
        setError("Error fetching album details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Call fetchDetails function whenever `id` changes
    fetchDetails();
  }, [id]); // Dependency array, the effect runs when `id` changes

  const toggleLikeAlbum = () => {
    let likedAlbums = JSON.parse(localStorage.getItem("likedAlbums")) || [];

    if (likedAlbums.some((album) => album.id === details.data.id)) {
      likedAlbums = likedAlbums.filter((album) => album.id !== details.data.id);
    } else {
      likedAlbums.push({
        id: details.data.id,
        name: details.data.name,
        image: details.data.image[2].url,
        artists: details.data.artists,
      });
    }

    setLikedAlbums(likedAlbums);
    localStorage.setItem("likedAlbums", JSON.stringify(likedAlbums));
  };

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
  const albumdata = details.data || [];
  const artistId = details.data.artists.primary[0].id;
  const artistName = details.data.artists.primary[0].name;

  return (
    <>
      <Navbar />

      <div className="flex flex-col   gap-[2rem] lg:gap-[2rem]  pt-[10rem] lg:pt-[6rem]   ">
        <div className="flex items-center pl-[2rem] ">
          <img
            src={details.data.image[2].url}
            alt={details.name}
            className=" h-[8rem] lg:h-[15rem] lg:rounded rounded-full object-cover  shadow-2xl shadow-zinc-600"
          />

          <div className="flex flex-col pl-[2rem]">
            <div>
              <h2 className="text-xl lg:text-2xl font-medium lg:font-semibold ">
                {details.data.name}
              </h2>
              <pre className="font-sans font-semibold text-sm lg:text-lg">
                {details.data.songCount} Songs by{" "}
                <Link to={`/artists/${artistId}`} className="hover:underline">
                  {artistName}
                </Link>{" "}
              </pre>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleLikeAlbum}
                title="Like Album"
                className=" border-[1px] mt-3 border-[#8f8f8f6e] h-[3rem] w-[3rem] flex justify-center items-center rounded-full  "
              >
                {likedAlbums.some((album) => album.id === albumdata.id) ? (
                  <FaHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="text-2xl icon" />
                )}
              </button>
              <button
                className=" border-[1px] mt-3 border-[#8f8f8f6e] flex justify-center items-center h-[3rem] w-[3rem]  rounded-full  "
                title="Share"
              >
                <IoShareSocial
                  className="icon text-[1.8rem] mr-[0.1rem]"
                  onClick={() =>
                    navigator.share({
                      title: details.data.name,
                      text: `Listen on Musify`,
                      url: `${window.location.origin}/albums/${id}`,
                    })
                  }
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-auto gap-4 ">
          <div className="overflow-y-scroll scroll-smooth scroll-hide  pt-3 ">
            {details.data.songs?.map((song) => (
              <SongsList key={song.id} {...song} song={list} />
            ))}
          </div>
        </div>

        {suggetions.length >= 0 && ( 
          <div className="flex flex-col justify-center items-center w-full mb-[5rem]">
            <h2 className=" lg:ml-[3rem] lg:-translate-x-[37rem] lg:text-center m-4 text-xl sm:text-2xl font-semibold  pl-3 sm:pl-[3rem] w-full">
              You Might Like
            </h2>
            <div className="flex justify-center items-center gap-3 w-full">
              {/* Left Arrow */}
              <MdOutlineKeyboardArrowLeft
                className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block  "
                onClick={() => scrollLeft(scrollRef)}
              />
              <div
                className="grid grid-rows-1  grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth"
                ref={scrollRef}
              >  {suggetions?.map((song, index) => ( 
                  <SongGrid key={song.id || index} {...song} song={list} />
                ))}
              </div>
              {/* Right Arrow */}
              <MdOutlineKeyboardArrowRight
                className="text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block  "
                onClick={() => scrollRight(scrollRef)}
              />
            </div>
          </div>
        )}
 




        </div> 

      <Player />
      <Navigator />
      <Footer />
    </>
  );
};

export default AlbumDetail;
