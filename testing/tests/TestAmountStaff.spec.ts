import { test, expect } from '@playwright/test';

test('Checks that valid values are obtained for crew quantity and crew average', async ({ page }) => {

    await page.goto('http://localhost:3000/');

    await page.getByLabel('Select a Date:').fill('2024-01-09');
    await page.waitForSelector('h3#AmountStaff');
    
    //Check the amount of staff
    const Text1 = await page.$eval('h3#AmountStaff', el => el.textContent);
    if (Text1 == null)
        throw new Error('Server error, no data received')
    const amountOfStaff = Text1.split(':')[1].trim();
    if (amountOfStaff != null) {
        expect(parseInt(amountOfStaff)).toBeGreaterThan(0);
        const number = parseFloat(amountOfStaff)
        expect(Number.isInteger(number)).toBeTruthy()
    }
    else {
        throw new Error('Server error, no data valid');
    }

    //Check the amount of AvgStaff
    await page.waitForSelector('h3#AmountStaffAvg');
    const text2 = await page.$eval('h3#AmountStaffAvg', el => el.textContent);
    if (text2 == null)
        throw new Error('Server error, no data received')
    const AmountStaffAvg = text2.split(':')[1].trim();
    if (AmountStaffAvg != null)
        expect(parseInt(AmountStaffAvg)).toBeGreaterThan(0);
    else {
        throw new Error('Server error, no data valid');
    }
});