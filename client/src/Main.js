import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import App from './App.js';
import AudioFeatures from './AudioFeatures.js'
import HomePage from './HomePage.js'
import RecentSearch from './RecentSearch.js';
import FilterTracks from './FilterTracks.js'

const Main = () => {
    const [token, setToken] = useState(null);
    const [selectedTrackID, setSelectedTrackID] = useState(null);
    return (
        <div>
            {/* Routes */}
            <Routes>
                {/* Homepage */}
                <Route path='/' element={<HomePage />}/>
                {/* Main Search Page */}
                <Route path='/search' element={<App 
                    token={token} 
                    setToken={setToken} 
                    setSelectedTrackID={setSelectedTrackID} />} />
                {/* Audio Features Page */}
                <Route path='/audiofeatures' element={<AudioFeatures 
                    token={token} 
                    trackID={selectedTrackID}/>} />
                {/* History Page */}
                <Route path='/recent' element={<RecentSearch 
                    token={token} 
                    setSelectedTrackID={setSelectedTrackID}/>} />
                {/* View Similar Tracks / Filters Page */}
                <Route path='/filter' element={<FilterTracks 
                    token={token} 
                    trackID={selectedTrackID}
                    setSelectedTrackID={setSelectedTrackID}/>} />
            </Routes>
        </div>
    );
}

export default Main;