import {makeAutoObservable} from 'mobx';

class UserStore {
    firstName = '';
    lastName = '';
    email = '';
    username = '';
    language = 'en';
    balance = null;
    dateJoined = null;

    constructor() {
        makeAutoObservable(this);
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    setEmail(email) {
        this.email = email;
    }

    setUsername(username) {
        this.username = username;
    }

    setLanguage(language) {
        this.language = language;

        console.log('Language set to: ' + language);
    }

    setBalance(balance) {
        this.balance = balance;
    }

    setDateJoined(dateJoined) {
        this.dateJoined = dateJoined;
    }
}

export default UserStore;