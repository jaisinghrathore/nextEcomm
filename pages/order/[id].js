import React from 'react';
import {contextStore} from "../../utils/Store";
import Layout from "../../components/Layout"
import {Typography,Button,Link,Card,ListItem,List,Grid,Container} from '@mui/material';
import BasicTableNotEditable from "../../components/BasicTableNotEditable"
import dynamic from "next/dynamic" // by this ye vala component client side hi chalaga. 
import {useRouter} from "next/router"
import {getError} from "../../utils/error"
import axios from "axios"
import CircularProgress from '@mui/material/CircularProgress';


    function reducer(state,action){
        switch(action.type) {
            case 'FETCH_REQUEST' : 
            return {...state, loading:true,error:""}
            case "FETCH_SUCCESS" : 
            return {...state,loading:false,order:action.payload,error:""}
            case "FETCH_ERROR" : 
            return {...state,loading:false,error:action.payload}
            default: return state;
        }
    }


 function getOrderrrr({params}) {
    const orderId = params.id;
    const {state} = contextStore();
    const router = useRouter();
    const { userInfo } = state;

    const [{loading, error, order }, dispatch] = React.useReducer(reducer,{
        loading:true,
        order:{},
        error:""
    })
 
    React.useEffect(() => {
        if(!userInfo){
            router.push('/login')
        }

        const fetchOrder = async () => {
            try{
                dispatch({type:'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/orders/${orderId}`,{
                    headers : {authorization:`Bearer ${userInfo.token}`}
                });
                dispatch({type:'FETCH_SUCCESS',payload:data});
            }catch(err){
                dispatch({type:'FETCH_ERROR',payload:getError(err)});
            }
        };
            fetchOrder();
    },[])
      

    return (
        <>
        <Layout title={`Order ${orderId}`}>
                    <Container>
                  
            {loading?(<CircularProgress/>)
                : error ? <Typography>{error}</Typography> 
                :
                <Grid container spacing={2} style={{padding:'40px'}}>
                    <Grid item xs={8}  >
                <Typography style={{textDecoration: 'underline'}} component='h1' variant='h1' >Order {orderId}</Typography>
                    {/*Shipping*/}
                    <Card variant="outlined" style={{marginBottom:"20px"}} >
                        <List>
                        <ListItem>
                            <h2 style={{padding:'0 0 0 4px',margin:" 4px 0 4px 0"}}>Shipping Address</h2>
                        </ListItem>

                        <ListItem>
                            {order.shippingAddress.fullName}, {order.shippingAddress.address},{' '}
                            {order.shippingAddress.city}, {order.shippingAddress.postalcode},{' '}
                            {order.shippingAddress.landmark}.
                        </ListItem>

                        <ListItem>
                            Status: {order.isDelivered ? `delivered at ${order.deliveredAt}` : "not delivered"}
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
                        {order.paymentMethod}
                        </ListItem>

                        <ListItem>
                            Status: {order.isPaid ? `delivered at ${order.paidAt}` : "not paid"}
                        </ListItem>

                        </List>
                    </Card>

                    {/* This is table */}
                    <Card variant="outlined" style={{marginBottom:"20px"}} >
                        <BasicTableNotEditable cartData={order.orderItems} />
                    </Card>

                    </Grid>
                    <Grid item xs={4}  >
                        {/* small box */}
                    <Card variant="outlined" style={{marginLeft:"30px"}}>
                        <List>
                        <ListItem>
                        <Grid container>
                        <Grid item xs={12}><Typography variant="h1" style={{margin:"14px 0 20px 0"}}>Order Summary</Typography></Grid>
                        <Grid item xs={12}><Typography style={{marginTop:"4px"}}> Items: <span style={{float:'right'}}>${order.totalPrice}</span></Typography></Grid>
                        <Grid item xs={12}><Typography style={{marginTop:"4px"}}> Tax: <span style={{float:'right'}}>${order.taxPrice}</span></Typography></Grid>
                        <Grid item xs={12}><Typography style={{marginTop:"4px"}}> Shipping: <span style={{float:'right'}}>${order.shippingPrice}</span></Typography></Grid>
                        <Grid item xs={12}><Typography style={{marginTop:"4px"}}> Total: <span style={{float:'right'}}>${order.totalPrice}</span></Typography></Grid>
                        </Grid>
                        </ListItem>
                        </List>
                    </Card>
                    </Grid>
                </Grid>
            }

                


                
                </Container>
        </Layout>
        </>
    )
}



export default getOrderrrr;

export async function getServerSideProps({params}){
    return{
        props:{params}
    }
}

