import { makeAutoObservable } from 'mobx';

class TransactionStore {
    transactions = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTransaction(datetime, amount, type, user, code) {
        this.transactions.push({
            datetime: datetime,
            amount: amount,
            type: type,
            user: user,
            code: code
        });
    }
}

export default TransactionStore;