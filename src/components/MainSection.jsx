import { useEffect, useState } from 'react';
import { searchAlbumByQuery, searchArtistByQuery } from '../../fetch'; // Assuming the function is imported correctly
import Slider from './Slider';

const MainSection = () => {
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]); // Corrected variable name from 'artist' to 'artists'
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);     // Error state

    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                // Fetch New Releases using 'latest' query from JioSaavn API
                const data = await searchAlbumByQuery('latest');
                setAlbums(data.data.results); // Assuming the response has 'data.results' with album data
            } catch (err) {
                setError(err.message); // Handle fetch error
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        const fetchArtistData = async () => {
            try {
                // Fetch New Releases using 'top-artists' query from JioSaavn API
                const data = await searchArtistByQuery('top-artists');
                console.log("Artist Data : ", data.data);
                setArtists(data.data.results); // Corrected to set artists
            } catch (err) {
                setError(err.message); // Handle fetch error
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchAlbumData();
        fetchArtistData();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="my-24 ">
            <div>
                <h2 className="m-4 text-2xl m-8 w-full lg:w-[33vw] font-semibold text-zinc-200 text-center">
                    New Releases
                </h2>
                <Slider albums={albums} /> {/* Pass albums prop correctly */}
            </div>

            <div>
                <h2 className="m-4 text-2xl  w-full lg:w-[33vw] font-semibold text-zinc-200 text-center">
                    Top Artists
                </h2>
                <Slider albums={artists} />
            </div>

        </div>
    );
};

export default MainSection;
