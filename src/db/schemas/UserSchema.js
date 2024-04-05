export const UserSchema = {
    name: 'User',
    properties: {
        id: 'int',
        first_name: 'string',
        last_name: 'string',
        email: 'string',
        password: 'string',
        username: 'string',
        language: 'string',
        balance: 'double',
    },
    primaryKey: 'id'
};