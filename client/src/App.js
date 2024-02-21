import './App.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { client_id, client_secret } from './client_creds.js'

// Search Tracks component - Search and Results
function GetTracks(props) {
  useEffect(() => {
    if (props.query !== '') {
      // GET tracks by search query
      const fetchTracks = async () => {
        try {
          const response = await fetch(`https://api.spotify.com/v1/search?q=${props.query}&type=track&limit=50`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${props.token}`
            }
          });
          const data = await response.json();
          props.setTracks(data.tracks.items);
        } catch (error) {
          console.error('Error fetching tracks:', error);
        }
      };
      fetchTracks();
    }
  }, [props.query, props.token]);

  // Navigate to audio features page on button click
  const navigate = useNavigate();
  const handleButtonClick = (trackID) => {
    navigate(`audiofeatures`);
    props.setSelectedTrackID(trackID);
  }

  // Return table of search results filtered for tracks
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      {props.tracks ? (
      <div>
        <h3>Results</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Album</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.tracks.map(track => (
              <tr key={track.id}>
                <td>{track.name}</td>
                <td>{track.artists[0].name}</td>
                <td>{track.album.name}</td>
                <td><button className="btn btn-secondary text-white w-100" onClick={() => handleButtonClick(track.id)}>View audio features</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : null}
    </div>
  )
}

// Main App Component
function App(props) {
  const [tracks, setTracks] = useState(null); // List of tracks from search
  const [searchQuery, setSearchQuery] = useState(""); // Search query from user

  useEffect(() => {
    const getToken = async () => {
      try {
        const credentials = `${client_id}:${client_secret}`;
        const base64Credentials = btoa(credentials);

        // POST request for token from client_id and client_secret
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        props.setToken(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };
    getToken();
  }, []);

  // Search results respond in real time to search query
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="App">
      <h1>Spotify App</h1><br />
      <h3>Search for a Track:</h3>
      <form>
        <input type="search" value={searchQuery} onChange={handleChange} />
      </form><br/>
      <GetTracks tracks={tracks} setTracks={setTracks} token={props.token} query={searchQuery} setSelectedTrackID={props.setSelectedTrackID}/>
    </div>
  );
}

export default App;