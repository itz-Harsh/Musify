import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // To fetch album ID from URL
import Navbar from '../components/Navbar';
import SongsList from '../components/SongsList';
import Player from '../components/Player';
import { getSongbyId } from '../../fetch'; 
import { useContext } from 'react';
import MusicContext from '../context/MusicContext';
 
  const SongDetails = () => {
  const { id } = useParams();  // Extract the album ID from the URL
  const [details, setDetails] = useState(null);  // Set initial state to null to avoid errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSongs } = useContext(MusicContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getSongbyId(id);  // Fetch album details based on the album ID
        setDetails(data);
        setSongs(data);
        // console.log("Song Details" , data);
        
      } catch (err) {
        setError('Error fetching Song details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [id]); // Fetch details when the id changes (when navigating to a different album)

  if (loading) return <div className='flex h-screen w-screen justify-center items-center '> <img src="/public/Loading.gif" alt="" /> </div>;
  if (error) return <div className='flex h-screen w-screen justify-center items-center'>{error}</div>;

  return (
    <>
      <Navbar />
      
      <div className='albumDetails gap-5 text-zinc-300'>
        {details && details.data.image && details.data.image[2]?.url && (
          <img src={details.data.image[2].url} alt={details.name} className='DetailImg' />
        )}
        
         <div className='flex flex-col h-[400px] gap-4 '>
          <h1 className='text-2xl font-bold text-white'>{details.data.name}</h1>
          <pre className='font-sans font-semibold'>
            by  {details.data.artists.primary[0].name}    {details.data.songCount} Songs
          </pre>
        
          <div className='overflow-y-scroll scroll-hide w-[32rem]' >
           
           
          </div>
        </div>
      </div>

      <Player />
    </>
  );
};

export default SongDetails;
