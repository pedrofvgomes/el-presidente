import React, { useEffect, useState } from "react";
import UserGraph from "../components/UserGraph.jsx";
import UserBalance from "../components/UserWallet.jsx";
import TransactionList from "../components/TransactionList.jsx";
import DailyObjective from "../components/DailyObjective.jsx";
import BTCGraph from "../components/BTCGraph.jsx";

export default function Home(props) {
    const [width, setWidth] = useState(props.sidebarExpanded ? 'calc(100% - 200px)' : 'calc(100% - 80px)');

    useEffect(() => {
        setWidth(props.sidebarExpanded ? 'calc(100% - 150px)' : 'calc(100% - 50px)');
    }, [props.sidebarExpanded]);

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
            }}
        >
            {/* Still need to separate in two columns */}
            <div
                style={{
                    flexDirection: 'column',
                    display: 'flex',
                    width: '50%',
                    height: '90%',
                    justifyContent: 'space-evenly',
                    margin:'auto',
                    alignItems:'center'
                }}
            >
                <UserGraph />
                <TransactionList />
            </div>

            <div
                style={{
                    flexDirection: 'column',
                    display: 'flex',
                    width: '25%',
                    height: '90%',
                    justifyContent: 'space-evenly',
                    margin:'auto',
                    alignItems: 'center'
                }}
            >
                <UserBalance />
                <BTCGraph />
                <DailyObjective />
            </div>
        </div>
    )
}
