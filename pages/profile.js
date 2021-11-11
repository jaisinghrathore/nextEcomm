import React from 'react';
import Layout from '../components/Layout'
import {Card,Grid,TableContainer,Table,TableBody,Button,TableRow,Typography,List,TextField,ListItem} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {useSnackbar} from "notistack";
import {contextStore} from "../utils/Store";
import Cookies from 'js-cookie';
import axios from 'axios';
import {useRouter} from "next/router";

export default function profile() {
    const {handleSubmit,control,formState: { errors },setValue} = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state,dispatch } = contextStore();

    const router = useRouter();

    React.useEffect(()=>{
      setValue('name',state.userInfo.name);
      setValue('email',state.userInfo.email);
    }, []);
  
    React.useEffect(()=>{
        if (!state.userInfo) {
            router.push('/login');
          }
    },[state.userInfo])

    const submitHandler =async ({ name,email,password,confirmPassword }) => {
        closeSnackbar();
        if(password !== confirmPassword){
            enqueueSnackbar("Password don't match.",{ variant: 'error'})
            return;
        };

        try{
            const {data} = await axios.put('/api/users/profile',{
                name,
                email,
                password
            },
            {headers:{authorization:`Bearer ${state.userInfo.token}`}}
            );
            dispatch({type:"USER_LOGIN",payload:data});
            Cookies.set('userInfo', data);
            router.push('/');
        }catch(err){
            enqueueSnackbar(

                err.response.data ? err.response.data.message : err.message,
                {variant: 'error'}
            )
        }
      
    };

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      }));

      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    return (
        <>
        <Layout>
                   <Grid container spacing={1} style={{padding:"60px 0 0 0"}} >
                   <Grid item sm={4} style={{display: 'flex',justifyContent:"flex-end"}} >
                      <Card  style={{width:"300px",alignSelf:"start"}}>
                   <TableContainer >
      <Table aria-label="customized table" style={{width:"300px"}}>
        <TableBody>
        <StyledTableRow>
          <StyledTableCell onClick={()=>router.push("/profile")} style={{cursor:"pointer"}} align="left">User Profile</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
          <StyledTableCell onClick={()=>router.push("/order-history")} style={{cursor:"pointer"}} align="left">Order History</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </Card>
                   </Grid>
                   <Grid item sm={8} >
                      <Card style={{padding:"10px 15px 15px 15px"}} >
                          <Typography component="h1" variant="h1" style={{padding:"0 0 0 30px",marginBottom:"0"}}>Profile</Typography>
                          <form onSubmit={handleSubmit(submitHandler)}>

<List>

  <ListItem>
    <Controller
      name="name"
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
          id="name"
          size="small"
          label="Name"
          error={Boolean(errors.name)}
          helperText={
            errors.name
              ? errors.name.type === 'minLength'
                ? 'Name length is more than 1'
                : 'Name is required'
              : ''
          }
          {...field}
        ></TextField>
      )}
    ></Controller>
  </ListItem>

  <ListItem>
    <Controller
      name="email"
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
          id="email"
          label="Email"
          size="small"
          error={Boolean(errors.email)}
          helperText={
            errors.email
              ? errors.email.type === 'minLength'
                ? 'Email length is more than 1'
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
      render={({ field }) => (
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          id="password"
          type="password"
          label="Password"
          error={Boolean(errors.password)}
          {...field}
        ></TextField>
      )}
    ></Controller>
  </ListItem>


<ListItem>
    <Controller
      name="confirmPassword"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          variant="outlined"
          fullWidth
          id="confirmPassword"
          size="small"
          type="password"
          label="Confirm Password"
          error={Boolean(errors.fullName)}
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
                      </Card>
                   </Grid>
                   </Grid>
        </Layout>
        </>
    )
}
