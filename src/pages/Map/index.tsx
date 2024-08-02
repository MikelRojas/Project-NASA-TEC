import React from "react";

export const AsteroidMap: React.FC<{}> = () =>{
    return(
        <>
            <h1>Mapa Interactivo de Asteroides</h1>
            <iframe src="https://eyes.nasa.gov/apps/asteroids/" width="100%" height="600px"></iframe>
        </>
    );
};