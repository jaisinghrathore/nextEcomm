import React from 'react';
import Layout from "../components/Layout";
import {NativeSelect,Grid,Card,List,ListItem ,CardActionArea,CardMedia,CardContent,Button,Typography,CardActions,InputLabel ,MenuItem ,Select ,FormControl } from '@mui/material';
import NextLink from "next/link"
import db from "../utils/db"
import Product from "../models/product"
import axios from "axios"
import {contextStore} from "../utils/Store";
import {useRouter} from "next/router"
import {useSnackbar} from "notistack";
import CancelIcon from '@mui/icons-material/Cancel';
import Pagination from '@mui/material/Pagination';


export default function Home({products}) {
  
  const {state,dispatch} = contextStore();
  const{enqueueSnackbar,closeSnackbar}=useSnackbar();
  const Router = useRouter();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const addToCart = async(sluggy) => {
    const {data} = await axios.get(`http://localhost:3000/api/product/${sluggy}`);
    
    const existItem = state.cart.cartItems.find(x=>x.slug===sluggy);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if(data.countInStock < quantity) {
      enqueueSnackbar("Product out of Stock.",{variant:'error'})
      return;
  }

    dispatch({type:"CART_ADD_ITEM",payload:{...data,quantity}});
    Router.push("/cart");
}


  return (

    <Layout carouselShow='show'>
    
      <Grid container spacing={2} style={{marginTop:"0px"}}>
         <Grid item sm={3} >
         
         <List style={{position:"sticky",top:"30px"}} >
          
          <ListItem>
         
          <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          <b>Categories</b>
          </InputLabel>
  <NativeSelect
    defaultValue={10}
    inputProps={{
      name: 'age',
      id: 'uncontrolled-native',
    }}
  >
          <option value={10}>All</option>
          <option value={20}>Featured</option>
          <option value={30}>Price: Low to High</option>
          <option value={40}>Price: High to low</option>
          <option value={50}>Customer Reviews</option>
          <option value={60}>Newest Arrivals</option>
  </NativeSelect>
</FormControl>
                        
          </ListItem>

          <ListItem >
          <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          <b>Brands</b>
          </InputLabel>
  <NativeSelect
    defaultValue={10}
    inputProps={{
      name: 'age',
      id: 'uncontrolled-native',
    }}
  >
          <option value={10}>All</option>
          <option value={20}>Featured</option>
          <option value={30}>Price: Low to High</option>
          <option value={40}>Price: High to low</option>
          <option value={50}>Customer Reviews</option>
          <option value={60}>Newest Arrivals</option>
  </NativeSelect>
</FormControl>
          </ListItem>

          <ListItem >
          <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          <b>Prices</b>
          </InputLabel>
  <NativeSelect
    defaultValue={10}
    inputProps={{
      name: 'age',
      id: 'uncontrolled-native',
    }}
  >
          <option value={10}>All</option>
          <option value={20}>Featured</option>
          <option value={30}>Price: Low to High</option>
          <option value={40}>Price: High to low</option>
          <option value={50}>Customer Reviews</option>
          <option value={60}>Newest Arrivals</option>
  </NativeSelect>
</FormControl>
   
          </ListItem>

          <ListItem  
          fullWidth
          >
          <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
          <b>Ratings</b>
          </InputLabel>
  <NativeSelect
    defaultValue={10}
    inputProps={{
      name: 'age',
      id: 'uncontrolled-native',
    }}
  >
          <option value={10}>All</option>
          <option value={20}>Featured</option>
          <option value={30}>Price: Low to High</option>
          <option value={40}>Price: High to low</option>
          <option value={50}>Customer Reviews</option>
          <option value={60}>Newest Arrivals</option>
  </NativeSelect>
          </FormControl>
          </ListItem>
          </List>

         </Grid>


         <Grid item sm={9} container spacing={2} >
        
        <Grid item sm={12}>
        <Typography style={{float:"left",position:"relative",top:"30px"}}>6 Results: Shirts <CancelIcon style={{position:"relative",top:"5px",left:"4px"}}/></Typography>
            {/* short by items */}
            <Typography style={{float:"right"}}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label"><b>Short by</b></InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Featured</MenuItem>
          <MenuItem value={20}>Price: Low to High</MenuItem>
          <MenuItem value={30}>Price: High to low</MenuItem>
          <MenuItem value={30}>Customer Reviews</MenuItem>
          <MenuItem value={30}>Newest Arrivals</MenuItem>
        </Select>
      </FormControl>
       </Typography>
        </Grid>
      
         {
            products.map((product)=>(
                <Grid item md={4} key={product.image}>
                <Card>
        <NextLink href={`/product/${product.slug}`} passHref>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography >
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      </NextLink>
      <CardActions>
      <Typography mr={3} >
            ${product.price}
      </Typography>

        <Button size="small" color="primary" onClick={()=>addToCart(product.slug)} >        
          Add to cart
        </Button>
      </CardActions>
    </Card>
                </Grid>
            ))
          }
 
          <Pagination count={10} variant="outlined" shape="rounded" style={{marginTop:"16px"}} />
         </Grid>
      </Grid>
    </Layout>
  )
}


export async function getServerSideProps(){

  await db.connect();
  let products = await Product.find({}).lean(); //By lean ye js return kraga object kraga
  await db.disconnect();

  
  let product = products.map((doc,ind)=>{
    doc._id=doc._id.toString();
    doc.createdAt=doc.createdAt.toString();
    doc.updatedAt=doc.updatedAt.toString();  
    return doc;
  })

  // or
  // let product = products.map(db.convertoObj);
  

  return{
    props:{
      products:product
    }
  }
}