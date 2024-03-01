import './App.css';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import RadarDisplay from './DataDisplay';

// Get Audio Features component
function AudioFeatures(props) {
    const trackID = props.trackID;
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
          {audioFeatures && track ? (
            <div className="container d-flex flex-column align-items-center justify-content-center">
              <h2>{track.name}</h2>
              <img src={track.album.images[0].url} width="200" height="200" alt="Album cover" />
              <RadarDisplay
                ac={audioFeatures.acousticness}
                da={audioFeatures.danceability}
                en={audioFeatures.energy}
                li={audioFeatures.liveness}
                sp={audioFeatures.speechiness}
                va={audioFeatures.valence}
                />
              <h4>{(track.artists.map((artist) => artist.name)).join(", ")}</h4>
              <h4>{track.album.name}</h4>
              <ul>
                <li>Acousticness: {audioFeatures.acousticness}</li>
                <p>A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.</p>
                <li>Danceability: {audioFeatures.danceability}</li>
                <p>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.</p>
                <li>Energy: {audioFeatures.energy}</li>
                <p>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</p>
                <li>Instrumentalness: {audioFeatures.instrumentalness}</li>
                <p>Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.</p>
                <li>Liveness: {audioFeatures.liveness}</li>
                <p>Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.</p>
                <li>Loudness: {audioFeatures.loudness}</li>
                <p>The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.</p>
                <li>Speechiness: {audioFeatures.speechiness}</li>
                <p>Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.</p>
                <li>Valence: {audioFeatures.valence}</li>
                <p>A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</p>
              </ul>
            </div>
          ) : (
            <p>Return to Search</p>
          )}
        </div>
      );
    };
    
    export default AudioFeatures;