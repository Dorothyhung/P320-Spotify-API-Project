import './App.css';
import React, { useState, useEffect } from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';


function Filters(props) {


    return (
        <div className="container text-light">
          <div className="row">
            <div className="col-md-4">
                <span className='d-flex justify-content-between align-items-center'>
                    <b>Acousticness</b>
                    <span className='p-0'>
                        <button className='black-btn'
                            onClick={() => props.handleShowModal(`A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.`)}
                        >?</button>
                    </span>
                </span>
                <MultiRangeSlider style={{ maxWidth: '200px' }}
                    onChange={(e) => {
                    props.setMinAccousticness(e.minValue / 100);
                    props.setMaxAccousticness(e.maxValue / 100);
                    }}
                />
            </div>
            <div className="col-md-4">
                <span className='d-flex justify-content-between align-items-center'>
                    <b>Danceability</b>
                    <span className='p-0'>
                        <button className='black-btn'
                            onClick={() => props.handleShowModal(`Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.`)}                    
                        >?</button>
                    </span>
                </span>
                <MultiRangeSlider style={{ maxWidth: '200px' }}
                    onChange={(e) => {
                    props.setMinDanceability(e.minValue / 100);
                    props.setMaxDanceability(e.maxValue / 100);
                    }}
                />
            </div>
            <div className="col-md-4">
                <span className='d-flex justify-content-between align-items-center'>
                    <b>Energy</b>
                    <span className='p-0'>
                        <button className='black-btn'
                            onClick={() => props.handleShowModal(`Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.`)}
                        >?</button>
                    </span>
                </span>
                <MultiRangeSlider style={{ maxWidth: '200px' }}
                    onChange={(e) => {
                    props.setMinEnergy(e.minValue / 100);
                    props.setMaxEnergy(e.maxValue / 100);
                    }}
                />
            </div>
            <div className="col-md-4">
                <span className='d-flex justify-content-between align-items-center'>
                    <b>Liveness</b>
                    <span className='p-0'>
                        <button className='black-btn'
                            onClick={() => props.handleShowModal(`Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.`)}
                        >?</button>
                    </span>
                </span>
                <MultiRangeSlider style={{ maxWidth: '200px' }}
                    onChange={(e) => {
                    props.setMinLiveness(e.minValue / 100);
                    props.setMaxLiveness(e.maxValue / 100);
                    }}
                />
            </div>
            <div className="col-md-4">
                <span className='d-flex justify-content-between align-items-center'>
                    <b>Speechiness</b>
                    <span className='p-0'>
                        <button className='black-btn'
                            onClick={() => props.handleShowModal('Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.')}
                        >?</button>
                    </span>
                </span>
                <MultiRangeSlider style={{ maxWidth: '200px' }}
                    onChange={(e) => {
                    props.setMinSpeechiness(e.minValue / 100);
                    props.setMaxSpeechiness(e.maxValue / 100);
                    }}
                />
            </div>
            <div className="col-md-4">
                <span className='d-flex justify-content-between align-items-center'>
                    <b>Valence</b>
                    <span className='p-0'>
                        <button className='black-btn'
                            onClick={() => props.handleShowModal(`A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).`)}
                        >?</button>
                    </span>
                </span>
                <MultiRangeSlider style={{ maxWidth: '200px' }}
                    onChange={(e) => {
                    props.setMinValence(e.minValue / 100);
                    props.setMaxValence(e.maxValue / 100);
                    }}
                />
            </div>
          </div>
        </div>
    );
}


// Get Filter Features component
function FilterTracks(props) {
    const trackID = props.trackID;
    const [currentTrack, setCurrentTrack] = React.useState("");
    const [seedArtist, setSeedArtist] = React.useState("");
    const [seedGenre, setSeedGenre] = React.useState("Pop");
    const [seedTrack, setSeedTrack] = React.useState("");
    const [inputGenre, setInputGenre] = React.useState("");
    const [tracks, setTracks] = React.useState([]);

    // Set audio feature filters
    const [minAccousticness, setMinAccousticness] = useState(0.25);
    const [maxAccousticness, setMaxAccousticness] = useState(0.75);
    const [minDanceability, setMinDanceability] = useState(0.25);
    const [maxDanceability, setMaxDanceability] = useState(0.75);
    const [minEnergy, setMinEnergy] = useState(0.25);
    const [maxEnergy, setMaxEnergy] = useState(0.75);
    const [minLiveness, setMinLiveness] = useState(0.25);
    const [maxLiveness, setMaxLiveness] = useState(0.75);
    const [minSpeechiness, setMinSpeechiness] = useState(0.25);
    const [maxSpeechiness, setMaxSpeechiness] = useState(0.75);
    const [minValence, setMinValence] = useState(0.25);
    const [maxValence, setMaxValence] = useState(0.75);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const handleShowModal = (content) => {
      setModalContent(content);
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };

    // Navigate to audio features page on button click
    const navigate = useNavigate();
    const handleClickAudioFeatures = (newtrackID) => {
        navigate(`/audiofeatures`);
        props.setSelectedTrackID(newtrackID);
    }

    useEffect(() => {
        // GET track by track id and setSeedArtist and setSeedTrack
        const getTrack = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${props.token}`
            }
            });
            const track = await response.json();
            console.log(track)
            setCurrentTrack(track.name);
            setSeedArtist(track.artists[0].id);
            setSeedTrack(track.id);
        } catch (error) {
            console.error('Error fetching audio features:', error);
        }
        };

        // GET recommendations by track and audio feature filters
        const getRecommendations = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/recommendations?` +
            `seed_artists=${seedArtist}&` +
            `seed_genres=${seedGenre}&` +
            `seed_tracks=${seedTrack}&` +
            `min_acousticness=${minAccousticness}&` +
            `max_accousticness=${maxAccousticness}&` +
            `min_danceability=${minDanceability}&` +
            `max_danceability=${maxDanceability}&` +
            `min_energy=${minEnergy}&` +
            `max_energy=${maxEnergy}&` +
            `min_liveness=${minLiveness}&` +
            `max_liveness=${maxLiveness}&` +
            `min_speechiness=${minSpeechiness}&` +
            `max_speechiness=${maxSpeechiness}&` +
            `min_valence=${minValence}&` +
            `max_valence=${maxValence}`
            , {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${props.token}`
            }
            });
            const data = await response.json();
            console.log(data)
            setTracks(data.tracks);
        } catch (error) {
            console.error('Error fetching audio features:', error);
        }
        };
        getTrack();
        getRecommendations();
    }, [trackID, seedArtist, seedGenre, seedTrack, 
        minAccousticness, maxAccousticness, 
        minDanceability, maxDanceability,
        minEnergy, maxEnergy,
        minLiveness, maxLiveness,
        minSpeechiness, maxSpeechiness,
        minValence, maxValence]);
    
    const handleInputChange = (e) => {
        setInputGenre(e.target.value);
    };
    const handleSubmit = () => {
        setSeedGenre(inputGenre)
    }


  // Return list of tracks that match seed genre, seed tracks, seed artist, and filters
  return (
    <div className="d-flex flex-column justify-content-center align-items-center pt-5 pb-5 text-light"
            style={{background: 'linear-gradient(to bottom, black, gray)', minHeight: '100vh'}}>
        <a href='/search'><button className="btn green-btn btn-lg">Return to Search</button></a><br />
        <div><h1 className='green'>Filter By Audio Feature</h1></div><br />
        <div><h5>Recommendations based on the seed track, genre, and audio features filters</h5></div><br />
        <h5>Track:  {currentTrack}</h5>
        <h5>Set Genre <input value={inputGenre} onChange={handleInputChange}/></h5><br />
        <h5>Set Audio Features</h5>
        <Filters 
            setMinAccousticness={setMinAccousticness}
            setMaxAccousticness={setMaxAccousticness}
            setMinDanceability={setMinDanceability}
            setMaxDanceability={setMaxDanceability}
            setMinEnergy={setMinEnergy}
            setMaxEnergy={setMaxEnergy}
            setMinLiveness={setMinLiveness}
            setMaxLiveness={setMaxLiveness}
            setMinSpeechiness={setMinSpeechiness}
            setMaxSpeechiness={setMaxSpeechiness}
            setMinValence={setMinValence}
            setMaxValence={setMaxValence}
            setShowModal={setShowModal}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
            setModalContent={setModalContent}
        /><br />
        <button className='btn green-btn' onClick={handleSubmit}>Find Tracks</button>


        <div className="container d-flex flex-column align-items-center justify-content-center text-light">
            {tracks ? (
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
                    {tracks.map(track => (
                    <tr key={track.id}>
                        <td><img src={track.album.images[0].url} width="60" height="60" alt="Album cover" /></td>
                        <td>{track.name}</td>
                        <td>{(track.artists.map((artist) => artist.name)).join(", ")}</td>
                        <td>{track.album.name}</td>
                        <td><button className="btn green-btn btn-md" 
                        onClick={() => {
                            handleClickAudioFeatures(track.id);

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
                        }}>View Audio Features</button></td>
                        <td><a href={track.external_urls.spotify} target="_blank" className='btn black-btn'>Listen on Spotify</a></td>
                    </tr>
                    ))}
            </tbody>
            </table><br />
            <p className='text-light'>Note: Recommendations are generated based on the available information for a given seed entity and 
            matched against similar artists and tracks. If there is sufficient information about the provided seeds, 
            a list of tracks will be returned together with pool size details. For artists and tracks that are very 
            new or obscure there might not be enough data to generate a list of tracks..</p>
        </div>
        ) : 
        <p className='green'>Note: Recommendations are generated based on the available information for a given seed entity and 
            matched against similar artists and tracks. If there is sufficient information about the provided seeds, 
            a list of tracks will be returned together with pool size details. For artists and tracks that are very 
            new or obscure there might not be enough data to generate a list of tracks..</p>}
        </div>
        
    
      <Modal show={showModal} handleClose={handleCloseModal}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default FilterTracks;