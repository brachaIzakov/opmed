const { test, expect } = require('@playwright/test');
const moment = require('moment');
import { RoomOccupancy } from "../../backend/calculations";

test('RoomOccupancy should update roomsData correctly', () => {

    const element = {
        room_id: 'room1',
        start: '2024-03-31T08:00:00',
        end: '2024-03-31T10:00:00'
    };
    const roomsData = {};
    const selectedDate = '2024-03-31';

    RoomOccupancy(element, roomsData, selectedDate);

    expect(roomsData).toHaveProperty('room1');
    expect(roomsData['room1'].ActivityDays.size).toBe(1);
    expect(roomsData['room1'].MonthlyAvgUtilization).toBe(2);
    expect(roomsData['room1'].DailyUtilization).toBe(0);
});
