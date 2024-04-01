const { log } = require('console');
const moment = require('moment');

function Allcalculations(data, inputDate) {

    try {

        const selectedDate = moment(inputDate).format('DD-MM-YYYY');
        selectedDateMonth = selectedDate.substring(3, 10)

        //The main object where the data that will be returned to the client will be saved
        const roomsData = {};

        // Filter the received data so that the algorithm can only work on relevant data
        jsonSpesificDate = data.filter(element => moment(element.start).format('MM-YYYY') == selectedDateMonth);

        if (jsonSpesificDate.length == []) {
            return ("There is no data for the Frequested date")
        }

        jsonSpesificDate.forEach(element => {
            CalMonthlydata(element, roomsData, selectedDate)
            RoomOccupancy(element, roomsData, selectedDate)


        })

        //Going over the newly created data and summarizing the final data according to the calculation results
        let MonthlydataString = "Monthlydata"
        for (const room in roomsData) {
            if (room === MonthlydataString) {
                //Summary of the final monthly data after executing the data calculation function
                roomsData[MonthlydataString].AmountOfStaffPerDay = roomsData[MonthlydataString].AmountOfStaffPerDay.size;
                roomsData[MonthlydataString].AmountOfStaffPerMonth = roomsData[MonthlydataString].AmountOfStaffPerMonth;
                console.log(roomsData[MonthlydataString].AmountOfStaffPerDay.size);
                roomsData[MonthlydataString].AvgAmountOfStaffPerDay = roomsData[MonthlydataString].AmountOfStaffPerMonth.size / roomsData[MonthlydataString].MonthlyActivityDays.size;
            }
            else {
                roomsData[room].DailyUtilization = (roomsData[room].DailyUtilization) / 0.16;
                roomsData[room].MonthlyAvgUtilization = (roomsData[room].MonthlyAvgUtilization / roomsData[room].ActivityDays.size) / 0.16;
            }
        };
        if (roomsData[MonthlydataString].MonthlyActivityDays.has(selectedDate))
            return roomsData;
        else
            return ("There is no data for the Frequested date")
    }
    catch (error) {
        console.error('Error parsing JSON:', error);
    }
}

//functions

//A function that receives an analysis and returns how many hours it caught in which it was executed

function SurgeryTime(element) {
    element.start = moment(element.start);
    element.end  = moment(element.end);
    let sum = Math.abs(timeToDecimal(element.end.hours(), element.end.minutes()) - timeToDecimal(element.start.hours(), element.start.minutes()));
    return sum;
}


//function that makes a number from an hour
function timeToDecimal(hours, minutes) {
    return hours + (minutes / 60);
}

//Calculate staff data for the month and date
function CalMonthlydata(element, roomsData, selectedDate) {
    let MonthlydataString = "Monthlydata"
    if (!roomsData[MonthlydataString]) {
        roomsData[MonthlydataString] = {
            DailyUtilization: 0,
            MonthlyAvgUtilization: 0,
            AmountOfStaffPerDay: new Set(),
            AmountOfStaffPerMonth: new Set(),
            MonthlyActivityDays: new Set(),
            AvgAmountOfStaffPerDay: 0

        }
    }
    for (let staff of element.staff) {
        roomsData[MonthlydataString].AmountOfStaffPerMonth.add(staff)
        if (moment(element.start).format('DD-MM-YYYY') == selectedDate) {
            roomsData[MonthlydataString].AmountOfStaffPerDay.add(staff)
        }

    }
    roomsData[MonthlydataString].MonthlyAvgUtilization += SurgeryTime(element);
    roomsData[MonthlydataString].MonthlyActivityDays.add(moment(element.start).format('DD-MM-YYYY'))


}

//Daily and monthly average room occupancy calculation function
function RoomOccupancy(element, roomsData, selectedDate) {
    const roomId = element.room_id;
    if (!roomsData[roomId]) {
        roomsData[roomId] = {
            roomId: roomId,
            DailyUtilization: 0,
            MonthlyAvgUtilization: 0,
            ActivityDays: new Set()
        }
    }

    //Count activity days per month for a specific room for future calculation of average activity in the room
    roomsData[roomId].ActivityDays.add(moment(element.start).format('YYYY-MM-DD'));

    let surgeryTime = SurgeryTime(element)
    //to sum the room occupancy during the entire month
    roomsData[roomId].MonthlyAvgUtilization += surgeryTime;

    //Calculate the occupancy of the room on the specific date
    if (moment(element.start).format('DD-MM-YYYY') === selectedDate) {
        roomsData[roomId].DailyUtilization += surgeryTime;
    }
}

module.exports = { Allcalculations, CalMonthlydata, SurgeryTime, timeToDecimal, RoomOccupancy }
