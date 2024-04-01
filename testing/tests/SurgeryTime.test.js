
const { test, expect } = require('@playwright/test');
const moment = require('moment');
const { timeToDecimal,SurgeryTime } = require('../../backend/calculations')

test.describe('SurgeryTime', () => {
   
    test('should calculate the correct time difference for valid inputs', async ({ page }) => {
        const start = moment('2024-03-31T08:00:00');
        const end = moment('2024-03-31T12:30:00');
        const element = { start: start, end: end };
        const result = await SurgeryTime(element)
        expect(result).toBe(4.5);
    });
});
