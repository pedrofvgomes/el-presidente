import React, { useState } from "react";
import UserGraph from "../components/UserGraph.jsx";
import UserBalance from "../components/UserBalance.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Home() {
    return (
        <>
            <UserGraph />
            <UserBalance />
            <TransactionList />
        </>
    )
}