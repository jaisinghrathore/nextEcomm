import React from 'react';
import {contextStore} from "../utils/Store";
import Layout from "../components/Layout"
import {Typography,Button,Link,Card,ListItem,List,Grid,Container} from '@mui/material';
import BasicTable from "../components/CartTable"
import CheckoutWizard from "../components/CheckoutWizard"
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from "next/dynamic" // by this ye vala component client side hi chalaga... 
import {useRouter} from "next/router"
import {useSnackbar} from "notistack";
import {getError} from "../utils/error"
import Cookies from 'js-cookie'
import axios from "axios"

 function placeorder() {
    const {state,dispatch} = contextStore();
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { userInfo,cart:{shippingAddress,cartItems,paymentMethod} } = state;
    const [loading,setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!shippingAddress.address) {
          router.push('/shipping');
        }
      }, []);

      React.useEffect(()=>{
        if(!state.userInfo) {
            router.push('/');
          };
          if(cartItems.length===0) {
            router.push('/');
        };    
 
      },[userInfo,cartItems])

      const totalPrice = cartItems.reduce((a,c)=>a+c.price*c.quantity,0);
      const taxPrice = cartItems.reduce((a,c)=>a+c.price*c.quantity+80,0);
      const shippingPrice = 40;
      
      const placeOrderHandler = async() => {
        closeSnackbar();
        try{
            setLoading(true);
            const { data } = await axios.post('/api/orders',{
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                shippingPrice,
                taxPrice,
                totalPrice
            },{
                headers: {
                  authorization: `Bearer ${userInfo.token}`,
                },
            });
            setLoading(false);
            router.push(`/order/${data._id}`);
            dispatch({type:'CART_CLEAR'});
            Cookies.remove('cartItems')
        }catch(err){
            setLoading(false);
            enqueueSnackbar(getError(err),{ variant: 'error' });
        }
      }


    return (
        <>
        <Layout title="Place Order">
                    <Container>
                  
                <Grid mt={5}>
                <CheckoutWizard activeStep={3} mt={3} />
                </Grid>

                <Grid container spacing={2} style={{padding:'40px'}}>

                    <Grid item xs={8}  >
                    
                    {/*Shipping*/}
                    <Card variant="outlined" style={{marginBottom:"20px"}} >
                        <List>
                        <ListItem>
                            <h2 style={{padding:'0 0 0 4px',margin:" 4px 0 4px 0"}}>Shipping Address</h2>
                        </ListItem>

                        <ListItem>
                            {shippingAddress.fullName}, {shippingAddress.address},{' '}
                            {shippingAddress.city}, {shippingAddress.postalcode},{' '}
                            {shippingAddress.landmark}.
                        </ListItem>

                        </List>
                    </Card>

                        {/*Payment Method*/}
                        <Card variant="outlined" style={{marginBottom:"20px"}} >
                        <List>
                        <ListItem>
                            <h2 style={{padding:'0 0 0 4px',margin:" 4px 0 4px 0"}}>Payment Method</h2>
                        </ListItem>

                        <ListItem>
                        {paymentMethod}
                        </ListItem>

                        </List>
                    </Card>

                    {/* This is table */}
                    <Card variant="outlined" style={{marginBottom:"20px"}} >
                        <BasicTable cartData={cartItems} />
                    </Card>

                    </Grid>
                    <Grid item xs={4}  >
                        {/* small box */}
                    <Card variant="outlined" style={{marginLeft:"30px"}}>
                        <List>
                        <ListItem>
                        <Grid container>
                        <Grid item xs={12}><Typography variant="h1" style={{margin:"14px 0 20px 0"}}>Order Summary</Typography></Grid>
                        <Grid item xs={12}><Typography style={{marginTop:"4px"}}> Items: <span style={{float:'right'}}>${totalPrice}</span></Typography></Grid>
                        <Grid item xs={12}><Typography style={{marginTop:"4px"}}> Tax: <span style={{float:'right'}}>$80</span></Typography></Grid>
                        <Grid item xs={12}><Typography style={{marginTop:"4px"}}> Shipping: <span style={{float:'right'}}>$0</span></Typography></Grid>
                        <Grid item xs={12}><Typography style={{marginTop:"4px"}}> Total: <span style={{float:'right'}}>${taxPrice}</span></Typography></Grid>
                        </Grid>
                        </ListItem>
                            <ListItem>
                            <Button onClick={placeOrderHandler} fullWidth color="primary" variant="contained" >PLACE ORDER</Button>
                            </ListItem>
                            {loading && (
                                <ListItem>
                                <CircularProgress />
                                </ListItem>
                            )}
                        </List>
                    </Card>
                    </Grid>
                </Grid>
                </Container>
        </Layout>
        </>
    )
}


export default dynamic(()=>Promise.resolve(placeorder),{ssr:false}); //server side nahi 