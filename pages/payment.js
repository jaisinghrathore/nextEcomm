import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import {contextStore} from '../utils/Store';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
  Grid
} from '@mui/material';
import { useSnackbar } from 'notistack';


export default function payment() {
    const { state, dispatch } = contextStore();
    const { cart:{shippingAddress,paymentMethod,cartItems} } = state;
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [paymentMethods,setPaymentMethod]=React.useState({});

    useEffect(() => {

        if(cartItems.length===0){
        router.push('/');
      };
      
        if(!state.userInfo){
          router.push('/');
        }
        if (!shippingAddress.address) {
          router.push('/shipping');
        } else {
          setPaymentMethod(paymentMethod);
        }
      }, []);


      const submitHandler = (e) => {
        closeSnackbar();
        e.preventDefault();
        if (!paymentMethods) {
          enqueueSnackbar('Payment method is required', { variant: 'error' });
        } else {
          dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethods });
          router.push('/placeorder');
        }
      };

    return (
        <Layout title="Payment Method">
        
        <Grid mt={5}>
        <CheckoutWizard activeStep={2} mt={2} />
        </Grid>
        
        <form onSubmit={submitHandler}>
          <Typography component="h1" variant="h1">
            Payment Method
          </Typography>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Payment Method"
                  name="paymentMethods"
                  value={paymentMethods}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label="PayPal"
                    value="PayPal"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button fullWidth type="submit" variant="contained" color="primary">
                Continue
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={() => router.push('/shipping')}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </form>
      </Layout>
    )
}
