import React, { useEffect, useState } from "react";
import UserWallet from "../components/UserWallet.jsx";
import TransactionList from "../components/TransactionList.jsx";
import DailyObjective from "../components/DailyObjective.jsx";
import { Typography } from "@mui/material";
import { translate } from "../translations/translate";

export default function Home(props) {
    const [width, setWidth] = useState(props.sidebarExpanded ? 'calc(100% - 200px)' : 'calc(100% - 80px)');

    useEffect(() => {
        setWidth(props.sidebarExpanded ? 'calc(100% - 150px)' : 'calc(100% - 50px)');
    }, [props.sidebarExpanded]);

    setTimeout(() => {
        if (props.botRunning) {
            fetch('http://127.0.0.1:8000/brunixAPI/get_transactions')
                .then(response => {
                    console.log(response)
                })
                .catch(error => { console.error(error) })
        }
    }, 1000);

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
                justifyContent: 'space-around',
                overflowX: 'hidden'
            }}
        >
            <Typography style={{ color: 'rgba(50, 76, 100, 1)', position: 'absolute', top: '15px', fontSize: '25px', fontWeight: 'bold' }}>{translate('dashboard')}</Typography>
            <div
                style={{
                    flexDirection: 'column',
                    display: 'flex',
                    width: '50%',
                    height: '90%',
                    justifyContent: 'space-evenly',
                    margin: 'auto',
                    alignItems: 'center'
                }}
            >
                <TransactionList />
            </div>

            <div
                style={{
                    flexDirection: 'column',
                    display: 'flex',
                    width: '25%',
                    height: '90%',
                    justifyContent: 'space-evenly',
                    margin: 'auto',
                    alignItems: 'center'
                }}
            >
                <UserWallet />
                <DailyObjective />
            </div>
        </div>
    )
}
