// User payment processing module

async function processPayment(userId, amount) {
    // VIOLATION: Missing input validation for userId and amount
    
    // VIOLATION: Raw console.log statement
    console.log('Processing transaction for user:', userId, 'Amount:', amount);

    // VIOLATION: Unhandled async call without try-catch block
    const transaction = await mockBankApiCall(userId, amount);
    
    return {
        success: true,
        transactionId: transaction.id
    };
}

async function mockBankApiCall(userId, amount) {
    if (amount <= 0) {
        throw new Error('Invalid payment amount');
    }
    return { id: 'TXN_' + Math.random().toString(36).substring(7) };
}

module.exports = { processPayment };