import { useEffect, useState, useRef} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import { useTranslation } from 'react-i18next'; 


interface APOD{
    date:string,
    explanation:string,
    title:string,
    url:string
}

export const AstronomyPicture: React.FC<{}> = () => {
    const [t] = useTranslation("global");
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
                const formattedDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
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
        <div className="bg-image img-fluid">
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <h1>{t("imageOfTheDay.Title")}</h1>

                <button id="calendar" onClick={() => setShowCalendar(!showCalendar)}>
                    {t("imageOfTheDay.SelectDate")}
                </button>
                {showCalendar && (
                    <div className="calendar-overlay" ref={calendarRef}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                            inline
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                        />
                    </div>
                )}
                {selectedDate && (
                    <>
                        <h2 id="date-select">{t("imageOfTheDay.SelectedDate", { date: selectedDate.toDateString() })}</h2>
                        <div className="flex-container">
                            <div className="container-text">
                                <h1>{data?.title}</h1>
                                <p>{data?.explanation}</p>
                            </div>
                            <img src={data?.url} alt={data?.title} className="img-fluid img-custom-size" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};