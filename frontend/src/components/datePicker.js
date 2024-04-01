import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const DateSelector = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const GetDataByDate = async (date) => {

    try {

      const response = await axios.get(`http://localhost:3890/data/${date}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <h2>Select a Date:</h2>
      <DatePicker selected={selectedDate} onChange={date => { setSelectedDate(date); GetDataByDate(date); }} />
      {
        selectedDate && (
          <><p>Showing results for the date:  {selectedDate.toLocaleDateString()}</p>
            {typeof data === 'string' ? <h1>{data}</h1> :
              <>
                {

                  data && typeof data !== 'string' && (
                    <div style={{display:'flex' , flexDirection:'row' , justifyContent:'space-between', margin:'0 27%'} }>
                      <h3 style={{border:"solid 1.5px", padding:"15px"}}>Amount of staff  :{data['Monthlydata'].AmountOfStaffPerDay}</h3>
                      <h3 style={{border:"solid 1.5px", padding:"15px"}} >avg Amount of staff  :{data['Monthlydata'].AvgAmountOfStaffPerDay}</h3>
                    </div>
                  )}

                <TableContainer component={Paper}>
                  <Table style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%', padding: '10px', marginTop: '15px' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Room ID</b></TableCell>
                        <TableCell><b>Daily Usage Percentage</b></TableCell>
                        <TableCell><b>Average Monthly Usage</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data && Object.keys(data).map((room) => {
                        if (room !== 'Monthlydata') {
                          return (
                            <TableRow key={room}>
                              <TableCell style={{ color: "blue", align: 'center' }}>{room}</TableCell>
                              <TableCell style={{ align: 'center' }}>{data[room].DailyUtilization}%</TableCell>
                              <TableCell style={{ align: 'center' }}>{data[room].MonthlyAvgUtilization}%</TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </TableContainer></>

            }</>)}
    </div>
  );
};

export default DateSelector;

