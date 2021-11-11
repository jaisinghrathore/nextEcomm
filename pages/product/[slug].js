import React from 'react';
import { useRouter } from "next/router";
import {data} from "../../utils/data";
import Layout from "../../components/Layout"
import NextLink from "next/link"
import Image from "next/image"
import {Grid,Link,List,ListItem,Typography,CardActions,Card,CardContent,Button} from '@mui/material';
import db from "../../utils/db";
import Product from "../../models/product"
import axios from "axios";
import {contextStore} from "../../utils/Store";
import {useSnackbar} from "notistack";


export default function slug({product}) {

    const{state,dispatch}=contextStore();
    const{enqueueSnackbar,closeSnackbar}=useSnackbar();


    const Router = useRouter();

    if(!product){
        return <p>Loading....</p>;
        }
    

        const addToCart = async() => {
            closeSnackbar();
            const {data} = await axios.get(`http://localhost:3000/api/product/${product.slug}`);
            
            const existItem = state.cart.cartItems.find(x=>x.slug===product.slug);
            const quantity = existItem ? existItem.quantity + 1 : 1;

            if(data.countInStock < quantity) {
                enqueueSnackbar("Product out of Stock.",{variant:'error'})
                return;
            }


            dispatch({type:"CART_ADD_ITEM",payload:{...data,quantity}});
            Router.push("/cart");
        }
    return (
        <Layout title={product.name}>
            <div style={{margin:"10px"}} >
                <NextLink href='/' passHref>
                    <Link >Back to Products.</Link>
                </NextLink>
            </div>
            <Grid container spacing={1}>
            <Grid item md={6} xs={12} >
                    <div style={{height:"400px",width:"500px",overflow:"hidden"}}>
                    <Image src={product.image} alt={product.name} width={'100'} height={'100'} layout="responsive"></Image>
                    </div>
            </Grid>


            <Grid container md={6} xs={12} >
            <Grid item md={6} xs={12} >
                    
                    <List>
                    <Typography variant="h1" component="h1">{product.name}</Typography>
                    <ListItem ><b>Category: {product.category}</b></ListItem>
                    <ListItem><b>Brand: {product.brand}</b></ListItem>
                    <ListItem><b>Rating: {product.rating}</b></ListItem>
                    <ListItem><b>Category: {product.category} stars ({product.numReview}) reviews</b></ListItem>
                    <ListItem>
                    </ListItem>
                    </List>

                </Grid>


                <Grid item md={6} xs={12} >
                    <Card variant="outlined">
                        <List>
                        <ListItem>
                            <Grid container>
                            <Grid item xs={6} >
                                    <Typography><b>Price</b></Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography><b>${product.price}</b></Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography><b>Status</b></Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography><b>{product.countInStock>0?'In stock':'Unavailable'}</b></Typography>
                                </Grid>
                                
                            </Grid>
                            </ListItem>
                            <ListItem>
                            <Button fullWidth color="primary" variant="contained" onClick={addToCart} >Add To Cart</Button>
                            </ListItem>
                        </List>
                    </Card>                    
                </Grid>
                <Typography> 
                    <b>Description: {product.description}</b>
                    </Typography>
                </Grid>

            </Grid>
        </Layout>
    )
}


export async function getServerSideProps({params}){

    const {slug} = params;

    await db.connect();

    let product = await Product.findOne({slug}).lean(); //By lean ye js return kraga object kraga
    await db.disconnect();


    let Singleproduct = db.convertoObj(product);
    
  
    return{
      props:{
        product:Singleproduct
      }
    }
  }