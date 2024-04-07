import {makeAutoObservable} from 'mobx';

class UserStore {
    firstName = '';
    lastName = '';
    email = '';
    username = '';
    language = 'en';
    balanceUSD = null;
    balanceBTC = null;
    dateJoined = null;
    dailyObjective = null;

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

        window.api.update('User', 'language', language);
    }

    setBalanceUSD(balanceUSD) {
        this.balanceUSD = balanceUSD;
    }

    setBalanceBTC(balanceBTC) {
        this.balanceBTC = balanceBTC;
    }

    setDateJoined(dateJoined) {
        this.dateJoined = dateJoined;
    }

    setDailyObjective(dailyObjective) {
        this.dailyObjective = dailyObjective;
    }
}

export default UserStore;