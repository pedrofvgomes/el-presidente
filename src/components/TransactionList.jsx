import React, { useEffect, useState } from "react";
import { translate } from "../translations/translate";
import { observer } from "mobx-react-lite";
import { stores } from "../stores";

console.log(stores)

const TransactionList = observer(() => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setTransactions(stores.transactionStore.transactions);
    }, [stores.transactionStore.transactions]);

    function formatTime(datetime) {
        const hours = datetime.getHours().toString().padStart(2, '0');
        const minutes = datetime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    return (
        <div style={{ width: '100%', maxHeight: '200px', overflowY: "auto" }}>
            <table
                style={{
                    width: "100%",
                    fontSize: "10px",
                    borderCollapse: "collapse",
                    backgroundColor: "white",
                    boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.1)",
                    padding: "10px",
                    textAlign: 'center'
                }}
            >
                <thead
                    style={{
                        position: "sticky",
                        top: "0",
                        backgroundColor: "#f2f2f2",
                    }}
                >
                    <tr>
                        <th style={{ textAlign: 'center', padding: '8px' }}>{translate('time')}</th>
                        <th style={{ textAlign: 'center', padding: '8px' }}>{translate('type')}</th>
                        <th style={{ textAlign: 'center', padding: '8px' }}>{translate('amount')}</th>
                        <th style={{ textAlign: 'center', padding: '8px' }}>{translate('price')}</th>
                        <th style={{ textAlign: 'center', padding: '8px' }}>{translate('profit_loss')}</th>
                        <th style={{ textAlign: 'center', padding: '8px' }}>{translate('status')}</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td style={{ padding: "8px" }}>
                                {formatTime(transaction.datetime)}
                            </td>
                            <td style={{ padding: "8px" }}>{translate(transaction.type)}</td>
                            <td style={{ padding: "8px", fontWeight: 'bold' }}>{transaction.amount} BTC</td>
                            <td style={{ padding: "8px", fontWeight: 'bold' }}>{transaction.price?.toFixed(2)} $</td>
                            <td style={{ padding: "8px", color: transaction.profit_loss >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>{transaction.profit_loss >= 0 ? '+' : ''}{transaction.profit_loss?.toFixed(2)} $</td>
                            <td style={{ padding: "8px" }}>{transaction.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default TransactionList;
