import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import HotelContextProvider from './context/HotelContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HotelContextProvider>
      <App />
    </HotelContextProvider>
  </React.StrictMode>
);

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 123) { // F12
    event.preventDefault();
  }
  if (event.ctrlKey && event.shiftKey && event.keyCode === 73) { // Ctrl+Shift+I
    event.preventDefault();
  }
  if (event.ctrlKey && event.keyCode === 85) { // Ctrl+U
    event.preventDefault();
  }
});