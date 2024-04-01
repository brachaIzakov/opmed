import { test, expect } from '@playwright/test';
import axios from 'axios';

test('DateSelector component - with existing date', async ({ page }) => {
    const existingDate = '2023-12-27';
    await page.goto('http://localhost:3000');

    const response = await axios.get(`http://localhost:3890/data/${existingDate}`);
    const data = response.data;

    const checktext = await page.getByText(`Showing results for the date: ${existingDate}`);
    expect(checktext).toBeDefined()

    for (const room of Object.keys(data)) {
        if (room !== 'Monthlydata') {
            const checktext = await page.getByText(`Room ID`);
            expect(checktext).toBeDefined()
            const checktext2 = await page.getByText(`{room}`);
            expect(checktext2).toBeDefined()
        }
    }
});

test('DateSelector component - with non-existing date', async ({ page }) => {

    const nonExistingDate = '2024-03-27';
    await page.goto('http://localhost:3000');


    const response = await axios.get(`http://localhost:3890/data/${nonExistingDate}`);
    const data = response.data;

    const checktext1 = await page.getByText(`Showing results for the date: ${nonExistingDate}`);
    expect(checktext1).toBeDefined()
    const checktext2 = await page.getByText(`No data available for the selected date`);
    expect(checktext2).toBeDefined()

});
