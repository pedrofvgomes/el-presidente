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
    balance: 1000,
    birth_date: new Date('1990-01-01'), // Example birth date
    date_joined: new Date() // Current date as the date joined
};

window.onload = async () => {
    const result = await window.api.read('User', '');

    if(result.length === 0) {
        const res = await window.api.create('User', testUser);
        if(res) {
            console.log('User created successfully!');
        }
        else console.error('Failed to create user.');

        // refresh window
        window.location.reload();
    }

    else {
        const user = result[0];

        stores.userStore.setFirstName(user.first_name);
        stores.userStore.setLastName(user.last_name);
        stores.userStore.setEmail(user.email);
        stores.userStore.setUsername(user.username);
        stores.userStore.setLanguage(user.language);
        stores.userStore.setBalance(user.balance);
        stores.userStore.setDateJoined(user.date_joined);
    }
}