import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // To fetch artist ID from URL
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SongsList from "../components/SongsList";
import Footer from "../components/footer";
import MiniSlider from "../components/Sliders/miniSlider";
import AlbumSlider from "../components/Sliders/AlbumSlider";
import Navigator from "../components/Navigator";
import ArtistItems from "../components/Items/ArtistItems";
import { IoMdArrowRoundBack } from "react-icons/io";

const ArtistsDetails = () => {
  const { id } = useParams(); // Extract the artist ID from the URL
  const [details, setDetails] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [list , setList ] = useState({});
  const naviagte = useNavigate();
  const FollowerCount = (followerCount) => {
    if (!followerCount || isNaN(followerCount)) {
      return "Not available"; // Fallback for invalid or missing data
    }

    const count = parseInt(followerCount, 10);
    const Million = 1000000;
    const follower = (count / Million).toFixed(2);
    return follower;
  };

  const FanCount = (fanCount) => {
    if (!fanCount || isNaN(fanCount)) {
      return "Not available"; // Fallback for invalid or missing data
    }

    const count = parseInt(fanCount, 10);
    const Thousand = 100000;
    const fan = (count / Thousand).toFixed(2);
    return fan;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let response = await fetch(`https://jiosaavnapi-harsh.vercel.app/api/artists?id=${id}`);
        
         if (!response.ok) {
          response = await fetch(`https://saavn.dev/api/artists?id=${id}`);
        }
  
        if (!response.ok) {
          throw new Error("Both APIs failed");
        }
  
        const data = await response.json();
        console.log(data);
        setDetails(data);
        setList(data.data.topSongs);
  
      } catch (err) {
        console.error(err);
        setError("Error fetching artist details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDetails();
  }, [id]);


  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        
        <img src="/Loading.gif" alt="" className=""/>
        
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen justify-center items-center font-semibold">
        <IoMdArrowRoundBack className="text-2xl m-2 lg:cursor-pointer" onClick={() => naviagte(-1)}/>
        {error}
      </div>
    );
  }

  const artistData = details.data || {}; // Fallback to an empty object if `data` is undefined
  const artistImage = artistData.image?.[2]?.url || ""; // Safely access image URL

  return (
    <>
      <Navbar />
      <div className=" mb-10">
        <div className="mt-[8rem] lg:mt-[6rem]  flex flex-col justify-center gap-[1rem]  pt-5 ">
          <div className="pl-[2rem] flex gap-5 items-center">
            <img
              src={artistImage}
              alt={artistData.name}
              className="artistDetails h-[8rem] lg:h-[15rem] lg:rounded rounded-full"
            />

            <div className="flex flex-col gap-2 ">
              <h1 className="text-2xl font-bold mt-5 flex ">
                {artistData.name}
                {artistData.isVerified && (
                  <div className="flex ">
                    <img
                      src="/verified.svg"
                      alt="Verified"
                      className="ml-2 mt-1 w-[1.2rem]   flex  "
                    />
                  </div>
                )}
              </h1>
              <div className="flex flex-col">
                <span className="text-[0.70rem] lg:text-[0.90rem] font-medium">
                  Followers : {FollowerCount(artistData.followerCount)} Million
                </span>
                <span className="text-[0.70rem] lg:text-[0.90rem] font-medium ">
                  Listeners : {FanCount(artistData.fanCount)} K
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-[1rem] gap-[1rem] h-[40rem]">
            <h2 className="text-2xl font-bold pl-[1.5rem] block">Top Songs</h2>
            <div className="p-2 w-full overflow-y-scroll scroll-hide ">
              {artistData.topSongs.map((album) => (
                <SongsList key={album.id} {...album} song={list} />
              ))}
            </div>
          </div>
        </div>
        <div  className="flex flex-col gap-2">
          <div className="gap-4 flex flex-col">
            {details.data.similarArtists.length > 0 && (
              <>
                <h2 className=" lg:font-bold text-xl lg:text-2xl font-semibold pl-[1.5rem] lg:pl-[3rem] pb-[1rem] ">
                  Similar Artists
                </h2>
                <div className="grid grid-flow-col lg:w-max pr-10  gap-4 pl-[1.2rem] lg:pl-[3rem] overflow-x-scroll scroll-hide ">
                  {details.data.similarArtists?.map((artist) => (
                    <ArtistItems
                      key={artist.id}
                      {...artist} // Fallback image
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            <h2 className=" m-4 lg:font-bold text-xl lg:text-2xl font-semibold  w-[90%] lg:ml-[3rem]">
              Top Albums
            </h2>
            <MiniSlider albums={artistData.topAlbums} />
          </div>
          <div>
            <h2 className=" m-4 text-xl lg:font-bold lg:text-2xl font-semibold  w-[90%] lg:ml-[3rem]">
              Singles
            </h2>
            <AlbumSlider albums={details.data.singles} />
          </div>
        </div>
      </div>
      <Player />
      <Navigator />
      <Footer />
    </>
  );
};

export default ArtistsDetails;
