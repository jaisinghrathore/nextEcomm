import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import NextLink  from "next/link"
import Image from "next/image"
import Typography from '@mui/material/MenuItem';
import {contextStore} from "../utils/Store"


 function BasicTableNotEditable({cartData}) {
     
  const{dispatch}=contextStore();


  const updateCartHandler = (item,quantity) => {
            dispatch({type:"CART_ADD_ITEM",payload:{...item,quantity}});
  }

  const deleteCartHandle = (item) => {
    dispatch({type:"DELETE_ADD_ITEM",payload:item});
  }


  return (
    <TableContainer component={Paper}>
    <h2 style={{padding:'0 0 0 20px',marginBottom:"4px"}}>Order Items.</h2>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Quantity</TableCell>
            <TableCell >Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                    <NextLink href={`/product/${row.slug}`}>
                        <Link>
                            <Image src={row.image} alt={row.name} width={50} height={50}></Image>
                        </Link>
                    </NextLink>
              </TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell>
              {/* select */}
                <Typography>{row.quantity}</Typography>
              </TableCell>
              <TableCell>{row.price}$</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(BasicTableNotEditable);