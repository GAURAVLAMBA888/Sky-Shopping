import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        products : [],
        quantity : 0,
        total : 0
    },
    reducers : {
        addProduct : (state, action) => {
            let found = false;
            state.products.forEach((product) => {
                const {quantity, ...restDetails} = product;
                const {quantity : payloadQuantity, ...restPayloadDetails} = action.payload;
                if(JSON.stringify(restDetails) === JSON.stringify(restPayloadDetails)){
                    found = true;
                    product.quantity += action.payload.quantity;
                }
            })
            found || state.products.push(action.payload);
            state.quantity = state.products.length;
            state.total += action.payload.price * action.payload.quantity;
        },
        deleteProduct : (state, action) => {
            state.products = state.products.filter((product) => JSON.stringify(product) !== JSON.stringify(action.payload.product));
            state.quantity = state.products.length;
            state.total = state.products.reduce((val, product) => val+product.quantity*product.price, 0)
        },
        findAndUpdate : (state, action) => {
            state.products.forEach((product) => {
                const {quantity, ...restDetails} = product;
                const {quantity : payloadQuantity, ...restPayloadDetails} = action.payload.product;
                if(JSON.stringify(restDetails) === JSON.stringify(restPayloadDetails)){
                    product.quantity = action.payload.newQuantity;
                }
            })
            state.quantity = state.products.length;
            state.total = state.products.reduce((val, product) => val+product.quantity*product.price, 0)
        }
    }
})

export const { addProduct, deleteProduct, findAndUpdate } = cartSlice.actions;
export default cartSlice.reducer;