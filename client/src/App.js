import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client_id, client_secret } from './client_creds.js';

// TrackFilters Component
function TrackFilters({ applyFilters }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filters = {
      danceability: parseFloat(formData.get('danceability')),
      energy: parseFloat(formData.get('energy')),
      valence: parseFloat(formData.get('valence')),
      tempo: parseFloat(formData.get('tempo'))
    };
    applyFilters(filters);
  };

  return (
    <div className="filters">
      <form onSubmit={handleSubmit}>
        <label>
          Danceability:
          <input type="number" name="danceability" />
        </label>
        <label>
          Energy:
          <input type="number" name="energy" />
        </label>
        <label>
          Valence:
          <input type="number" name="valence" />
        </label>
        <label>
          Tempo:
          <input type="number" name="tempo" />
        </label>
        <button type="submit" className="btn btn-primary">
          Apply Filters
        </button>
      </form>
    </div>
  );
}

// SearchTracks Component
function SearchTracks(props) {
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
  };

  // Return table of search results filtered for tracks
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      {props.tracks ? (
        <div>
          <h3>Results</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Artist</th>
                <th>Album</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.tracks.map(track => (
                <tr key={track.id}>
                  <td><img src={track.album.images[0].url} width="60" height="60" alt="Album cover" /></td>
                  <td>{track.name}</td>
                  <td>{(track.artists.map((artist) => artist.name)).join(", ")}</td>
                  <td>{track.album.name}</td>
                  <td><button className="btn btn-secondary text-white w-100" onClick={() => handleButtonClick(track.id)}>View audio features</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

// Main App Component
function App(props) {
  const [tracks, setTracks] = useState(null); // List of tracks from search
  const [searchQuery, setSearchQuery] = useState(""); // Search query from user

  // Apply filters to the track list
  const applyFilters = (filters) => {
    if (!tracks) {
      return;
    }

    const filteredTracks = tracks.filter(track => {
      if (
        (!filters.danceability || track.audio_features.danceability >= filters.danceability) &&
        (!filters.energy || track.audio_features.energy >= filters.energy) &&
        (!filters.valence || track.audio_features.valence >= filters.valence) &&
        (!filters.tempo || track.audio_features.tempo >= filters.tempo)
      ) {
        return true;
      }
      return false;
    });

    setTracks(filteredTracks);
  };

  // Handle search query change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1>Spotify App</h1><br />
      <h3>Search for a Track:</h3>
      <form>
        <input type="search" value={searchQuery} onChange={handleChange} />
      </form><br/>
      <TrackFilters applyFilters={applyFilters} />
      <SearchTracks tracks={tracks} setTracks={setTracks} token={props.token} query={searchQuery} setSelectedTrackID={props.setSelectedTrackID}/>
    </div>
  );
}

export default App;
