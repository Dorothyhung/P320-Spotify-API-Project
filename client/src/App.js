import './App.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { client_id, client_secret } from './client_creds.js'
import MobileTrackCard from './MobileTrackCard';


// Search Tracks component - Search and Results
function SearchTracks(props) {
  const [showMobileCard, setShowMobileCard] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState();

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

  // MobileTrackCard - show and close
  const handleShowMobileCard = (track) => {
    setSelectedTrack(track);
    setShowMobileCard(true);
  };
  const handleCloseMobileCard = () => {
    setShowMobileCard(false);
  };

  // Navigate to audio features page on button click
  const navigate = useNavigate();
  const handleButtonClick = (trackID) => {
    navigate(`/audiofeatures`);
    props.setSelectedTrackID(trackID);
  }

  // Navigate to history page
  const handleHistoryButtonClick = () => {
    navigate(`/recent`);
  }

  // Navigate to filters page
  const handleFilterButtonClick = (trackID) => {
    navigate('/filter');
    props.setSelectedTrackID(trackID);
  }

  // Add to history queue using localHsitory on button click
  const handleAddToHistory = (searchQuery) => {
    // Load queue
    let historyQueue = JSON.parse(localStorage.getItem("historyQueue")) || [];
    const historyCount = historyQueue.length;
    // Limit history to 20 tracks at a time - remove oldest search if historyCount>20
    if (historyCount >= 20) {
        historyQueue.shift(); // Remove oldest track
    }
    // Add the newest track to end of queue
    historyQueue.push(searchQuery);
    // Update queue
    localStorage.setItem("historyQueue", JSON.stringify(historyQueue));
  }

  // Return table of search results filtered for tracks
  return (
    <div>
    {/* Displays on mobile */}
    <div className="d-block d-md-none p-5">
    {props.tracks ? (
      <div>
        <h3>Results</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Artist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.tracks.map(track => (
              <tr key={track.id}>
                <td><img src={track.album.images[0].url} className="p-2" width="60" height="60" alt="Album cover" /></td>
                <td>{track.name}</td>
                <td>{(track.artists.map((artist) => artist.name)).join(", ")}</td>
                <td>
                  <button className='black-btn'
                      onClick={() => handleShowMobileCard(track)}                    
                  >Show</button>
                  <MobileTrackCard show={showMobileCard} 
                    handleClose={handleCloseMobileCard} 
                    track={selectedTrack}
                    handleButtonClick={handleButtonClick}
                    handleAddToHistory={handleAddToHistory}
                    handleFilterButtonClick={handleFilterButtonClick}/>
                </td>
                
               </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : null}
    </div>
    {/* Displays on desktop */}
    <div className="d-none d-md-block container d-flex flex-column align-items-center justify-content-center">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.tracks.map(track => (
              <tr key={track.id}>
                <td><img src={track.album.images[0].url} className="p-2" width="60" height="60" alt="Album cover" /></td>
                <td>{track.name}</td>
                <td>{(track.artists.map((artist) => artist.name)).join(", ")}</td>
                <td>{track.album.name}</td>
                <td><button className="btn green-btn btn-md" 
                  onClick={() => {
                      handleButtonClick(track.id);
                      handleAddToHistory(track.id);
                  }}>View Audio Features</button></td>
                  <td><button className="btn green-btn" 
                    onClick={() => { handleFilterButtonClick(track.id);  }}
                  >Find Similar Tracks</button></td>
                  <td><a href={track.external_urls.spotify} target="_blank" className='btn black-btn'>Listen on Spotify</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : null}
    </div>
    </div>
  )
}

// Main App Component
function App(props) {
  const [tracks, setTracks] = useState(null); // List of tracks from search
  const [searchQuery, setSearchQuery] = useState(""); // Search query from user

  // Get access token to be used in other API calls
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
        {/* Search for a track, artist, album */}
        <h3 className='green' >Search for a Track, Artist, or Album:</h3>
        <form>
          <input type="search" value={searchQuery} onChange={handleChange} />
        </form><br/>
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