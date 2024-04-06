import React from "react";
import UserStatus from "../components/UserStatus.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Home(){
    return (
        <div>
            <UserStatus />

            <TransactionList />
        </div>
    )
}