import { useEffect, useState, useRef} from "react";
import DatePicker from "react-datepicker";


export const Events: React.FC<{}> = () => {
    const [showStartCalendar,setShowStartCalendar] = useState(false);
    const [selectedStartDate,setSelectedStartDate] = useState<Date>(new Date());
    const [showEndCalendar,setShowEndCalendar] = useState(false);
    const [selectedEndDate,setSelectedEndDate] = useState<Date>(new Date());
    const calendarSRef = useRef<HTMLDivElement | null>(null); 
    const calendarERef = useRef<HTMLDivElement | null>(null); 

    const handleStartDateChange = (date:Date | null) =>{
        if(date){
            setSelectedStartDate(date);
            setShowStartCalendar(false);
        }
    };

    const handleEndDateChange = (date:Date | null) =>{
        if(date){
            setSelectedEndDate(date);
            setShowEndCalendar(false);
        }
    };

    useEffect(() => {
        const handleClickOutsideSC = (event: MouseEvent) => {
            if (calendarSRef.current && !calendarSRef.current.contains(event.target as Node)) {
                setShowStartCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutsideSC);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSC);
        };
    }, []);

    const minDate = new Date('1901-01-01');
    const maxDate = new Date('2070-12-01');

    return (
        <div className="bg-image img-fluid">
            <div style={{ position: 'relative',minHeight: '100vh'}}>
                <h1 id="page-title">Picture of day</h1>
                <div className="flex-container">
                    <button id="btnStartDate" onClick={() => setShowStartCalendar(!showStartCalendar)}>
                            Start Date
                    </button>
                    {showStartCalendar && (
                            <div className="calendar-overlay" ref={calendarSRef}>
                                <DatePicker
                                selected={selectedStartDate}
                                onChange={handleStartDateChange}
                                minDate={minDate}
                                maxDate={maxDate}
                                inline                                    showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                />
                            </div>
                            
                    )} 
                </div>

                <div className="flex-container">
                    <button id="btnEndDate" onClick={() => setShowStartCalendar(!showStartCalendar)}>
                            End Date
                    </button>
                    {showEndCalendar && (
                            <div className="calendar-overlay" ref={calendarERef}>
                                <DatePicker
                                selected={selectedEndDate}
                                onChange={handleEndDateChange}
                                minDate={minDate}
                                maxDate={maxDate}
                                inline                                    showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                />
                            </div>
                    )}  
                    
                </div>

                <div className="flex-container"> 
                    <button id="btnEndDate" onClick={() => setShowStartCalendar(!showStartCalendar)}>
                            End Date
                    </button>
                    {showEndCalendar && (
                            <div className="calendar-overlay" ref={calendarERef}>
                                <DatePicker
                                selected={selectedEndDate}
                                onChange={handleEndDateChange}
                                minDate={minDate}
                                maxDate={maxDate}
                                inline                                    showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                />
                            </div>
                    )} 
                    {selectedEndDate && (
                          <>
                            <p id="start-date-select">Date: {selectedEndDate.toDateString()}</p>
                         </>
                    )} 
                </div>
           

            </div>
        </div>
    )
}