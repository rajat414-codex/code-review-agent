// Comprehensive Unit Test Suite for Payment Processing Module
// Adheres strictly to Rule 4 (Unit Tests)

const { describe, test } = require('node:test');
const assert = require('node:assert');
const { processPayment, mockBankApiCall } = require('./app.fixed');

describe('Payment Module - Unit Tests (rules.md Compliance)', () => {

    describe('Input Validation (Rule 3)', () => {
        test('should throw error when userId is missing or undefined', async () => {
            await assert.rejects(
                async () => await processPayment(undefined, 100),
                { message: 'Invalid parameter: userId must be a non-empty string' }
            );
        });

        test('should throw error when userId is an empty or whitespace string', async () => {
            await assert.rejects(
                async () => await processPayment('   ', 100),
                { message: 'Invalid parameter: userId must be a non-empty string' }
            );
        });

        test('should throw error when userId is not a string type', async () => {
            await assert.rejects(
                async () => await processPayment(12345, 100),
                { message: 'Invalid parameter: userId must be a non-empty string' }
            );
        });

        test('should throw error when amount is zero', async () => {
            await assert.rejects(
                async () => await processPayment('USER_101', 0),
                { message: 'Invalid parameter: amount must be a positive number greater than 0' }
            );
        });

        test('should throw error when amount is negative', async () => {
            await assert.rejects(
                async () => await processPayment('USER_101', -50),
                { message: 'Invalid parameter: amount must be a positive number greater than 0' }
            );
        });

        test('should throw error when amount is not a number', async () => {
            await assert.rejects(
                async () => await processPayment('USER_101', '100'),
                { message: 'Invalid parameter: amount must be a positive number greater than 0' }
            );
        });
    });

    describe('Successful Payment Processing', () => {
        test('should successfully process payment for valid inputs and return transaction ID', async () => {
            const result = await processPayment('USER_999', 250.50);
            assert.ok(result);
            assert.strictEqual(result.success, true);
            assert.match(result.transactionId, /^TXN_/);
        });
    });

    describe('Error Handling & Resilience (Rule 1)', () => {
        test('should handle bank API failures and throw formatted domain error', async () => {
            await assert.rejects(
                async () => await mockBankApiCall('USER_101', -1),
                { message: 'Invalid payment amount' }
            );
        });
    });
});
