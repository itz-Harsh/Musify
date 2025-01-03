
const api_url = 'https://saavn.dev/api/';
if (!api_url) {
    console.log("Error Fetching API");
};

export const getSongbyQuery = async (e) => {
    try{
        const song = await fetch(`${api_url}search/songs?query=${e}&limit=30`);
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
    try{
        const Artists = await fetch(`${api_url}artists?id=${ID}`);
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

export const searchPlayListByQuery = async (query) => { 
    try{
        const playlists = await fetch(`${api_url}search/playlists?query=${query}`);
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




