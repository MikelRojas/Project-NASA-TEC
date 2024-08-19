import React from "react";
import './styles.css';

export const AsteroidMap: React.FC<{}> = () => {

    return (
        <div className="map-container">
            <h1>Interactive Map</h1>
            <p className="map-description">
                Explore the interactive map to discover celestial bodies and their positions in the universe. Click on planets or other objects to learn more about them.
            </p>
            <div className="map-iframe-container">
                <iframe src="https://eyes.nasa.gov/apps/asteroids/" width="100%" height="600px" className="map-iframe"></iframe>
            </div>
        </div>
    );
};
