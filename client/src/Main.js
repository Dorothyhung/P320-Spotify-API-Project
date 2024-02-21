import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import App from './App.js';
import AudioFeatures from './AudioFeatures.js'

const Navigation = () => {
    return (
    <nav className="container d-flex flex-column align-items-center justify-content-center pt-5">
        <div className="row w-50">
            <div className="col-6 mb-3">
                <NavLink to='/'>
                    <button className="btn btn-secondary text-white w-100">Search</button>
                </NavLink>
            </div>
            <div className="col-6 mb-3">
                <NavLink to='/audiofeatures'>
                    <button className="btn btn-secondary text-white w-100">Audio Features</button>
                </NavLink>
            </div>
        </div>
    </nav>
    )
}

const Main = () => {
    const [token, setToken] = useState(null); // Token created each time page is refreshed
    const [selectedTrackID, setSelectedTrackID] = useState(null);
    return (
        <div>
            {/* <Navigation /> */}
            <Routes>
                <Route path='/' element={<App token={token} setToken={setToken} setSelectedTrackID={setSelectedTrackID} />} />
                <Route path='/audiofeatures' element={<AudioFeatures token={token} trackID={selectedTrackID}/>} />
            </Routes>
        </div>
    );
}

export default Main;