import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import { TranslationProvider } from 'react-google-multi-lang';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <TranslationProvider key='AIzaSyA9WL7dtO4yzHQmcupiN0o5VHkPMPJJwMA'>
      <App/>
    </TranslationProvider>
  </React.StrictMode>,
)
