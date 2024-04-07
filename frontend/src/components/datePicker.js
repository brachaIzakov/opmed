import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const DateSelector = () => {

  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const GetDataByDate = async (date) => {

    try {
      setSelectedDate(date)
      console.log(selectedDate);
      const response = await axios.get(`http://localhost:3890/data/${date}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <div
        style={{ display: 'flex', flexDirection: 'column', margin: '50px' }}>
        <label htmlFor='#date'>Select a Date:</label>
        <input style={{ width: '10%', margin: '20px 45%', height: '50px', }}
          className="item" type="date" id="#date" name="date" onChange={date => {GetDataByDate(date.target.value); }} />
      </div>
      {
        selectedDate && (
          <><label>Showing results for the date:{selectedDate}</label>
            {typeof data === 'string' ? <h1 id='noData-text'>There is no data for the Frequested date</h1> :
              <>
                {

                  data && typeof data !== 'string' && (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0 27%' }}>
                      <h3 style={{ padding: "15px" }} id='AmountStaff'>{`Amount of staff  :${data['Monthlydata'].AmountOfStaffPerDay}`}</h3>
                      <h3 style={{ padding: "15px" }} id='AmountStaffAvg' >{`avg Amount of staff :${data['Monthlydata'].AvgAmountOfStaffPerDay}`}</h3>
                    </div>
                  )}

                <div id="table">
                  <table style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%', padding: '10px', marginTop: '15px' }}>
                    <thead>
                      <tr>
                        <th>Room ID</th>
                        <th>Daily Usage Percentage</th>
                        <th>Average Monthly Usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && Object.keys(data).map((room) => {
                        if (room !== 'Monthlydata') {
                          return (
                            <tr style={{border: '1px solid black'}}key={room}>
                              <td  style={{ color: "blue", textAlign: 'center' ,border: '1px solid black' }}>{room}</td>
                              <td id="DailyUsage" style={{ textAlign: 'center',border: '1px solid black' }}>{data[room].DailyUtilization}%</td>
                              <td id='AvgUsage'style={{ textAlign: 'center',border: '1px solid black' }}>{data[room].MonthlyAvgUtilization}%</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            }</>)}
    </div>

  );
};

export default DateSelector;

