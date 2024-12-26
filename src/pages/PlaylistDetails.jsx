import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To fetch artist ID from URL
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import { fetchplaylistsByID } from '../../fetch'; // Assuming the fetch function exists
// import SongGrid from '../components/SongGrid';
import SongsList from '../components/SongsList';

const PlaylistDetails = () => {
    const { id } = useParams(); // Extract the artist ID from the URL
    const [details, setDetails] = useState({}); // Initialize as an empty object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await fetchplaylistsByID(id); // Fetch artist details based on the ID
                setDetails(data);
                console.log(data); // Log data for debugging
            } catch (err) {
                setError('Error fetching artist details');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]); // Fetch details whenever the ID changes

    if (loading) {
        return (
            <div className="flex h-screen w-screen justify-center items-center">
                 <img src="/public/Loading.gif" alt="" /> 
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-screen justify-center items-center">
                {error}
            </div>
        );
    }

    const playlistData = details.data || {}; // Fallback to an empty object if `data` is undefined
    const playlistImage = playlistData.image?.[2]?.url || ""; // Safely access image URL

    return (
        <>
            <Navbar />

            <div className="mt-[6rem] ml-[2rem] flex gap-[2rem] text-zinc-300 overflow-clip">
                {playlistImage && (
                    <img src={playlistImage} alt={playlistData.name} className="h-[20rem] rounded-[50px]" />
                )}

                <div className="flex flex-col gap-4 h-[30rem]">
                    <h1 className="text-2xl font-bold  text-white">{playlistData.name}</h1>
                    <h2 className="text-xl font-semibold flex ">Top Songs</h2>
                </div>
                <div >
                
                <div className="h-[24.5rem] w-[33rem] ml-[-1rem] overflow-y-scroll scroll-hide m-[1rem] grid grid-flow-row-dense">
                {playlistData.songs.map((playlist) => (
                        <SongsList key={playlist.id} {...playlist} />
                    ))}
                    
                    </div>
                </div>
            </div>
    
                <>
                   
                
                </>


            <Player />
        </>
    );
};

export default PlaylistDetails