import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { getAuth, signOut } from 'firebase/auth';
import { getUserInfo, getUserSettings, setColor } from '../../common/userInfo';
import { useTranslation } from 'react-google-multi-lang';

export const Configuration: React.FC = () => {
  const [language, setLanguageCon] = useState('en');
  const { setLanguage } = useTranslation();
  const [theme, setTheme] = useState('dark');
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUserName(userInfo.name);
      setTheme(userInfo.settings.color)
    }
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setLanguageCon(event.target.value);
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selctedColor = event.target.value;
    setTheme(selctedColor);
    if (getUserSettings()?.color!=selctedColor){
      setColor(selctedColor);
    }
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('User signed out');
      window.location.href = '/';
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div className="config-container">
      <h1 className='title'>Welcome to the configuration</h1>
      <div className="user-profile">
        <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="User Profile" className="user-image" />
        <p className="user-name">{userName}</p>
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
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
        <div className="setting">
          <label htmlFor="theme-select">Color Change</label>
          <select
            id="theme-select"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

