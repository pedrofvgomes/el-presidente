export const TransactionSchema = {
    name: 'Transaction',
    properties: {
        id: 'int',
        datetime: 'date',
        amount: 'double',
        type: 'string',
        user: 'User',
    },
    primaryKey: 'id'
};