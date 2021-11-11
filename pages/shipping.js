import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
  } from '@mui/material';
  import { useRouter } from 'next/router';
  import NextLink from 'next/link';
  import React, {  useEffect } from 'react';
  import {contextStore} from "../utils/Store";
  import Layout from '../components/Layout';
  import Cookies from 'js-cookie';
  import { Controller, useForm } from 'react-hook-form';
  import CheckoutWizard from "../components/CheckoutWizard"
  
  export default function Shipping() {

    const {handleSubmit,control,formState: { errors },setValue} = useForm();
    const router = useRouter();
    const { state, dispatch } = contextStore();
    const { userInfo,cart:{shippingAddress,cartItems} } = state;


    useEffect(() => {
      
      if (!userInfo) {
        router.push('/login?redirect=/shipping');
      }
      
    },[userInfo]);

    useEffect(() => {
              
      if(cartItems.length===0){
        router.push('/');
      };

      setValue('fullName',shippingAddress.fullName);
      setValue('address',shippingAddress.address);
      setValue('city',shippingAddress.city);
      setValue('postalcode',shippingAddress.postalcode);
      setValue('landmark',shippingAddress.landmark);
    }, []);
  
    const submitHandler = ({ fullName,address,city,postalcode,landmark }) => {
        dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: { fullName,address,city,postalcode,landmark } });
        Cookies.set('shippingAddress', { fullName,address,city,postalcode,landmark });
        router.push('/payment');
      
    };

    if (!userInfo) {
      return '';
    }
    
    return (
      <Layout title="Shipping">
        
        <Grid mt={5}>
        <CheckoutWizard activeStep={1} mt={3} />
        </Grid>
        
        <form onSubmit={handleSubmit(submitHandler)}>

          <List>
          <ListItem>
                <Typography component="h1" variant="h1">
                    Shipping Address
                </Typography>
            </ListItem>
          <ListItem>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === 'minLength'
                          ? 'Full Name length is more than 1'
                          : 'Full Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Address"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === 'minLength'
                          ? 'Address length is more than 1'
                          : 'Address is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="City"
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === 'minLength'
                          ? 'City length is more than 1'
                          : 'City is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="postalcode"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="postalcode"
                    label="Postalcode"
                    error={Boolean(errors.postalcode)}
                    helperText={
                      errors.postalcode
                        ? errors.postalcode.type === 'minLength'
                          ? 'postalcode length is more than 1'
                          : 'postalcode is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="landmark"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="landmark"
                    label="Landmark"
                    error={Boolean(errors.landmark)}
                    helperText={
                      errors.landmark
                        ? errors.landmark.type === 'minLength'
                          ? 'Landmark length is more than 1'
                          : 'Landmark is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Proceed
            </Button>
          </ListItem>
          </List>
        </form>
      </Layout>
    );
  }