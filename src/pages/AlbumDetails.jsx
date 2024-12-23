import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // to fetch album ID from URL
import { fetchAlbumDetails } from '../api/spotify';  // Import the function
import Navbar from '../components/Navbar';
import SongsList from '../components/SongsList';
import Player from '../components/Player';

const AlbumDetail = () => {
  const { id } = useParams();  // Extract the album ID from the URL
  const [albumDetails, setAlbumDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchAlbumDetails(id);  // Fetch album details based on the album ID
        setAlbumDetails(data);
        
      } catch (err) {
        setError('Error fetching album details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);  // Dependency array includes `id` to re-fetch when it changes

  if (loading) return <div>Loading album details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />

      <div className='albumDetails gap-5 text-zinc-300'>
        <img src={albumDetails.images[0]?.url} alt={albumDetails.name} className='albumImg' />
        <div className='flex flex-col h-[20rem] gap-4'>
          <h1 className='text-2xl font-bold text-white  '>{albumDetails.name}</h1>
          <pre className='font-sans font-semibold '>by {albumDetails.artists.map(artist => artist.name).join(' , ')}  .  {albumDetails.total_tracks} Songs </pre>
        
          <div>
            { albumDetails.tracks.items.map((tracks) => (
              <SongsList 
              key={tracks.id} {...tracks}/>
            ))}

          </div>
        </div>
      </div>

      <Player />
    </>
  );
};
export default AlbumDetail;
