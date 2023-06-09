// react
import React from 'react';
import ReactDOM from 'react-dom/client';
// app
import App from './App';
// styles
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
