import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const fetchNewReleases = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/new-releases`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data from the backend:", error);
        throw error;
    }
};

export const fetchAlbumDetails = async (albumId) => {
    const response = await axios.get(`${API_BASE_URL}/albums/${albumId}`);
    return response.data;
  };
