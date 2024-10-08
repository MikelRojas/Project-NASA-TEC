import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { getAuth, signOut } from 'firebase/auth';
import { getUserInfo, getUserSettings, setColor, setLanguage } from '../../common/userInfo';
import { useTranslation } from 'react-i18next'; 

export const Configuration: React.FC = () => {
  const [t, i18n] = useTranslation("global");
  const [theme, setTheme] = useState('dark');
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo && getUserSettings()!=undefined) {
      setUserName(userInfo.name);
      setTheme(userInfo.settings.color)
      i18n.changeLanguage(getUserSettings()?.language);
    }
  }, []);

  

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
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
      <h1>{t("header.Welcome_config")}</h1>
      <div className="user-profile">
        <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="User Profile" className="user-image" />
        <p className="user-name">{userName}</p>
      </div>
      <hr className="separator" />
      <div className="settings">
        <div className="setting">
          <label htmlFor="language-select">{t("header.Language")}</label>
          <select
            id="language-select"
            value={i18n.language}
            onChange={handleLanguageChange}
          >
            <option value="en">{t("header.English")}</option>
            <option value="es">{t("header.Spanish")}</option>
          </select>
        </div>
        <div className="setting">
          <label htmlFor="theme-select">{t("header.Color")}</label>
          <select
            id="theme-select"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="dark">{t("header.Dark")}</option>
            <option value="light">{t("header.Light")}</option>
          </select>
        </div>
        <button className='btn btn-primary' onClick={handleLogout}>{t("header.Logout")}</button>
      </div>
    </div>
  );
};

