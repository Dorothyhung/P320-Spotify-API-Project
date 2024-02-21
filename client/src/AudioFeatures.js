import './App.css';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

// Get Audio Features component
function AudioFeatures(props) {
    const trackID = props.trackID;
    const [audioFeatures, setAudioFeatures] = useState(null);

    
    useEffect(() => {
        // GET audio features for track id
        const fetchAudioFeatures = async () => {
          try {
            const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackID}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${props.token}`
              }
            });
            const data = await response.json();
            setAudioFeatures(data);
          } catch (error) {
            console.error('Error fetching audio features:', error);
          }
        };
        fetchAudioFeatures();
      }, [trackID]);
    
      return (
        <div className="container d-flex flex-column align-items-center justify-content-center"> <br />
          <a href='/'><button className="btn btn-secondary text-white w-5">Return to Search</button></a>
          <h1>Audio Features</h1>
          {audioFeatures ? (
            <div>
              <h2>Track ID: {trackID}</h2>
              <h3>Audio Features:</h3>
              <ul>
                <li>Acousticness: {audioFeatures.acousticness}</li>
                <li>Danceability: {audioFeatures.danceability}</li>
                <li>Instrumentalness: {audioFeatures.instrumentalness}</li>
                <li>Liveness: {audioFeatures.liveness}</li>
                <li>Loudness: {audioFeatures.loudness}</li>
                <li>Speechiness: {audioFeatures.speechiness}</li>
                <li>Valence: {audioFeatures.valence}</li>
              </ul>
            </div>
          ) : (
            <p>Return to Search</p>
          )}
        </div>
      );
    };
    
    export default AudioFeatures;