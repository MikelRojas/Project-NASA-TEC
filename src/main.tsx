import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';

import global_es from "./pages/Configuration/translation/es/global.json";
import global_en from "./pages/Configuration/translation/en/global.json";
import { getUserSettings} from './common/userInfo.tsx'; // Importa getUserSettings para obtener la configuración del usuario

// Inicializa i18next
i18next.init({
  interpolation: { escapeValue: false },
  lng: "en", // Idioma predeterminado
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

// Componente para manejar la lógica de configuración del idioma
const LanguageInitializer = () => {
  useEffect(() => {
    const userSettings = getUserSettings(); // Obtén los ajustes del usuario

    if (userSettings && userSettings.language) {
      i18next.changeLanguage(userSettings.language); // Cambia el idioma si los ajustes existen
    }
  }, []); // Se ejecuta solo al cargar la página

  return null; // Este componente no renderiza nada visible
};

// Renderiza la aplicación
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <LanguageInitializer /> {/* Agrega el componente aquí */}
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
