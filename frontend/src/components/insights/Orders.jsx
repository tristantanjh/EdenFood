import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useAuth } from "../../hooks/AuthProvider";

// Generate Order Data
function createData(id, date, name, quantity, amount) {
  const formattedDate = new Date(date).toISOString().split('T')[0];
  return { id, date: formattedDate, name, quantity, amount };
}

const Orders = () => {
  const [rows, setRows] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
         //const response = await axios.get('http://localhost:3000/getAllSales');
        const response = await axios.get('http://localhost:3000/getSalesByUserId', {
          params: { userId: user.id }
        });
        const sales = response.data;
        let count = 0;
        const formattedRows = sales.map(sale => {
          const rowData = createData(
            count,
            sale.createdAt,
            sale.items[0].grocery.name,
            sale.items[0].quantity,
            sale.totalPrice
          );
          count++;
          return rowData;
        });
        setRows(formattedRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Grocery Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Orders;