import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { translate } from "../translations/translate";
import axios from 'axios';

export default function Bot(props) {
    const [width, setWidth] = useState(props.sidebarExpanded ? 'calc(100% - 200px)' : 'calc(100% - 80px)');
    const [risk, setRisk] = useState(0);
    const [rsi, setRsi] = useState(0);
    const [emaFast, setEmaFast] = useState(0);
    const [emaSlow, setEmaSlow] = useState(0);

    useEffect(() => {
        setWidth(props.sidebarExpanded ? 'calc(100% - 150px)' : 'calc(100% - 50px)');
    }
        , [props.sidebarExpanded]);

    async function startSession() {
        const result = await axios.get('http://127.0.0.1:8000/brunixAPI/start_session');

        if(result.status === 200) {
            console.log('Session started');
        }
        else console.log('Error starting session');
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
                <Typography style={{ textAlign: 'center', color: 'rgba(50, 76, 100, 1)', position: 'absolute', top: '15px', fontSize: '25px', fontWeight: 'bold' }}>{translate('bot')}</Typography>

                <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', backgroundColor: 'white', boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.1)', padding: '20px', borderRadius: '10px' }}>

                </div>

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
                    onClick={()=>{startSession()}}
                >
                    {translate('start_session')}
                </button>
            </div>
        </div>
    )
}
