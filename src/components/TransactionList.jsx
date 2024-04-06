import React, { useEffect, useState } from "react";
import { translate } from "../translations/translate";
import { observer } from "mobx-react-lite";
import { stores } from "../stores";
import { Typography } from "@mui/material";

console.log(stores)

const TransactionList = observer(() => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setTransactions(stores.transactionStore.transactions);
    }, [stores.transactionStore.transactions]);

    return (
        <div
            style={{
                backgroundColor:'lightgrey',
                display: 'inline-block',
            }}
        >
            <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                {translate('current_balance')}
            </Typography>
            <ul
                style={{
                    margin: 0,
                    padding: 0,
                    height: '35vh',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
            >
                {transactions.map((transaction, index) => (
                    <li
                        key={index}
                        style={{
                            listStyleType: 'none',
                            padding: '10px 20px',
                            margin: 0
                        }}
                    >
                        {transaction.amount}
                    </li>
                ))}
            </ul>
        </div >


    );
});

export default TransactionList;