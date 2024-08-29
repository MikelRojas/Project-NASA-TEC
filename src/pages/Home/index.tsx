import React from 'react';
import './styles.css';
import { useTranslation } from 'react-i18next'; 

export const Home: React.FC<{}> = () => {
    const [t] = useTranslation("global");
    return (
        <div className="d-flex flex-column justify-content-center align-items-center position-relative" style={{ height: '100vh', textAlign: 'center' }}>
            <div className="home-container">
                <h1>{t("header.Home")}</h1>
                <section className="home-description">
                    <h2>{t("header.Description")}</h2>
                    <p>{t("header.Description_text")}</p>
                </section>

                <section className="home-manual">
                    <h2>{t("header.Manual")}</h2>
                    <div className="manual-section">
                        <h3>{t("header.Navigation_Bar")}</h3>
                        <p>{t("header.Navigation_Bar_Description")}</p>
                        {/* Add image for Navigation Bar */}
                        <img src="path_to_navigation_bar_image" alt={t("header.Navigation_Bar")} />
                    </div>
                    <div className="manual-section">
                        <h3>{t("header.Map")}</h3>
                        <p>{t("header.Map_Description")}</p>
                        {/* Add image for Map */}
                        <img src="path_to_map_image" alt={t("header.Map")} />
                    </div>
                    <div className="manual-section">
                        <h3>{t("header.Day")}</h3>
                        <p>{t("header.Day_Description")}</p>
                        {/* Add image for Day */}
                        <img src="path_to_day_image" alt={t("header.Day")} />
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
                </section>

                <section className="home-links">
                    <h2>{t("header.Quick_Links")}</h2>
                    <ul>
                        <li><a href="#astronomy-picture">{t("header.Astronomy_Picture")}</a></li>
                        <li><a href="#events">{t("header.Events_Link")}</a></li>
                        <li><a href="#map">{t("header.Map_Link")}</a></li>
                        <li><a href="#my-events">{t("header.My_Events_Link")}</a></li>
                        <li><a href="#login">{t("header.Login_Link")}</a></li>
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