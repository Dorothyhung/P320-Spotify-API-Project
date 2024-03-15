import './App.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
    // Navigate to audio features page on button click
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate(`search`);
    }
    return (
        <div 
          className='d-flex flex-column align-items-center justify-content-center text-white p-5'
          style={{background: 'linear-gradient(to bottom, black, gray)', minHeight: '100vh'}}>
          <div className='container'>
            <h1 className="d-flex justify-content-center">
                Welcome to&nbsp;
                <span className='green'> SpotifyAnalysis</span>
            </h1><br /><br />
            <div className="d-flex flex-column align-items-center justify-content-center">
                <h5>Ready to explore your favorite track's audio features?</h5>
                <button onClick={handleButtonClick} 
                className="btn black-btn btn-lg" >Search for a Track</button>
            </div><br /><br />
          </div>
          
          <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-10'>
                    <h5 className='green'>About SpotifyAnalysis</h5>
                    <p>
                        Discover the secrets behind your favorite tracks with SpotifyAnalysis. 
                        Our app allows you to explore the fascinating world of music by providing 
                        insights into the audio features of any Spotify track.
                    </p>
                    <h5 className='green'>About Spotify Audio Features</h5>
                    <p>
                        Spotify provides a range of audio features that describe various aspects of a 
                        track's musical content. These features include acousticness (how acoustic a track is), 
                        danceability (how suitable a track is for dancing), energy (how energetic a track feels), 
                        and many more. Understanding these features can deepen your appreciation for music and 
                        help you discover new favorites. 
                    </p>
                    <p>
                        Explore Spotify's audio features 
                        <a href="https://developer.spotify.com/documentation/web-api/reference/get-audio-features"
                            className="text-decoration-none green" 
                            target="_blank"> here.</a>
                    </p>
                    <h5 className='green'>Where the Data Comes From</h5>
                    <p>
                        SpotifyAnalysis connects directly to the Spotify Web API, pulling data from Spotify's 
                        expansive music database. This ensures that you have access to the most accurate and 
                        up-to-date information about your favorite tracks. 
                    </p>
                    <p>
                        Explore the Spotify API
                        <a href="https://developer.spotify.com/documentation/web-api"
                            className="text-decoration-none green" 
                            target="_blank"> here.</a>
                    </p>
                </div>
            </div>
          </div>
          
          
        </div>
      )
}

export default HomePage;