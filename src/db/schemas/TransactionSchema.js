export const TransactionSchema = {
    name: 'Transaction',
    properties: {
        id: 'int',
        datetime: 'date',
        type: 'string',
        amount: 'double',
        price: 'double',
        profit_loss: 'double',
        status: 'string',
        user: 'int',
    },
    primaryKey: 'id'
};