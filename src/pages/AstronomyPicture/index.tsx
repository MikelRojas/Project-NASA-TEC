import { useEffect, useState, useRef} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

interface APOD{
    date:string,
    explanation:string,
    title:string,
    url:string
}

export const AstronomyPicture: React.FC<{}> = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [data, setData] = useState<APOD | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const calendarRef = useRef<HTMLDivElement | null>(null); 

    const handleDateChange = (date: Date | null) => {
        if(date){
            setSelectedDate(date);
            setShowCalendar(false); // Ocultar el calendario después de seleccionar una fecha
        }   
    };


    const minDate = new Date('1995-01-01');
    const maxDate = new Date(); // Fecha actual

    useEffect(() =>{
        const fetchData = async () =>{
            setLoading(true);
            try{
                const formattedDate = selectedDate.toISOString().split('T')[0];
                const url = "https://api.nasa.gov/planetary/apod?api_key=yeJaLCwvDvU82jsntYaXj1mzz8BiMt5Q3CsZXfoJ&date=" + formattedDate;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: APOD = await response.json();
                setData(result);
            } catch (error:unknown) {
                if (error instanceof Error) {
                    setError(error.message); 
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    },[selectedDate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }

      return (
        <div style={{ position: 'relative' }}>
          <h1>Imagen del dia</h1>
    
          <button id="Calendar" onClick={() => setShowCalendar(!showCalendar)}>
            Select date
          </button>
          {showCalendar && (
            <div className="calendar-overlay" ref={calendarRef}>
                <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                inline
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                />
            </div>
          )}
          {selectedDate && (
            <>
              <p>Fecha seleccionada: {selectedDate.toDateString()}</p>
              <h1>{data?.title}</h1>
              <p>{data?.explanation}</p>
              <img src={data?.url} alt={data?.title} />      
            </>
          )}
        </div>
      );
};