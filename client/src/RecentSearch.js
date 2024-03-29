import './App.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function RecentSearch(props) {
    const [history, setHistory] = useState([]);
    const [trackIDs, setTrackIDs] = useState(null);
    const [historyTracks, setHistoryTracks] = useState([]);

    // Update tracksIDs for API call
    useEffect(() => {
        const trackIDsString = history.join(",");
        setTrackIDs(trackIDsString);
    }, [history]);

    // GET tracks by track ids
    useEffect(() => {
        const getTracks = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/?ids=${trackIDs}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${props.token}`
                    }
                });
                const data = await response.json();
                setHistoryTracks(data.tracks || []);
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };
        if (trackIDs && props.token) {
            getTracks();
        }
    }, [props.token, trackIDs]);

    // Update list of track ids
    const renderHistory = () => {
        const historyQueue = JSON.parse(localStorage.getItem("historyQueue")).slice().reverse() || [];
        setHistory(historyQueue);
    };

    // Clear history - clear local storage
    const handleClearHistory = () => {
        localStorage.clear();
        setHistory([]);
        setTrackIDs("");
        setHistoryTracks([]);
    };

    // Render list of ids in history as user clicks around
    useEffect(() => {
        renderHistory();
    }, []);

    // Navigate to audio features page
    const navigate = useNavigate();
    const handleButtonClick = (trackID) => {
        navigate(`/audiofeatures`);
        props.setSelectedTrackID(trackID);
    }
    // Navigate back to search page
    const handleSearchButtonClick = () => {
        navigate(`/search`);
    }

    // Return list of tracks from local storage
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-5 text-white"
            style={{background: 'linear-gradient(to bottom, black, gray)', minHeight: '100vh'}}>
            <button className="btn green-btn btn-lg" onClick={handleSearchButtonClick}>Back to Search</button><br />
            <h1 className='green'>Your Search History</h1><br />
            { historyTracks && historyTracks.length > 0 ? (
                <div>
                    <button className="btn green-btn btn-sm" onClick={handleClearHistory}>Clear History</button>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="col-1"></th>
                                    <th className='col-2'>Title</th>
                                    <th className='col-2'>Artist</th>
                                    <th className='col-2'>Album</th>
                                    <th className="col-2"></th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyTracks.map((track) => (
                                    <tr key={track.id}>
                                        <td><img src={track.album.images[0].url} width="60" height="60" alt="Album cover" /></td>
                                        <td>{track.name}</td>
                                        <td>{(track.artists.map((artist) => artist.name)).join(", ")}</td>
                                        <td>{track.album.name}</td>
                                        <td><button className="btn green-btn btn-sm w-100"  
                                            onClick={() => handleButtonClick(track.id)}>View Audio Features</button></td>
                                        <td><a href={track.external_urls.spotify} target="_blank" className='btn btn-sm black-btn'>Listen on Spotify</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>
                    <h4 className="green">No Search History Found</h4>
                </div>
            )}
        </div>
    );
    
}



export default RecentSearch;