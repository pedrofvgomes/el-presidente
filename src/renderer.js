import './pages/App.jsx';
import { stores } from './stores/index.js';
import axios from 'axios';

const testUser = {
    id: 1,
    first_name: 'Test',
    last_name: 'User',
    email: 'testuser@example.com',
    password: 'test123',
    username: 'testuser',
    language: 'pt',
    balance_usd: 0,
    balance_btc: 1000 / 70000,
    birth_date: new Date('1990-01-01'), // Example birth date
    date_joined: new Date(), // Current date as the date joined
    daily_objective: 1000
};

window.onload = async () => {
    // Create the test user

    let user = window.api.read('User', '');

    if(user.length === 0) {
        window.api.create('User', testUser);
    }

    let transactions = [
        {
            id: 1,
            datetime: new Date('2024-04-07T08:00:00'),
            amount: 100,
            type: 'buy',
            price: 50000,
            status: 'closed',
            user: 1,
            profit_loss: -90.12
        },
        {
            id: 2,
            datetime: new Date('2024-04-07T10:15:00'),
            amount: 150,
            type: 'sell',
            price: 55000,
            status: 'closed',
            user: 1,
            profit_loss: 100.30
        },
        {
            id: 3,
            datetime: new Date('2024-04-07T12:30:00'),
            amount: 200,
            type: 'buy',
            price: 51000,
            status: 'closed',
            user: 1,
            profit_loss: -21.31
        },
        {
            id: 4,
            datetime: new Date('2024-04-07T14:45:00'),
            amount: 120,
            type: 'sell',
            price: 56000,
            status: 'closed',
            user: 1,
            profit_loss: 64.10
        },
        {
            id: 5,
            datetime: new Date('2024-04-07T17:00:00'),
            amount: 180,
            type: 'buy',
            price: 52000,
            status: 'closed',
            user: 1,
            profit_loss: 0
        },
        {
            id: 6,
            datetime: new Date('2024-04-07T19:30:00'),
            amount: 90,
            type: 'sell',
            price: 57000,
            status: 'closed',
            user: 1,
            profit_loss: 40.12
        },
        {
            id: 7,
            datetime: new Date('2024-04-07T21:00:00'),
            amount: 250,
            type: 'sell',
            price: 58000,
            status: 'closed',
            user: 1,
            profit_loss: 140.90
        },
        {
            id: 8,
            datetime: new Date('2024-04-07T22:15:00'),
            amount: 120,
            type: 'buy',
            price: 51000,
            status: 'closed',
            user: 1,
            profit_loss: -33.40
        },
        {
            id: 9,
            datetime: new Date('2024-04-07T23:30:00'),
            amount: 180,
            type: 'sell',
            price: 59000,
            status: 'closed',
            user: 1,
            profit_loss: 85.70
        },
        {
            id: 10,
            datetime: new Date('2024-04-07T08:45:00'),
            amount: 160,
            type: 'buy',
            price: 49500,
            status: 'closed',
            user: 1,
            profit_loss: -42.80
        },
        {
            id: 11,
            datetime: new Date('2024-04-07T10:00:00'),
            amount: 200,
            type: 'sell',
            price: 58000,
            status: 'closed',
            user: 1,
            profit_loss: 105.20
        },
        {
            id: 12,
            datetime: new Date('2024-04-07T11:15:00'),
            amount: 220,
            type: 'buy',
            price: 52000,
            status: 'closed',
            user: 1,
            profit_loss: -15.50
        },
        {
            id: 13,
            datetime: new Date('2024-04-07T12:30:00'),
            amount: 130,
            type: 'sell',
            price: 57000,
            status: 'closed',
            user: 1,
            profit_loss: 70.20
        },
        {
            id: 14,
            datetime: new Date('2024-04-07T13:45:00'),
            amount: 140,
            type: 'buy',
            price: 49000,
            status: 'closed',
            user: 1,
            profit_loss: -20.90
        }
    ];

    let create = false;
    if(window.api.read('Transaction', '').length === 0) {
        create = true;
    }
    for (let t of transactions) {
        if(create) window.api.create('Transaction', t);
        stores.transactionStore.addTransaction(t.datetime, t.type, t.amount, t.price, t.profit_loss, t.status, t.user)
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

setInterval(async () => {
    // pedir transações
    let request = false;// await axios.get(`http://127.0.0.1:8000/brunixAPI/get_transactions?id=${window.api.read('Transaction', '').length + 1}`);
    if(request.status === 200) {
        let data = request.request.data;

        if(data.status === 'open'){
            window.api.create('Transaction', {
                id: window.api.read('Transaction', '').length + 1,
                datetime: new Date(data.datetime),
                amount: data.amount,
                type: data.type,
                price: data.price,
                status: data.status,
                user: 1,
                profit_loss: data.profit_loss
            });
        }
        else {
            let transactions = window.api.read('Transaction', '');
            // update
            
        }

        let id = window.api.read('Transaction', '').length + 1;

        window.api.create('Transaction', {
            id: id,
            datetime: new Date(data.datetime),
            amount: data.amount,
            type: data.type,
            price: data.price,
            status: data.status,
            user: 1,
            profit_loss: data.profit_loss
        });
    }
}, 1000);