import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export const AstronomyPicture: React.FC<{}> = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setShowCalendar(false); // Ocultar el calendario después de seleccionar una fecha
    };

    const minDate = new Date('1995-01-01');
    const maxDate = new Date(); // Fecha actual

    return(
        <>
        <h1>Imagen del dia</h1>

        <button id="Calendar" onClick={() => setShowCalendar(!showCalendar)}>
            Select date
        </button>
        {showCalendar &&(
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
        )}
        {selectedDate && (
            <p>Fecha seleccionada: {selectedDate.toDateString()}</p>
        )}
        </>
        
    );
};