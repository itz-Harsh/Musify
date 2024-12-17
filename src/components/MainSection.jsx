import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumItems from "./AlbumItems";

const MainSection = () => {
    const [albums, setAlbums] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);  // Optional: to show loading spinner
    const [error, setError] = useState(null);  // Optional: to show error message

    // Fetch data from the API
    const getHomePageData = async () => {
        try {
            // Make API request to fetch albums and trending data
            const res = await axios.get("https://saavn.dev/api/albums"); // Replace with your actual API endpoint
            const data = res.data;

            // Check if the expected fields are available in the response
            if (data?.albums) {
                setAlbums(data.albums);
            }
            if (data?.trending) {
                setTrending(data.trending);
            }

            setLoading(false);  // Data loaded, set loading to false
        } catch (err) {
            console.error("Error fetching data", err);
            setError("Something went wrong. Please try again later.");
            setLoading(false);  // Stop loading even if there's an error
        }
    };

    useEffect(() => {
        getHomePageData();
    }, []);  // Run once when the component mounts

    if (loading) {
        return <div>Loading...</div>;  // Optional: show a loading indicator
    }

    if (error) {
        return <div>{error}</div>;  // Optional: show error message
    }

    return (
        <div>
            <h2>Albums</h2>
            <div className="flex flex-wrap gap-4">
                {albums?.map((album) => (
                    <AlbumItems
                        key={album.id}
                        name={album.name}
                        artists={album.artists}
                        id={album.id}
                        image={album.image}
                    />
                ))}
            </div>

            <h2>Trending</h2>
            <div className="flex flex-wrap gap-4">
                {/* Display trending items if available */}
                {trending?.map((item) => (
                    <div key={item.id} className="p-4 border rounded-md">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainSection;
