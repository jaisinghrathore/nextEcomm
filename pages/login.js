import * as React from 'react';
import Layout from "../components/Layout";
import {Button,TextField,List,ListItem,Typography,Link} from '@mui/material';
import NextLink from "next/link"
import axios from "axios"
import {contextStore} from "../utils/Store";
import {useRouter} from "next/router"
import Cookies from 'js-cookie'; 
import {useSnackbar} from "notistack";
import { Controller, useForm } from 'react-hook-form';

export default function login() {

    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const router = useRouter();
      const { redirect } = router.query; // login?redirect=/shipping
      const { state, dispatch } = contextStore();
      const { userInfo } = state;
      React.useEffect(() => {
        if (userInfo) {
          router.push('/');
        }
      }, []);

    const submitHandler = async ({ email, password }) => {
        closeSnackbar();
        try {
          const { data } = await axios.post('/api/users/login', {
            email,
            password,
          });
          dispatch({ type: 'USER_LOGIN', payload: data });
          Cookies.set('userInfo', data);
          router.push(redirect || '/');
        } catch (e) {
          enqueueSnackbar(e.response.data ? e.response.data.message : e.message, { variant: 'error' })
        }
      };

    return (
        <Layout title="Login">
        <form onSubmit={handleSubmit(submitHandler)} >
        <List>
            <ListItem>
                <Typography component="h1" variant="h1">
                Login
                </Typography>
            </ListItem>

          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email is not valid'
                        : 'Email is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
        </Layout>
      );
}