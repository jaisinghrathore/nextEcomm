import React,{createContext} from 'react'
import Cookies from 'js-cookie'; 


const Store = createContext();

const initialState={
    darkmode:Cookies.get("darkmode") === "ON" ? true : false,
    cart:{
        cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [],
        shippingAddress : Cookies.get("shippingAddress") ? JSON.parse(Cookies.get("shippingAddress")) : {},
        paymentMethod: Cookies.get('paymentMethod')? Cookies.get('paymentMethod') : ''
    },
    userInfo : Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : null,
};


function reducer(state,action) {
    switch(action.type){
        case 'Dark_Mode_On' : 
        return {...state,darkmode:true};
        case 'Dark_Mode_Off' : 
        return {...state,darkmode:false};
        case "CART_ADD_ITEM" :{
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item=>item._id === newItem._id);
            const cartItems =  existItem ? state.cart.cartItems.map(item=>item._id === existItem._id?newItem:item)
            : [...state.cart.cartItems,newItem];

            Cookies.set('cartItems',JSON.stringify(cartItems))
            return {...state,cart:{...state.cart,cartItems:cartItems}}
        };
        case "DELETE_ADD_ITEM" : {
            const newData = state.cart.cartItems.filter(item=>item._id != action.payload._id);
            Cookies.set('cartItems',JSON.stringify(newData))
            return {...state,cart:{...state.cart,cartItems:newData}};
        }
        case "SAVE_SHIPPING_ADDRESS" : {
            return {...state,cart:{...state.cart,shippingAddress:action.payload}};
        }
        case "SAVE_PAYMENT_METHOD" : {
            Cookies.set('paymentMethod',action.payload)
            return {...state,cart:{...state.cart,paymentMethod:action.payload}};
        }
        case 'USER_LOGIN' : {
            return {...state,userInfo:action.payload};
        }
        case 'USER_LOGOUT' : {
            return {...state,userInfo:null}
        }
        case 'CART_CLEAR' : {
            return {...state,cart:{...state.cart, cartItems:[],shippingAddress:{},paymentMethod:''}}
        }
        default : return state
    }
}


const contextStore = () => {
const nam = React.useContext(Store);
return nam;
};

export default function StoreProvider({children}) {

        const[state,dispatch]=React.useReducer(reducer,initialState);
        const value = {state,dispatch};
        return <Store.Provider value={value} >{children}</Store.Provider>
}

export {contextStore};