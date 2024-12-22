import { useEffect, useState } from 'react';
import { fetchNewReleases } from '../api/spotify';
import Slider from './Slider';

const MainSection = () => {

    const [releases, setReleases] = useState([]);  // State for New Releases
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);     // Error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch New Releases
                const relData = await fetchNewReleases();
                setReleases(relData.albums.items);


            } catch (err) {
                setError(err.message); // Handle fetch error
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="my-24">
            <h2 className="m-4 text-2xl w-full lg:w-[33vw] font-semibold text-zinc-200 text-center">
                New Releases
            </h2>
                <Slider releases={releases} />

        </div>
    );
};

export default MainSection;
