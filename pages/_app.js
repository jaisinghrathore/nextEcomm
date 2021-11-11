import '../styles/globals.css'
import StoreProvider from "../utils/Store"
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  return(
    <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
    <StoreProvider>
    <Component {...pageProps} />
    </StoreProvider>
    </SnackbarProvider>
    );
}

export default MyApp
