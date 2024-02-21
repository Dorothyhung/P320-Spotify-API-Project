import './App.css';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

// Get Audio Features component
function AudioFeatures(props) {
    const trackID = props.trackID;
    console.log(trackID)
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [track, setCurrentTrack] = useState(null);
    
    useEffect(() => {
        // GET track by track id
        const getTrack = async () => {
            try {
              const response = await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${props.token}`
                }
              });
              const data = await response.json();
              console.log(data)
              setCurrentTrack(data);
            } catch (error) {
              console.error('Error fetching audio features:', error);
            }
          };

        // GET audio features by track id
        const getAudioFeatures = async () => {
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
        getTrack();
        getAudioFeatures();
      }, [trackID]);
      
      // Return list of audio features
      return (
        <div className="container d-flex flex-column align-items-center justify-content-center"> <br />
          <a href='/'><button className="btn btn-secondary text-white w-5">Return to Search</button></a>
          <h1>Audio Features</h1>
          {audioFeatures ? (
            <div>
              <h2>Track: {track.name}</h2>
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