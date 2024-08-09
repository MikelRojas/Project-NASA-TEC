import { useEffect, useState } from 'react';
import { EclipseCard } from '../../components/EclipseCard';
import './styles.css';

export const Events: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date('2024-08-01'));
  const [endDate, setEndDate] = useState<Date>(new Date('2026-08-07'));
  const [selectedEvent, setSelectedEvent] = useState<string>('Asteroids and Comets');
  const [eclipseType,setEclipseType] = useState<'solar'|'lunar'>('solar');

  const handleEventSelection = (event: string) => {
    setSelectedEvent(event);
    if(event==='Solar Eclipses'){
      setEclipseType('solar');
    }
    else if(event==='Lunar Eclipses'){
      setEclipseType('lunar');
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    if(newStartDate<minDate){
      alert('End date cannot be earlier than 01-01-1901.');
    }else if(newStartDate>endDate){
      alert('Start date cannot be later than end date.');
    } else{
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    if(newEndDate>maxDate){
      alert('End date cannot be later than 01-12-2070.');
    }else if (newEndDate<startDate){
      alert('End date cannot be earlier than start date.');
    }else{
      setEndDate(newEndDate);
    }
  };

  const minDate = new Date("1901-01-01");
  const maxDate = new Date("2070-12-01");
  return (
    <div className="bg-image img-fluid">
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <h1>Upcoming Events</h1>
        <div className="date-inputs">
          <label>
            Start Date:
            <input 
            type="date" 
            value={startDate.toISOString().split('T')[0]} 
            onChange={handleStartDateChange}
            min = {minDate.toISOString().split('T')[0]}
            max = {maxDate.toISOString().split('T')[0]}
             />
          </label>
          <label>
            End Date:
            <input 
            type="date" 
            value={endDate.toISOString().split('T')[0]} 
            onChange={handleEndDateChange} 
            min = {minDate.toISOString().split('T')[0]}
            max = {maxDate.toISOString().split('T')[0]}
            />
          </label>
        </div>
        <h2>Select Event:</h2>
        <div className="event-buttons">
          <button
            className={`event-button ${selectedEvent === 'Asteroids and Comets' ? 'active' : ''}`}
            onClick={() => handleEventSelection('Asteroids and Comets')}
          >
            Asteroids and Comets
          </button>
          <button
            className={`event-button ${selectedEvent === 'Solar Eclipses' ? 'active' : ''}`}
            onClick={() => handleEventSelection('Solar Eclipses')}
          >
            Solar Eclipses
          </button>
          <button
            className={`event-button ${selectedEvent === 'Lunar Eclipses' ? 'active' : ''}`}
            onClick={() => handleEventSelection('Lunar Eclipses')}
          >
            Lunar Eclipses
          </button>
        </div>
        <div className='result-container'>
        {(selectedEvent === 'Solar Eclipses' || selectedEvent === 'Lunar Eclipses') && (
           <EclipseCard
           startDate={startDate.toISOString().split('T')[0]}
           endDate={endDate.toISOString().split('T')[0]}
           type={eclipseType}
         />
          )}
        {selectedEvent === 'Asteroids and Comets' && (
            <div>No data available for Asteroids and Comets.</div>
          )}
        </div>
      </div>
    </div>
  );
}
