import { test, expect } from '@playwright/test';
import axios from 'axios';

test('DateSelector component - with existing date', async ({ page }) => {
    const existingDate = '2023-12-27';
    await page.goto('http://localhost:3000'); 
//    await page.waitForSelector('h2'); 

    const response = await axios.get(`http://localhost:3890/data/${existingDate}`);
    const data = response.data;

  const checktext=  await page.getByText(`Showing results for the date: ${existingDate}`);
  console.log("gggg",checktext);
  expect(checktext).toBeDefined()

    for (const room of Object.keys(data)) {
        if (room !== 'Monthlydata') {
            await expect(page).toHaveText(`Room ID ${room}`);
            await expect(page).toHaveText(`${data[room].DailyUtilization}%`);
            await expect(page).toHaveText(`${data[room].MonthlyAvgUtilization}%`);
        }
    }
});

//test('DateSelector component - with non-existing date', async ({ page }) => {

    const nonExistingDate = '2024-03-27';
    //await page.goto('http://localhost:3000');
    //await page.waitForSelector('h2'); 

   // const response = await axios.get(`http://localhost:3890/data/${nonExistingDate}`);
    const data = response.data;

    //await expect(page.locator('p')).toHaveText(`Showing results for the date: ${nonExistingDate}`);
   // await expect(page.locator('h1')).toHaveText(`No data available for the selected date: ${nonExistingDate}`);

//});
