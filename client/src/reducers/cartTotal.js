export default (cartTotal=0,action) => {
    switch(action.type){
        case 'GET_CART_TOTAL':
            return action.payload
        default:
            return cartTotal
    }
}