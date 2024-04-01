const { CalMonthlydata } = require('../../backend/calculations');
const { test, expect } = require('@playwright/test');
const moment = require('moment');

test('CalMonthlydata function', async () => {
  const element = {
    start: '2023-12-27',
    staff: ['staff1', 'staff2', 'staff3'] 
  };
  const roomsData = {};
  let selectedDate = '27-12-2023';


  CalMonthlydata(element, roomsData, selectedDate);

 
  const MonthlydataString = "Monthlydata";
  expect(roomsData[MonthlydataString]).toBeDefined(); 
  expect(roomsData[MonthlydataString].AmountOfStaffPerDay.size).toBe(3);
  expect(roomsData[MonthlydataString].AmountOfStaffPerMonth.size).toBe(3);
  expect(roomsData[MonthlydataString].AvgAmountOfStaffPerDay).toBe(0);
  expect(roomsData[MonthlydataString].MonthlyActivityDays.size).toBe(1);
});