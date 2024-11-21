import React from 'react';

function MobileTrackCard({ show, handleClose, track, handleButtonClick, handleAddToHistory, handleFilterButtonClick }) {
  // Show nothing if show prop is false
  if (!show) {
    return null;
  }
  console.log("track = ", track);

  // Display modal for audio features definitions
  return (
    <div className="modal">
      <div className="modal-content text-center d-flex justify-content-center align-items-center">
        <button type="button" class="btn-close ms-auto" onClick={handleClose}></button>
        <h4>{track.name}</h4>
        <h6>{(track.artists.map((artist) => artist.name)).join(", ")}</h6>
        <h6>{track.album.name}</h6>
        <button className="btn black-btn btn-sm" 
            onClick={() => {
                handleButtonClick(track.id);
                handleAddToHistory(track.id);
        }}>View Audio Features</button>
        <button className="btn black-btn btn-sm" 
            onClick={() => { handleFilterButtonClick(track.id); }}
        >Find Similar Tracks</button>
        <a href={track.external_urls.spotify} target="_blank" className='btn black-btn'>Listen on Spotify</a>
      </div>
    </div>
  );
}

export default MobileTrackCard;