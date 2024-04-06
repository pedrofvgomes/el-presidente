import React, { useState } from "react";
import UserGraph from "../components/UserGraph.jsx";
import UserBalance from "../components/UserWallet.jsx";
import TransactionList from "../components/TransactionList.jsx";
import DailyObjective from "../components/DailyObjective.jsx";

export default function Home() {
    return (
        <>
            <UserGraph />
            <UserBalance />
            <TransactionList />
            <DailyObjective />
        </>
    )
}