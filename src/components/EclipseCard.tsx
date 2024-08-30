import React, { useEffect, useState } from "react";
import {FavoriteButton} from "./FavoriteButton";
import {EclipseData} from '../common/interfaces';
import { useTranslation } from 'react-i18next'; 


interface EclipseCardProps {
  startDate: string;
  endDate: string;
  type: 'solar' | 'lunar';
}

const EclipseImg = (type: string, mode: string): string => {
  switch (mode) {
    case 'Total':
      return type === 'solar' ? '/images/solar-total.jpg' : '/images/lunar-total.png';
    case 'Partial':
      return type === 'solar' ? '/images/solar-partial.jpg' : '/images/lunar-partial.png';
    case 'Annular':
      return '/images/solar-anular.jpg';
    case 'Penumbral':
      return '/images/lunar-penumbral.png';
    case 'Hybrid':
      return '/images/solar-partial.jpg';
    default:
      return '/images/default.jpg';
  }
}

interface EclipseProps {
  eclipse: EclipseData;
}

export const GenerateEclipses: React.FC<EclipseProps> = ({ eclipse }) => {
  return (
    <div className="col-md-12 mb-12">
      <div className="card eclipse-card text-center">
        <img src={EclipseImg(eclipse.type, eclipse.mode)} className="card-img-top card-image" alt={eclipse.mode} />
        <div className="card-body">
          <h5 className="card-title">{eclipse.mode} Eclipse</h5>
          <p className="card-text">Date: {eclipse.date}</p>
          <p className="card-text">Maximum Point: {eclipse.hour}</p>
          <p className="card-text">Places: {eclipse.places}</p>
          <FavoriteButton event={eclipse} /> {/* Pasar eclipse directamente */}
        </div>
      </div>
    </div>
  );
};

const EclipseCard: React.FC<EclipseCardProps> = ({ startDate, endDate, type }) => {
  const [t] = useTranslation("global");
  const [eclipseData, setEclipseData] = useState<EclipseData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request = `http://127.0.0.1:8000/eclipses?start_date=${startDate}&end_date=${endDate}&type=${type}`;
    
    fetch(request)
      .then(response => {
        if (response.status === 404) {
          throw new Error('There are no events on these dates.');
        }
        if (!response.ok) {
          throw new Error('Error in request');
        }
        return response.json();
      })
      .then(result => {
        if (result.length === 0) {
          setError('There are no events on these dates.');
          setEclipseData(null);
        } else {
          setEclipseData(result);
          setError(null);
        }
      })
      .catch(error => {
        setError(`Error in request: ${error.message}`);
        setEclipseData(null);
      });
  }, [startDate, endDate, type]);

  return (
    <div className="container mt-4">
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row">
          {eclipseData ? (
            eclipseData.map((eclipse, index) => (
              <div className="col-md-3 mb-3" key={index}>
                <div className="card eclipse-card text-center">
                  <img src={EclipseImg(eclipse.type, eclipse.mode)} className="card-img-top card-image" alt={eclipse.mode} />
                  <div className="card-body">
                    <h5 className="card-title">{eclipse.mode} {t("eclipse.Eclipse")}</h5>
                    <p className="card-text">{t("eclipse.Date")} {eclipse.date}</p>
                    <p className="card-text">{t("eclipse.Maximum")} {eclipse.hour}</p>
                    <p className="card-text">{t("eclipse.Places")} {eclipse.places}</p>
                    <FavoriteButton event={eclipse}></FavoriteButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>{t("events.Loading")}</p>
          )}
        </div>
      )}
    </div>
  );
};
export default EclipseCard;

