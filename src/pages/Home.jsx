import React, { useEffect, useState } from "react";
import UserGraph from "../components/UserGraph.jsx";
import UserBalance from "../components/UserWallet.jsx";
import TransactionList from "../components/TransactionList.jsx";
import DailyObjective from "../components/DailyObjective.jsx";

export default function Home(props) {
    const [width, setWidth] = useState(props.sidebarExpanded ? 'calc(100% - 150px)' : 'calc(100% - 50px)');

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
                flexDirection: 'row'
            }}
        >
            {/* Still need to separate in two columns */}
            <UserGraph />
            <UserBalance />
            <TransactionList />
            <DailyObjective />
        </div>
    )
}
