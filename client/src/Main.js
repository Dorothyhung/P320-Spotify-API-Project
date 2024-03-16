import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import App from './App.js';
import AudioFeatures from './AudioFeatures.js'
import HomePage from './HomePage.js'
import RecentSearch from './RecentSearch.js';

const Navigation = () => {
    return (
    <nav className="container d-flex flex-column align-items-center justify-content-center pt-5"
                    style={{background: 'linear-gradient(to bottom, black, gray)', minHeight: '100vh'}}>

        <div className="row w-50">
            <div className="col-6 mb-3">
                <NavLink to='/'>
                    <button className="btn btn-secondary text-white w-100">Home</button>
                </NavLink>
            </div>
            <div className="col-6 mb-3">
                <NavLink to='/search'>
                    <button className="btn btn-secondary text-white w-100">Search</button>
                </NavLink>
            </div>
            <div className="col-6 mb-3">
                <NavLink to='/search/audiofeatures'>
                    <button className="btn btn-secondary text-white w-100">Audio Features</button>
                </NavLink>
            </div>
            <div className="col-6 mb-3">
                <NavLink to='/recent'>
                    <button className="btn btn-secondary text-white w-100">Audio Features</button>
                </NavLink>
            </div>
        </div>
    </nav>
    )
}

const Main = () => {
    const [token, setToken] = useState(null);
    const [selectedTrackID, setSelectedTrackID] = useState(null);
    return (
        <div>
            {/* <Navigation /> */}
            <Routes>
                <Route path='/' element={<HomePage />}/>
                <Route path='/search' element={<App 
                    token={token} 
                    setToken={setToken} 
                    setSelectedTrackID={setSelectedTrackID} />} />
                <Route path='/audiofeatures' element={<AudioFeatures 
                    token={token} 
                    trackID={selectedTrackID}/>} />
                <Route path='/recent' element={<RecentSearch 
                    token={token} 
                    setSelectedTrackID={setSelectedTrackID}/>} />
            </Routes>
        </div>
    );
}

export default Main;