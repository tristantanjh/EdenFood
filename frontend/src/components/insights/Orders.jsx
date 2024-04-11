import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useAuth } from "../../hooks/AuthProvider";
import axios from 'axios';

// Generate Order Data
function createData( id, date, name, quantity, amount) {
  const formattedDate = new Date(date).toISOString().split('T')[0];
  return {  id, date: formattedDate, name, quantity, amount };
}

const Orders = () => {
  const [rows, setRows] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getSalesByUserId', {
          params: {
            userId: user.id
          }
        });
        const sales = response.data;
        
        const fetchedRows = await Promise.all(sales.map(async (sale, index) => {
          console.log(sale.items[0].grocery);
          try {
            const groceryResponse = await axios.get(`http://localhost:3000/getListingByGroceryId`, {
              params: {
                groceryId: sale.items[0].grocery
              }
            });
            const groceryData = groceryResponse.data;
            console.log(groceryData);
            const rowData = createData(
              index,
              sale.createdAt,
              groceryData.name || 'Unknown', // Handle cases where name is missing
              sale.items[0].quantity,
              sale.totalPrice
            );
            return rowData;
          } catch (error) {
            console.error('Error fetching grocery data:', error);
            return null; // Return null in case of error
          }
        }));
    
        const filteredRows = fetchedRows.filter(row => row !== null);
    
        console.log(filteredRows);
        setRows(filteredRows);
      } catch (error) {
        console.error('Error fetching data:', error);
        setRows([]); // Reset rows to an empty array in case of error
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
