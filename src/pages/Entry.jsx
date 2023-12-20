// Entry.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Entry() {
  return (
    <div className="entry-container">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src={import.meta.env.BASE_URL + 'src/assets/bgvideo.mov'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Clickable Overlay */}
      <Link to="/signin">
        <div className="overlay"></div>
      </Link>

      {/* Your other content goes here */}
      <div className="content">
        <h1>Welcome to Your Website</h1>
      </div>
    </div>
  );
}

export default Entry;
