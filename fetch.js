
const api_url = 'https://saavn.dev/api/';
if (!api_url) {
    console.log("Error Fetching API");
};

export const getSongbyQuery = async (e) => {
    try {
        return await fetch(`${api_url}search/songs?query=` + e);
    }
    catch (e) {
        console.log(e);
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
        const Albums = await fetch(`${api_url}search/albums?query=${query}&limit=20`);
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



