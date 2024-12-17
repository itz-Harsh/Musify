import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumItems from "./AlbumItems";

const MainSection = () => {
    const [albums, setAlbums] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);  

    const getHomePageData = async () => {
        try {
            const res = await axios.get("API_ENDPOINT_URL"); 
            const data = res.data;

            if (data?.albums) {
                setAlbums(data.albums);
            }
            if (data?.trending) {
                setTrending(data.trending);
            }

            setLoading(false);  
        } catch (err) {
            console.error("Error fetching data", err);
            setError("Something went wrong. Please try again later.");
            setLoading(false); 
        }
    };

    useEffect(() => {
        getHomePageData();
    }, []);  

    if (loading) {
        return <div>Loading...</div>;  
    }

    if (error) {
        return <div>{error}</div>; 
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
