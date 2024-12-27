import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To fetch artist ID from URL
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import { fetchArtistByID } from '../../fetch'; // Assuming the fetch function exists
import SongsList from '../components/SongsList';
import ArtistSlider from '../components/Sliders/ArtistSlider';

const ArtistsDetails = () => {
    const { id } = useParams(); // Extract the artist ID from the URL
    const [details, setDetails] = useState({}); // Initialize as an empty object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await fetchArtistByID(id); // Fetch artist details based on the ID
                setDetails(data);
                console.log(data.data); // Log data for debugging
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

    const artistData = details.data || {}; // Fallback to an empty object if `data` is undefined
    const artistImage = artistData.image?.[2]?.url || ""; // Safely access image URL

    return (
        <>
            <Navbar />
  <div>
            <div className="mt-[6rem] ml-[2rem] flex gap-[2rem] text-zinc-300 overflow-clip p-7 ">
                {artistImage && (
                    <img src={artistImage} alt={artistData.name} className="artistDetails" />
                )}
            
                <div className="flex flex-col h-[400px] ml-4 mt-[-1rem] gap-4 h-[30rem]">
                    <h1 className="text-3xl font-bold text-white">{artistData.name}</h1>
                    
                <h2 className="text-xl font-semibold block">Top Songs</h2>
                <div className="h-[14.5rem] w-[30rem]  overflow-y-scroll scroll-hide ">

                    {artistData.topSongs.map((album) => (
                        <SongsList key={album.id} {...album} />
                    ))}
                    </div>
               </div>
               
            </div>
                    
                    
      
                    <h2  className="text-xl font-semibold ml-[10rem] pb-6 " >Similar Artists</h2>
                    <div>
                        <ArtistSlider artists={artistData.similarArtists} />
                    </div>


        </div>
                    



            <Player />
        </>
    );
};

export default ArtistsDetails;
