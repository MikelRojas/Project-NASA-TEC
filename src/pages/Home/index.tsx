import React, { useEffect } from 'react';
import './styles.css';
import { withTranslation } from 'react-google-multi-lang';
import { loadUserFromSessionStorage } from '../../common/userInfo';

const Home: React.FC<{}> = () => {
  // Aplicar el tema al cargar la página
  useEffect(() => {
    const user = loadUserFromSessionStorage();
    
    // Verificar si hay un usuario y su configuración de color
    if (user && user.settings.color === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center position-relative" style={{ height: '100vh', textAlign: 'center' }}>
      <div className="home-container">
        <h1 className='title'>Home Page</h1>
            <section className="home-description">
                <h2>Description of the Page</h2>
                <p>This application is designed to provide users with information about astronomical events and pictures. It includes various sections such as Astronomy Picture of the Day, Events, an interactive Map, and a personalized My Events feature.</p>
            </section>

            <section className="home-manual">
                <h2>User Manual</h2>
                <div className="manual-section">
                    <h3>Navigation Bar</h3>
                    <p>The navigation bar allows users to easily switch between different sections of the application.</p>
                    {/* Add image for Navigation Bar */}
                    <img src="path_to_navigation_bar_image" alt="Navigation Bar" />
                </div>
                <div className="manual-section">
                    <h3>Map</h3>
                    <p>The map feature lets users interact with an interactive universe map, where they can click on planets or other celestial bodies to see them as they were in the past or will be in the future according to NASA data.</p>
                    {/* Add image for Map */}
                    <img src="path_to_map_image" alt="Interactive Map" />
                </div>
                <div className="manual-section">
                    <h3>Day</h3>
                    <p>The Day section provides daily information and updates about astronomical events.</p>
                    {/* Add image for Day */}
                    <img src="path_to_day_image" alt="Day Feature" />
                </div>
                <div className="manual-section">
                    <h3>Events</h3>
                    <p>In the Events section, users can view upcoming astronomical events such as solar eclipses, lunar eclipses, comets, and asteroids. Users can search for events based on categories and date ranges.</p>
                    {/* Add image for Events */}
                    <img src="path_to_events_image" alt="Events Section" />
                </div>
                <div className="manual-section">
                    <h3>My Events</h3>
                    <p>The My Events feature allows users to save their favorite events and receive notifications when these events occur.</p>
                    {/* Add image for My Events */}
                    <img src="path_to_my_events_image" alt="My Events Feature" />
                </div>
                <div className="manual-section">
                    <h3>Login</h3>
                    <p>Users can log in to the application to access personalized features and save their preferences.</p>
                    {/* Add image for Login */}
                    <img src="path_to_login_image" alt="Login Feature" />
                </div>
            </section>

            <section className="home-links">
                <h2>Quick Links</h2>
                <ul>
                    <li><a href="#astronomy-picture">Astronomy Picture</a></li>
                    <li><a href="#events">Events</a></li>
                    <li><a href="#map">Map</a></li>
                    <li><a href="#my-events">My Events</a></li>
                    <li><a href="#login">Login</a></li>
                </ul>
            </section>

            <section className="home-developers">
                <h2>Developer Information</h2>
                <p>If you need support or have any questions, please contact the developers.</p>
            </section>

            <section className="home-purpose">
                <h2>Purpose of the Application</h2>
                <p>This application was created to provide users with easy access to information about astronomical events and images, enhancing their knowledge and interest in astronomy.</p>
            </section>
            </div>
        </div>
    );
};

export default withTranslation(Home);
