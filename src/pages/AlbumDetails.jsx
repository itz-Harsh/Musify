import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // to fetch album ID from URL
import { fetchAlbumDetails } from '../api/spotify';  // Import the function

const AlbumDetail = () => {
  const { id } = useParams();  // Extract the album ID from the URL
  const [albumDetails, setAlbumDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchAlbumDetails(id);  // Fetch album details based on the album ID
        setAlbumDetails(data);
        console.log(data);
      } catch ( err ) {
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
    <div>
      <img src={albumDetails.images[0]?.url} alt={albumDetails.name} />
      <h2>{albumDetails.name}</h2>
      <p>Artists: {albumDetails.artists.map(artist => artist.name).join(', ')}</p>
      
      <div>
        <h3>Tracks:</h3>
        <ul>
          {albumDetails.tracks.items.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumDetail;
