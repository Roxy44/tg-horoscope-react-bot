import React, { useEffect } from 'react';

import './App.css';

const telegram = window.Telegram.WebApp;

function App() {

    useEffect(() => {
        telegram.ready();
    }, []);
    

    const onClose = () => {
        telegram.close();
    };

    return (
        <div className='App'>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};

export default App;
