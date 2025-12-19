import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { fetchplaylistsByID } from "../../fetch";
import Footer from "../components/footer";
import MusicContext from "../context/MusicContext";
import SongsList from "../components/SongsList";
import Navigator from "../components/Navigator";
import { FaHeart, FaRegHeart, FaTrashCan } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";


const PlaylistDetails = () => {
  const { id, idx } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  const { playMusic } = useContext(MusicContext);

  const [likedPlaylists, setLikedPlaylists] = useState(() => {
    return JSON.parse(localStorage.getItem("likedPlaylists")) || [];
  });

  // editable title state
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");


  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchplaylistsByID(id);
        setDetails(data.data);
        setList(data.data.songs);
      } catch {
        setError("Failed to fetch playlist details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const spotx = () => {
      try {
        const data = JSON.parse(localStorage.getItem("spotx"));
        setDetails(data[idx]);
        setList(data[idx].songs);
      } catch {
        setError("Failed to fetch playlist details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    id ? fetchDetails() : spotx();
  }, [id, idx]);

  /* ---------------- Persist likes ---------------- */

  useEffect(() => {
    localStorage.setItem("likedPlaylists", JSON.stringify(likedPlaylists));
  }, [likedPlaylists]);

  /* ---------------- Derived data ---------------- */

  const playlistData = details || {};
  const playlistImage =
    playlistData.image?.[2]?.url || playlistData.image || "/default-image.png";

  /* ---------------- Editable title logic ---------------- */

  const storageKey = id
    ? `playlist-title-${id}`
    : `playlist-title-local-${idx}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setText(saved);
    } else if (playlistData?.name) {
      setText(playlistData.name);
    }
  }, [storageKey, playlistData?.name]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <img src="/Loading.gif" alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen justify-center items-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  const saveText = () => {
    const load = JSON.parse(localStorage.getItem("spotx"));
    load[idx].name = text;
    localStorage.setItem("spotx",JSON.stringify(load));

    setIsEditing(false);
  };


  const toggleLikePlaylist = () => {
    let updated = [...likedPlaylists];

    if (updated.some((p) => p.id === playlistData.id)) {
      updated = updated.filter((p) => p.id !== playlistData.id);
    } else {
      updated.push({
        id: playlistData.id,
        name: playlistData.name,
        image: playlistImage,
      });
    }

    setLikedPlaylists(updated);
  };

  const playFirstSong = () => {
    if (!playlistData.songs?.length) return;

    const song = playlistData.songs[0];
    const audioSource =
      song.downloadUrl?.[4]?.url || song.downloadUrl || song.audio;

    playMusic(
      audioSource,
      song.name,
      song.duration,
      song.image,
      song.id,
      song.artists,
      playlistData.songs
    );
  };

  const totalDuration = playlistData.songs
    ?.map((s) => s.duration)
    .reduce((a, b) => a + b, 0);

  const formatDuration = (d) => {
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    return `${h}h ${m}m`;
  };

const deleteAtIndex = (index) => {
  const idxNum = Number(index);   // 🔥 FIX

  const arr = JSON.parse(localStorage.getItem("spotx")) || [];
  const updated = arr.filter((_, i) => i !== idxNum);

  localStorage.setItem("spotx", JSON.stringify(updated));
  navigate("/Music");
};



  return (
    <>
      <Navbar />

      <div className="flex flex-col mt-[11rem] lg:mt-[6rem] ">
        {/* Playlist Header */}
        <div className="flex items-center lg:pl-[2rem] lg:flex-row flex-col gap-[1rem] lg:gap-[2rem]">
          <img
            src={playlistImage}
            alt={playlistData.name || "Playlist"}
            className="w-[10rem] lg:w-[15rem] rounded object-cover DetailImg"
          />
          <div className="flex flex-col gap-1 items-center">
            <h1
              className={`text-2xl lg:text-3xl font-bold ${
                id ? "" : "cursor-pointer"
              }`}
              onDoubleClick={() => {
                if (!id) setIsEditing(true);
              }}
            >
              {!isEditing || id ? (
                text
              ) : (
                <input
                  autoFocus
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onBlur={saveText}
                  onKeyDown={(e) => e.key === "Enter" && saveText()}
                  className="bg-transparent outline-none text-center"
                />
              )}
            </h1>
            <p className="text-sm lg:text-lg font-semibold">
              Total Songs : {playlistData.songCount || list.length}
            </p>
            <p className="text-sm lg:text-lg font-semibold">
              Total Duration : {formatDuration(totalDuration)}
            </p>
            <div className="flex lg:mt-4 gap-4">
              <span className=" hidden lg:flex justify-center items-center h-[3rem] w-[3rem] border-[1px] border-[#8f8f8f6e]  rounded-full cursor-pointer ">
                <FaPlay
                  className=" text-xl icon active:scale-90"
                  onClick={playFirstSong}
                />
              </span>
              {id ? (
                <button
                  onClick={toggleLikePlaylist}
                  title="Like Playlist"
                  className="hidden mb-[1.4rem] border-[1px] border-[#8f8f8f6e] h-[3rem] w-[3rem] lg:flex justify-center items-center rounded-full "
                >
                  {likedPlaylists.some((p) => p.id === playlistData.id) ? (
                    <FaHeart className="text-red-500 text-2xl" />
                  ) : (
                    <FaRegHeart className="icon text-2xl" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => deleteAtIndex(idx)}
                  title="Like Playlist"
                  className="hidden mb-[1.4rem] border-[1px] border-[#8f8f8f6e] h-[3rem] w-[3rem] lg:flex justify-center items-center rounded-full "
                >
                  <FaTrashCan />
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            {id ? (
              <button
                onClick={toggleLikePlaylist}
                title="Like Playlist"
                className="lg:hidden mb-[1.4rem] border-[1px] border-[#8f8f8f6e] h-[3rem] w-[3rem] flex justify-center items-center rounded-full "
              >
                {likedPlaylists.some((p) => p.id === playlistData.id) ? (
                  <FaHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="icon text-2xl" />
                )}
              </button>
            ) : (
              <button
                  onClick={() => deleteAtIndex(idx)}
                  title="Like Playlist"
                  className="lg:hidden mb-[1.4rem] border-[1px] border-[#8f8f8f6e] h-[3rem] w-[3rem] flex justify-center items-center rounded-full "
                >
                  <FaTrashCan />
                </button>
            )}

            <span className=" lg:hidden flex justify-center items-center h-[3rem] w-[3rem] border-[1px] border-[#8f8f8f6e] rounded-full cursor-pointer ">
              <FaPlay
                className=" text-xl icon active:scale-90"
                onClick={playFirstSong}
              />
            </span>
          </div>
        </div>

        <div>
          <h2 className="lg:mt-8   mt-2 mb-2 ml-2 text-2xl font-semibold ">
            Top Songs
          </h2>
          <div className="flex flex-col">
            {playlistData.songs && playlistData.songs.length > 0 ? (
              playlistData.songs.map((song) => (
                <SongsList key={song.id} {...song} song={list} />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                Playlist is Empty......
              </p>
            )}
          </div>
        </div>
      </div>

      <Player />
      <Navigator />
      <Footer />
    </>
  );
};

export default PlaylistDetails;
