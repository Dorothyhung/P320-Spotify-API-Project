import './App.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RadarDisplay from './DataDisplay';
import Modal from './Modal';

// Get Audio Features component
function AudioFeatures(props) {
  const trackID = props.trackID;
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [track, setCurrentTrack] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [filters, setFilters] = useState({
    minAcousticness: 0,
    maxAcousticness: 1,
    minDanceability: 0,
    maxDanceability: 1,
    minEnergy: 0,
    maxEnergy: 1,
    minInstrumentalness: 0,
    maxInstrumentalness: 1,
    minLiveness: 0,
    maxLiveness: 1,
    minLoudness: -60,
    maxLoudness: 0,
    minSpeechiness: 0,
    maxSpeechiness: 1,
    minValence: 0,
    maxValence: 1,
  });

  // Modal
  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Update filter values when input changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: parseFloat(value)
    });
  };

  // Filter tracks based on audio feature values
  const filterTracks = () => {
    if (!audioFeatures) {
      return [];
    }

    return audioFeatures.filter(track => {
      const {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        loudness,
        speechiness,
        valence
      } = track;

      // Check if the track's audio features fall within the specified filter ranges
      return (
        acousticness >= filters.minAcousticness &&
        acousticness <= filters.maxAcousticness &&
        danceability >= filters.minDanceability &&
        danceability <= filters.maxDanceability &&
        energy >= filters.minEnergy &&
        energy <= filters.maxEnergy &&
        instrumentalness >= filters.minInstrumentalness &&
        instrumentalness <= filters.maxInstrumentalness &&
        liveness >= filters.minLiveness &&
        liveness <= filters.maxLiveness &&
        loudness >= filters.minLoudness &&
        loudness <= filters.maxLoudness &&
        speechiness >= filters.minSpeechiness &&
        speechiness <= filters.maxSpeechiness &&
        valence >= filters.minValence &&
        valence <= filters.maxValence
      );
    });
  };

  // Apply filters to the current list of tracks
  const filteredTracks = filterTracks();

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
  }, [trackID, props.token]);

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
            {/* Display filtered tracks with their audio features */}
            {filteredTracks.map((track) => (
              <li key={track.id}>
                <h3>{track.name}</h3>
                <p>Acousticness: {track.acousticness}</p>
                <p>Danceability: {track.danceability}</p>
                <p>Energy: {track.energy}</p>
                {/* Add more audio features here */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Return to Search</p>
      )}
      <Modal show={showModal} handleClose={handleCloseModal}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default AudioFeatures;

