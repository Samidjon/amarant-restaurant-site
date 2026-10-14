import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import MenuPage from './MenuPage.jsx';
import './styles.css';

const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
const RootPage = pathname === '/menu' || pathname.startsWith('/menu/') ? MenuPage : App;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootPage />
  </React.StrictMode>
);
