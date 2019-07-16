export default (allCartItems=[],action)=>{
  switch (action.type) {
    case 'CART':
      return action.payload
    default:
      return allCartItems
  }
}
