
import { useEffect, useState } from 'react';
import { getUserSettings, loadUserFromSessionStorage, setUserInfo, useTheme } from '../../common/userInfo';
import './styles.css';
import { useTranslation } from 'react-i18next';
import appFirebase from '../../credentials';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const Home: React.FC<{}> = () => {
    const [t] = useTranslation("global");
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
    

    const themeClass = theme === 'dark' ? 'dark-theme' : 'light-theme';
    const stylesTitle= theme === 'dark'
    ? 'title-dark'
    : 'title-light';
    
    return (
        <div className="d-flex flex-column justify-content-center align-items-center position-relative" style={{ height: '100vh', textAlign: 'center' }}>
        <div className={`home-container ${themeClass}`}>
        <h1 className={stylesTitle}>{t("header.Home")}</h1>
                <section className="home-description">
                    <h2>{t("header.Description")}</h2>
                    <p>{t("header.Description_text")}</p>
                </section>

                <section className="home-manual">
                    <h2>{t("header.Manual")}</h2>
                    <div className="manual-section">
                        <h3>{t("header.Navigation_Bar")}</h3>
                        <p>{t("header.Navigation_Bar_Description")}</p>
                        <img src="/public/images/Navbar.png" alt={t("header.Navigation_Bar")} />
                    </div>
                    <div className="manual-section">
                        <h3>{t("header.Map")}</h3>
                        <p>{t("header.Map_Description")}</p>
                        <img src="/public/images/Map.png" alt={t("header.Map")} />
                    </div>
                    <div className="manual-section">
                        <h3>{t("header.Day")}</h3>
                        <p>{t("header.Day_Description")}</p>
                        <img src="/public/images/Day.png" alt={t("header.Day")} />
                    </div>
                    <div className="manual-section">
                        <h3>{t("header.Events")}</h3>
                        <p>{t("header.Events_Description")}</p>
                        {/* Add image for Events */}
                        <img src="path_to_events_image" alt={t("header.Events")} />
                    </div>
                    <div className="manual-section">
                        <h3>{t("header.My_Events")}</h3>
                        <p>{t("header.My_Events_Description")}</p>
                        {/* Add image for My Events */}
                        <img src="path_to_my_events_image" alt={t("header.My_Events")} />
                    </div>
                    <div className="manual-section">
                        <h3>{t("header.Login")}</h3>
                        <p>{t("header.Login_Description")}</p>
                        {/* Add image for Login */}
                        <img src="path_to_login_image" alt={t("header.Login")} />
                    </div>
                    <div className="manual-section">
                        <h3>{t("header.Profile")}</h3>
                        <p>{t("header.Profile-d")}</p>
                        <img src="/public/images/Configuration.png" alt={t("header.Profile")} />
                    </div>
                </section>

                <section className="home-links">
                    <h2>{t("header.Quick_Links")}</h2>
                    <ul>
                        <li><a href="/picture">{t("header.Astronomy_Picture")}</a></li>
                        <li><a href="/events">{t("header.Events_Link")}</a></li>
                        <li><a href="/map">{t("header.Map_Link")}</a></li>
                        <li><a href="/myevents">{t("header.My_Events_Link")}</a></li>
                        <li><a href="/login">{t("header.Login_Link")}</a></li>
                        <li><a href="/Configuration">{t("header.Profile")}</a></li>
                    </ul>
                </section>

                <section className="home-developers">
                    <h2>{t("header.Developer_Information")}</h2>
                    <p>{t("header.Developer_Info_Text")}</p>
                </section>

                <section className="home-purpose">
                    <h2>{t("header.Purpose")}</h2>
                    <p>{t("header.Purpose_Text")}</p>
                </section>
            </div>
        </div>
    );
};
