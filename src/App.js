import React, { useCallback, useEffect, useState } from 'react';

import './App.css';

const telegram = window.Telegram.WebApp;

const App = () => {
    const [signName, setSignName] = useState('');

    const signs = [
        { name: 'aries', period: '21.03 - 20.04', icon: '/' },
        { name: 'taurus', period: '21.04 - 21.05', icon: '/' },
        { name: 'gemini', period: '22.05 - 21.06', icon: '/' },
        { name: 'cancer', period: '22.06 - 22.07', icon: '/' },
        { name: 'leo', period: '	23.07 - 21.08', icon: '/' },
        { name: 'virgo', period: '22.08 - 23.09', icon: '/' },
        { name: 'libra', period: '24.09 - 23.10', icon: '/' },
        { name: 'scorpio', period: '24.10 - 22.11', icon: '/' },
        { name: 'sagittarius', period: '23.11 - 22.12', icon: '/' },
        { name: 'capricorn', period: '23.12 - 20.01', icon: '/' },
        { name: 'aquarius', period: '21.01 - 19.02', icon: '/' },
        { name: 'pisces', period: '20.02 - 20.03', icon: '/' },
    ];

    useEffect(() => {
        telegram.MainButton.setParams({
            text: 'Get horoscope',
        });

        telegram.MainButton.show();
    }, []);
    
    const getData = async () => {
        const response = await fetch('https://poker247tech.ru/get_horoscope/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    'sign': signName,
                    'language': 'original',
                    'period': 'today'
                }
            ),
        });; 
        
        if (!response.ok) {
            throw new Error('Ошибка сервера!');
        }

        return await response.json();
    };

    const onSendData = useCallback(async () => {
        const data = getData();
        
        telegram.sendData(JSON.stringify(data));

        telegram.close();
    }, [signName]);

    useEffect(() => {
        telegram.onEvent('mainButtonClicked', onSendData);

        return () => {
            telegram.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    const getSign = (sign) => {
        return <button className={`sign-${sign.name}`} onClick={() => setSignName(sign.name)}>{`${sign.name} - ${sign.period}`}</button>;
    };

    return (
        <div className='App'>
            <div className='signs-container'>
                {signs.map(sign => getSign(sign))}
            </div>
        </div>
    );
};

export default App;
