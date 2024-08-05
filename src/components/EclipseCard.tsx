import React, { useEffect, useState } from "react";

interface EclipseData {
  type: string;
  date: string;
  hour: string;
  mode: string;
  places: string;
}

export const EclipseCard: React.FC = () => {
  const [eclipseData, setEclipseData] = useState<EclipseData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request = 'http://127.0.0.1:8000/eclipses?start_date=2024-01-01&end_date=2024-12-01&type=solar';
    
    fetch(request)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        setEclipseData(result);
      })
      .catch(error => {
        setError(`Bad request: ${error.message}`);
      });
  }, []);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {eclipseData ? (
            eclipseData.map((eclipse, index) => (
              <div key={index}>
                <p>Type: {eclipse.type}</p>
                <p>Date: {eclipse.date}</p>
                <p>Hour: {eclipse.hour}</p>
                <p>Mode: {eclipse.mode}</p>
                <p>Places: {eclipse.places}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
};
