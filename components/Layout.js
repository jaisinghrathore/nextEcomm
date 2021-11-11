import React from 'react'
import Head from "next/head"
import {AppBar,Toolbar,IconButton,Menu,Grid ,MenuItem,TextField,Badge,Avatar,Typography,Container,CssBaseline,Link,createTheme,ThemeProvider,Switch,Button,Paper } from '@mui/material';
import NextLink from "next/link"
import {contextStore} from "../utils/Store"
import Cookies from 'js-cookie'; 
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import SearchIcon from '@mui/icons-material/Search';
import {useRouter} from "next/router";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      padding: '0 4px',
    },
  }));

export default function Layout({children,title,carouselShow}) {
    const {dispatch,state} = contextStore();

    const[init,upda]=React.useState(state.darkmode);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const router = useRouter();

    React.useEffect(()=>{
        upda(!state.darkmode);
    },[state.darkmode])

    const theme = createTheme({
        typography : {
            h1: {
                fontSize: '1.6rem',
                fontWeight:"400",
                margin:'1rem 0'
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight:"400",
                margin:'1rem 0'
            }
        },
        palette: {
            mode:init?"light":"dark",
            primary:{
                main:"#f0c000"
            },
            secondary:{
                main:"#208080"
            }
        }
    });

    const styles = {
        navbar : {
            backgroundColor : "#203040",
              },
        main : {
            minHeight : '80vh'
        }      
    }

    const darkModeStateChange = () =>{
        dispatch({type:!init?'Dark_Mode_Off':'Dark_Mode_On'});
        const newDarkMode = init;

        Cookies.set("darkmode",newDarkMode? "ON":'OFF');
    }

    const handleClose = () => {
        setAnchorEl(null);
      };

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const logoutHandle = () => {
        dispatch({type:'USER_LOGOUT'})
        Cookies.remove('userInfo');
      }


    return (
        <>
        {/* head */}
            <Head>
                <title>{title?title:"Next Amazon"}</title>
            </Head>
        {/* head */}
            <ThemeProvider theme={theme}>

            <CssBaseline/>      {/* important for dark mode work as paper */}

            {/* ṆavBar */}
                <AppBar position="static"  style={{...styles.navbar,padding:"6px 100px",borderRadius:"0 0 20px 20px"}} >
                <Container>
                <Toolbar>
                <NextLink passHref href="/"><Link id="link"><Typography>Project</Typography></Link></NextLink>
        
                {/* <TextField
                style={{backgroundColor:"white",borderRadius:"10px",overflow:"hidden",border:"none",marginLeft:"60px",position:"relative"}}
        id="input-with-icon-textfield"
          size="small"
        placeholder="Search"
        color="info"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"  style={{marginLeft:"60px",position: "absolute",right:"10px",top:"20px",color:"black"}}>
              <SearchIcon style={{cursor:"pointer",color:"black"}}/>
            </InputAdornment>
          ),
        }}
        variant="outlined"
      /> */}
            
            <Grid style={{position:"relative"}} >
                <input placeholder="Search" type="text" style={{width:"500px",marginLeft:"40px",height:"36px",borderRadius:'6px',border:"none",padding:"0 40px 0 10px"}} />
                <SearchIcon style={{cursor:"pointer",color:"black",position:"absolute",right:"10px",top:"50%",transform:"translate(0,-50%)"}}/>
            </Grid>



                <div style={{flexGrow: 10}}></div>
                
                {
                    state.userInfo ? 
                    (
                        <>
                        <Link
                         mr={4} ml={3} 
                         onClick={(e)=>e.preventDefault()}
                        >
                        <Button
                         id="basic-button"
                         aria-controls="basic-menu"
                         aria-haspopup="true"
                         aria-expanded={open ? 'true' : undefined}
                         onClick={handleClick}
                         style={{color:"white"}} 
                         >
                        <Avatar 
                         sx={{ bgcolor: "#208080"}} variant="rounded" style={{boxShadow:"1px 1px 1px 1px grey",color:"white"}} >{state.userInfo.name.slice(0,1)}</Avatar>
                        </Button>
                    </Link>


                    <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    >
                        <MenuItem style={{textAlign: 'center'}}>{state.userInfo.name}</MenuItem>
                        <hr/>
                        <MenuItem onClick={()=>router.push("/profile")}>Profile</MenuItem>
                        <MenuItem onClick={()=>router.push("/order-history")}>My orders</MenuItem>
                        <MenuItem onClick={logoutHandle}>Logout</MenuItem>
                    </Menu>
                     </>
                    
                    ) 
                    
                    :
                    (
                    <NextLink passHref href="/login"><Link  mr={4} ml={3} id="link"><Button style={{color:"white",height:"34px"}} variant="contained" color="primary" >Login</Button></Link></NextLink>
                    )
                }

                <Switch checked={state.darkmode} onChange={darkModeStateChange}></Switch>


                <NextLink passHref href="/cart">
                <Link id="link" mr={3} ml={3}>
                {
                    state.cart.cartItems.length > 0 ?
                    <>
                    <IconButton aria-label="cart">
                    <StyledBadge badgeContent={state.cart.cartItems.length} color="secondary"><ShoppingCartIcon style={{color:'white'}} />
                    </StyledBadge>
                    <Typography style={{float:'right',color:'white',margin:"5px 0 0 20px"}} >Cart </Typography>
                    </IconButton> 
                    </>
                    : 
                    <>
                    <ShoppingCartIcon style={{color:'white',float:"left"}} />
                    <Typography style={{float:'right'}} >Cart </Typography>
                    </>
                }
                </Link>
                </NextLink>
                
                </Toolbar>
                </Container>
                </AppBar>
            {/* ṆavBar */}


            {/* content */}
            <>
            <div  style={{display:carouselShow?"block":"none"}} >
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div>
                    <img  style={{height:"400px",objectFit:"cover"}}  src="https://images.unsplash.com/photo-1632672180612-d90e74cf6b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img  style={{height:"400px",objectFit:"cover"}}  src="https://images.unsplash.com/photo-1632672180612-d90e74cf6b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img  style={{height:"400px",objectFit:"cover"}}  src="https://images.unsplash.com/photo-1632672180612-d90e74cf6b8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
            </div>

            <Container style={styles.main} >
                {children}
            </Container>
            </>
            {/* content */}


            {/*footer */}
            <footer style={{margin:"20px 0"}}>
                <Typography style={{textAlign:'center'}}>All rights reserved @Copyright claim, Project.com. </Typography>
            </footer>
            {/*footer */}

            </ThemeProvider>
        </>
    )
}
