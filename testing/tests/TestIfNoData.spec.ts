
import { test, expect } from '@playwright/test';

test('Checks that an appropriate message appears if there is no data', async ({ page }) => {
    
    await page.goto('http://localhost:3000/');

    await page.getByLabel('Select a Date:').fill('2024-04-07');
    await page.waitForSelector('h1#noData-text');
    const Text1 = await page.$eval('h1#noData-text', el => el.textContent);
    expect(Text1).toContain('There is no data for the Frequested date');

});

