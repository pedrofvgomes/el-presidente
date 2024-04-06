import React from "react";
import { translate } from "../translations/translate";
import { observer } from "mobx-react-lite";

const TransactionList = observer(() => {
    return (
        <div>
            <h2>{translate('transaction_list')}</h2>
            <ul>

            </ul>
        </div>
    );
});

export default TransactionList;