import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

def get_access_token():
    url = "https://accounts.spotify.com/api/token"
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials",
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET,
    }
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        raise Exception(f"Failed to get access token: {response.json()}")

def fetch_data(access_token, endpoint, limit=50):
    url = f"https://api.spotify.com/v1/{endpoint}?limit={limit}"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch data: {response.json()}")
    
def fetch_album_details(access_token, album_id):
    url = f"https://api.spotify.com/v1/albums/{album_id}"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(url, headers=headers)  # Fixed the local variable shadowing issue
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch album data: {response.json()}")

if __name__ == "__main__":
    token = get_access_token()
    print("Access Token:", token)
    
    # Example: Fetch data from Spotify API
    new_releases = fetch_data(token, "browse/new-releases")


    # Fetch album details using a valid album ID
  # Replace with an actual album ID from Spotify
    album_details = fetch_album_details(token, album_id)
    print("Album Details:", album_details)
