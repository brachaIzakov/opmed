import { test, expect } from '@playwright/test';

test('Checks the correctness of the room occupancy results when data is available', async ({ page }) => {

    await page.goto('http://localhost:3000/');
    
    await page.getByLabel('Select a Date:').fill('2024-01-09');
    await page.waitForSelector('h3#AmountStaffAvg')
    await page.waitForSelector('#table');

    const AllDailyUsage = await page.$$eval('td#DailyUsage', cells => cells.map(cell => cell.textContent));

    for (const numberString of AllDailyUsage) {
        //Checks if a value is returned and not empty
        if (numberString != null) {
            //Convert the text to a number
            const number = parseFloat(numberString.replace('%', ''));
            expect(number).toBeGreaterThanOrEqual(0);
            expect(number).toBeLessThanOrEqual(100);
        }
        else {
            throw new Error('no data valid')
        }
    }
    const AllAvgUsage = await page.$$eval('td#AvgUsage', cells => cells.map(cell => cell.textContent));

    for (const numberString of AllAvgUsage) {
        //Checks if a value is returned and not empty
        if (numberString != null) {
            //Convert the text to a number
            const number = parseFloat(numberString.replace('%', ''));
            expect(number).toBeGreaterThanOrEqual(0);
            expect(number).toBeLessThanOrEqual(100);
        }
        else {
            throw new Error('no data valid')
        }
    }

})