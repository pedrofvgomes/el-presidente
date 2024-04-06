import { makeAutoObservable } from 'mobx';

class TransactionStore {
    transactions = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTransaction(datetime, type, amount, price, profit_loss, status, user) {
        this.transactions.push({
            datetime: datetime,
            type: type,
            amount: amount,
            price: price,
            profit_loss: profit_loss,
            status: status,
            user: user
        });
    }
}

export default TransactionStore;