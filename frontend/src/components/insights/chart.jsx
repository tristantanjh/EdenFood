import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import axios from 'axios';
import { useAuth } from "../../hooks/AuthProvider";

import Title from './Title';

export default function Chart() {
  const { user } = useAuth();
  const theme = useTheme();
  const [data, setData] = useState([]); // State to hold the sales data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getMonthlySaleReport', {
          params: { userId: user.id }
        });
        const dailySalesFromAPI = response.data;

        // Transforming the data from the API call to match the required format
        const formattedData = dailySalesFromAPI.map((totalSales, index) => ({
          dayOfMonth: index + 1, // Day of the month
          amount: totalSales // Total sales for the day
        }));

        setData(formattedData); // Set the state with the fetched data
      } catch (error) {
        console.error('Error fetching monthly sales report:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [user.id]); // Dependency array to ensure useEffect runs when user.id changes

  return (
    <React.Fragment>
      <Title style={{ color: '#013220' }}>Current Month Sales</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'dayOfMonth', // Use dayOfMonth as dataKey
              tickNumber: 10, // Adjust the number of ticks as needed
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          xAxisLabel="Day of Month"
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 100,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
