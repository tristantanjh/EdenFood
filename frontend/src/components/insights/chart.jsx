import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';

import Title from './Title';

// Generate Sales Data
// Generate Sales Data
function createData(dayOfMonth, amount) {
  return { dayOfMonth, amount: amount ?? null };
}

// Assuming 30 days in a month for demonstration purposes
const daysOfMonth = Array.from({ length: 30 }, (_, i) => i + 1); // Generate array [1, 2, ..., 30]
const data = daysOfMonth.map(day => createData(day, Math.random() * 2500)); // Generate random sales data for each day

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Current Month Sales</Title>
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
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 3000,
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