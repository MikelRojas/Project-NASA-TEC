import React, { useState } from 'react';
import './styles.css'; 

export const Configuration: React.FC = () => {
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('Dark');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div className="config-container">
      <h1>Welcome to the configuration</h1>
      <div className="user-profile">
        <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="User Profile" className="user-image" />
        <p className="user-name">User Name</p>
      </div>
      <hr className="separator" />
      <div className="settings">
        <div className="setting">
          <label htmlFor="language-select">Language Change</label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className="setting">
          <label htmlFor="theme-select">Color Change</label>
          <select
            id="theme-select"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="Dark">Dark</option>
            <option value="Light">Light</option>
          </select>
        </div>
      </div>
    </div>
  );
};