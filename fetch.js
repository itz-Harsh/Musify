
const api_url = 'https://jsaavn-api.vercel.app/api/';
if (!api_url) {
    console.log("Error Fetching API");
};



export const getSuggestionSong = async (id) => {
    try{
        const result = await fetch(`${api_url}songs/${id}/suggestions?&limit=30`);
        const data = await result.json();
        if(!result.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    }
    catch{
        console.log('API Error: ', error );
        throw error;
    }
};



export const getSearchData = async (e) => {
    try{
        const result = await fetch(`${api_url}search?query=${e}&limit=30`);
        const data = await result.json();
        if(!result.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    }
    catch{
        console.log('API Error: ', error );
        throw error;
    }
};


export const getSongbyQuery = async (e , limit) => {
    try{
        const song = await fetch(`${api_url}search/songs?query=${e}&${limit}`);
        const data = await song.json();
        if(!song.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    }
    catch{
        console.log('API Error: ', error );
        throw error;
    }
};

export const getSongbyId = async (e) => {
    try {
        return await fetch(`${api_url}songs/` + e);
    } catch {
        console.log(e);
    }
};

export const searchAlbumByQuery = async (query) => {
    try {
        const Albums = await fetch(`${api_url}search/albums?query=${query}&limit=30`);
        const data = await Albums.json();
        if (!Albums.ok) {
            throw new Error(data.message || 'Failed to fetch Album data');
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const searchArtistByQuery = async (query) => {
    try{
        const Artists = await fetch(`${api_url}search/artists?query=${query}&limit=15`);
        const data = await Artists.json();
        if(!Artists.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    }
    catch{
        console.log('API Error: ', error );
        throw error;
        
    }
};

export const fetchAlbumByID = async (ID) => { 
    try{
        const Album = await fetch(`${api_url}albums?id=${ID}&limit=30`);
        const data = await Album.json();
        if(!Album.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    }
    catch{
        console.log('API Error: ', error );
        throw error;
    }
};

export const fetchArtistByID = async (ID) => { 
    try {
        const response = await fetch(`${api_url}artists?id=${ID}`);
        const text = await response.text();  // Read raw text first
        console.log("Raw API Response:", text); // Debugging

        // Ensure it's JSON before parsing
        const data = JSON.parse(text);
        if (!response.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};


export const searchPlayListByQuery = async (query) => { 
    try{
        const playlists = await fetch(`${api_url}search/playlists?query=${query}&limit=20`);
        const data = await playlists.json();
        if(!playlists.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    }
    catch{
        console.log('API Error: ', error );
        throw error;
    }
};

export const fetchplaylistsByID = async (ID) => { 
    try{
        const playlists = await fetch(`${api_url}playlists?id=${ID}&limit=40`);
        const data = await playlists.json();
        if(!playlists.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    }
    catch{
        console.log('API Error: ', error );
        throw error;
    }
};

export const fetchSongSuggestionsByID = async (ID) => { 
    try{
        const playlists = await fetch(`${api_url}?id=${ID}&limit=30`);
        const data = await playlists.json();
        if(!playlists.ok) {
            throw new Error(data.message || 'Failed to Fetch Artist Data');
        }
        return data;
    }
    catch{
        console.log('API Error: ', error );
        throw error;
    }
};




