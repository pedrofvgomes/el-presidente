import { transaction } from 'mobx';
import './pages/App.jsx';
import { stores } from './stores/index.js';

const testUser = {
    id: 1,
    first_name: 'Test',
    last_name: 'User',
    email: 'testuser@example.com',
    password: 'test123',
    username: 'testuser',
    language: 'pt',
    balance_usd: 0,
    balance_btc: 1000/70000,
    birth_date: new Date('1990-01-01'), // Example birth date
    date_joined: new Date(), // Current date as the date joined
    daily_objective: 1000
};

window.onload = async () => {
    // await window.api.create('User', testUser);

    // Create the test user
    let transactions = [
        {
            id: 1,
            datetime: new Date(),
            amount: 100,
            type: 'buy',
            user: 1,
            code: 'BTCUSD'
        },
        {
            id: 2,
            // 7th of april 2024 in the morning
            datetime: new Date('2024-04-06T08:00:00'),
            amount: 100,
            type: 'sell',
            user: 1,
            code: 'BTCUSD',
        }
    ]

    for (let t of transactions) {
        //const res = await window.api.create('Transaction', t);
        const res = true;
        if (res) {
            console.log('Transaction created successfully!');

            stores.transactionStore.addTransaction(t.datetime, t.amount, t.type, t.user, t.code);
        }
        else console.error('Failed to create transaction.');
    }

    stores.userStore.setFirstName(testUser.first_name);
    stores.userStore.setLastName(testUser.last_name);
    stores.userStore.setEmail(testUser.email);
    stores.userStore.setUsername(testUser.username);
    stores.userStore.setLanguage(testUser.language);
    stores.userStore.setBalanceBTC(testUser.balance_btc);
    stores.userStore.setBalanceUSD(testUser.balance_usd);
    stores.userStore.setDateJoined(testUser.date_joined);
    stores.userStore.setDailyObjective(testUser.daily_objective);
}
