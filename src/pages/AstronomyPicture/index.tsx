import { useEffect, useState } from "react";
import './styles.css';
import { useTranslation } from 'react-i18next';
import { getUserSettings, loadUserFromSessionStorage, setUserInfo, useTheme } from "../../common/userInfo";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "../../credentials";

interface APOD {
  date: string;
  explanation: string;
  title: string;
  url: string;
}

export const AstronomyPicture: React.FC<{}> = () => {
  const [t] = useTranslation("global");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [data, setData] = useState<APOD | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userLog, setUserLog] = useState<boolean>(() => {
    const user = loadUserFromSessionStorage();
    return user !== null;
  });
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    const auth = getAuth(appFirebase);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setUserInfo(user);
        setUserLog(true);
        const userSettings = getUserSettings();
        if (userSettings) {
          setTheme(userSettings.color || 'dark');
        }
      } else {
        setUserLog(false);
      }
    });

    return () => unsubscribe();
  }, [setTheme]);



  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (newDate >= minDate && newDate <= maxDate) {
      setSelectedDate(newDate);
    } else {
      alert('Date must be within range 01-01-1995 to today.');
    }
  };

  const minDate = new Date('1995-01-01');
  const maxDate = new Date(); // Fecha actual

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const formattedDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        const url = "https://api.nasa.gov/planetary/apod?api_key=yeJaLCwvDvU82jsntYaXj1mzz8BiMt5Q3CsZXfoJ&date=" + formattedDate;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: APOD = await response.json();
        setData(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  const stylesTitle= theme === 'dark'
  ? 'title-dark'
  : 'title-light';

  const stylesText= theme === 'dark'
  ? 'container-text-dark'
  : 'container-text-light';

  const stylesCalendar= theme === 'dark'
  ? 'date-inputs-dark'
  : 'date-inputs';

  return (
    <div className="bg-image img-fluid">
      <div style={{ position: 'relative', minHeight: '100vh', color: 'black' }}>
        <h1 className={stylesTitle}>{t("imageOfTheDay.Title")}</h1>
        
        <div className={stylesCalendar}>
          <label>
            {t("imageOfTheDay.SelectDate")}
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
              min={minDate.toISOString().split('T')[0]}
              max={maxDate.toISOString().split('T')[0]}
            />
          </label>
        </div>
        
        {selectedDate && (
          <>
            <div className="flex-container">
              <div className={stylesText}>
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
