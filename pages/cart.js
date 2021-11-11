import React from 'react';
import {contextStore} from "../utils/Store";
import Layout from "../components/Layout"
import {Typography,Button,Link,Card,ListItem,List,Grid,Container} from '@mui/material';
import NextLink  from "next/link"
import BasicTable from "../components/CartTable"
import dynamic from "next/dynamic" // by this ye vala component client side hi chalaga... 
import {useRouter} from "next/router"

 function cartScreen() {
    const {state} = contextStore();
    const router = useRouter();
    const {cart} = state;
    const {cartItems} = cart;
    return (
        <>
        <Layout title="Shapping Cart">
            {
                cartItems.length === 0 ? 
                (
                <div>
                Cart is empty
                : <span style={{color:"#f0c000"}} ><NextLink href="/"  >Go Shopping.</NextLink></span>
                </div> 
                )
                :
                (
                    <>
                    <Container>
                <Grid container spacing={2} style={{padding:'40px'}}>

                    <Grid item xs={8}  >
                    {/* This is table */}
                        <BasicTable cartData={cartItems} /> 
                    </Grid>
                    <Grid item xs={4}  >
                        {/* small box */}
                    <Card variant="outlined" style={{marginLeft:"30px"}}>
                        <List>
                        <ListItem>
                        <Grid container>
                        <Grid item xs={12}><Typography variant="h1" style={{marginBottom:"0px"}}>Subtotal ({cartItems.reduce((a,c)=>a+c.quantity,0)} items):</Typography></Grid>
                        <Grid item xs={12}><Typography variant="h1" style={{marginTop:"4px"}}>${cartItems.reduce((a,c)=>a+c.price*c.quantity,0)}</Typography></Grid>
                        </Grid>
                        </ListItem>
                            <ListItem>
                            <Button onClick={()=>router.push('/shipping')} fullWidth color="primary" variant="contained" >CHECK OUT</Button>
                            </ListItem>
                        </List>
                    </Card>
                    </Grid>
                </Grid>
                </Container>
                    </>
                )
            }       
        </Layout>
        </>
    )
}


export default dynamic(()=>Promise.resolve(cartScreen),{ssr:false}); //server side nahi 