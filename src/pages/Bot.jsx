import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { translate } from "../translations/translate";
import axios from 'axios';
import { isToday } from "date-fns";

export default function Bot(props) {
    const [width, setWidth] = useState(props.sidebarExpanded ? 'calc(100% - 200px)' : 'calc(100% - 80px)');
    const [risk, setRisk] = useState('10');
    const [rsi, setRsi] = useState(5);
    const [emaFast, setEmaFast] = useState(5);
    const [emaSlow, setEmaSlow] = useState(5);
    const [index, setIndex] = useState(0);
    const [botRunning, setBotRunning] = useState(false)

    useEffect(() => {
        setWidth(props.sidebarExpanded ? 'calc(100% - 150px)' : 'calc(100% - 50px)');

    }, [props.sidebarExpanded]);

    async function startSession() {
        fetch(`http://127.0.0.1:8000/brunixAPI/start_session?risk=${risk}&rsi=${rsi}&ema_fast=${emaFast}&ema_slow=${emaSlow}&id=${index}`)
            .then(response => {
                if (response.status === 200) {
                    setBotRunning(true);
                    props.botStarted()
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <div
            style={{
                marginLeft: 'auto',
                marginRight: 0,
                width: width,
                height: '100%',
                transition: 'width 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{ textAlign: 'center', color: 'rgba(50, 76, 100, 1)', position: 'absolute', top: '15px', fontSize: '25px', fontWeight: 'bold', marginBottom: '10px' }}>{translate('bot')}</Typography>

                <Typography style={{ textAlign: 'center', color: 'rgba(50, 76, 100, 1)', fontSize: '15px', fontWeight: 'bold' }}>{translate('bot_settings')}</Typography>
                <div style={{ fontSize: '15px', color: 'rgba(50, 76, 100, 1)', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', backgroundColor: 'white', boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.1)', padding: '20px', borderRadius: '10px' }}>

                    <label htmlFor="riskSelect">Risk</label>
                    <select style={{ marginBottom: '20px' }} id="riskSelect" value={risk} onChange={(event) => setRisk(parseInt(event.target.value / 100))}>
                        <option value="10">10%</option>
                        <option value="30">30%</option>
                        <option value="70">70%</option>
                    </select>

                    <label htmlFor="rsiSelect">RSI</label>
                    <select style={{ marginBottom: '20px' }} id="rsiSelect" value={rsi} onChange={(event) => setRsi(parseInt(event.target.value, 10))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>

                    <label htmlFor="emaFastSelect">EMA (fast)</label>
                    <select style={{ marginBottom: '20px' }} id="emaFastSelect" value={emaFast} onChange={(event) => setEmaFast(parseInt(event.target.value, 10))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>

                    <label htmlFor="emaSlowSelect">EMA (slow)</label>
                    <select id="emaSlowSelect" value={emaSlow} onChange={(event) => setEmaSlow(parseInt(event.target.value, 10))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                {!botRunning ?
                    <button
                        style={{
                            width: '200px',
                            height: '50px',
                            backgroundColor: 'rgba(50, 76, 100, 1)',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '50px',
                            boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.1)',
                        }}
                        onClick={startSession}
                    >
                        {translate('start_session')}
                    </button>
                    :
                    <button
                        style={{
                            width: '200px',
                            height: '50px',
                            backgroundColor: 'red',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '50px',
                            boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.1)',
                        }}
                        onClick={startSession}
                    >
                        STOP
                    </button>
                }
            </div>
        </div>
    );
}
