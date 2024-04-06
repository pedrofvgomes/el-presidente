export const UserSchema = {
    name: 'User',
    properties: {
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        password: 'string',
        username: 'string',
        language: 'string',
        balance_usd: 'double',
        balance_btc: 'double',
        birth_date: 'date',
        date_joined: 'date',
        daily_objective: 'double',
    },
};