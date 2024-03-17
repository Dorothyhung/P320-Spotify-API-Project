import './App.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { client_id, client_secret } from './client_creds.js'
import MultiRangeSlider from "multi-range-slider-react";


// Search Tracks component - Search and Results
function SearchTracks(props) {
  useEffect(() => {
    if (props.query !== '') {
      // GET tracks by search query
      console.log(props.token)
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
    navigate(`/audiofeatures`);
    props.setSelectedTrackID(trackID);
  }

  const handleHistoryButtonClick = () => {
    navigate(`/recent`);
  }

  // Return table of search results filtered for tracks
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <button className="btn green-btn btn-lg" onClick={handleHistoryButtonClick}>Go to history</button>
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
                <td><button className="btn green-btn btn-md" 
                  onClick={() => {
                    handleButtonClick(track.id);

                    const searchQuery = track.id;
                    let historyCount = parseInt(localStorage.getItem("historyCount") || 0);
                    const newKey = "searchQuery" + (historyCount + 1);

                    // Limit history to 20 items - remove oldest search if >20
                    if (historyCount >= 20) {
                        const oldestKey = "searchQuery" + (historyCount - 19);
                        localStorage.removeItem(oldestKey);
                    }
                    
                    // Update localStorage values
                    localStorage.setItem(newKey, searchQuery);
                    localStorage.setItem("historyCount", (Math.min(historyCount + 1, 20))); // Update the historyCount in localStorage
                  }}>View audio features</button></td>
                  <td><a href={track.external_urls.spotify} target="_blank" className='btn black-btn'>Listen on Spotify</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : null}
    </div>
  )
}


function FilterTracks(props) {
  // const [rangeValues, setRangeValues] = useState([0, 100]);

  // // Function to handle changes in slider values
  // const handleSliderChange = (event) => {
  //   const { value } = event.target;
  //   const newValues = value.split(',').map(Number);
  //   setRangeValues(newValues);
  // };

  // return (
  // <div>
  //   <input
  //     type="range"
  //     min="0"
  //     max="100"
  //     value={rangeValues}
  //     onChange={handleSliderChange}
  //     step="1"
  //     className="custom-range"
  //   />
  //   <p>Min Value: {rangeValues[0]}</p>
  //   <p>Max Value: {rangeValues[1]}</p>
  // </div>
  // );

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1);
  return (
    <div>
      <div className="multi-range-slider-container">
        <b>Simple range slider with default values</b>
        <hr />
        <MultiRangeSlider
          onInput={(e) => {
            setMinValue(e.minValue / 100);
            setMaxValue(e.maxValue / 100);
          }}
        ></MultiRangeSlider>

      </div>
    </div>
  );
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
    <div className="d-flex flex-column justify-content-center align-items-center pt-5 pb-5 text-white"
            style={{background: 'linear-gradient(to bottom, black, gray)', minHeight: '100vh'}}>
      <h1 className='green' >SpotifyAnalysis</h1><br />
      <div className="d-flex flex-column justify-content-center align-items-center pt-5 pb-5 text-white">
        {/* Search for a track */}
        <h3 className='green' >Search for a Track:</h3>
        <form>
          <input type="search" value={searchQuery} onChange={handleChange} />
        </form><br/>
        {/* Filter for a track */}
        <FilterTracks /><br />
        <SearchTracks 
          tracks={tracks} 
          setTracks={setTracks}
          token={props.token}
          query={searchQuery}
          setSelectedTrackID={props.setSelectedTrackID}/>
      </div>
    </div>
  );
}

export default App;