export default (activeUser=null, action)=>{
  switch (action.type) {
    case 'GET_USER_DATA':
          return action.payload || false
    case 'CART':
      return {
        ...activeUser,
        cart: action.payload,
      }
      case 'REMOVED_FROM_CART':
      return {
        ...activeUser,
        cart: action.payload,
      }
      case 'TOPPING_ADDED':
      return {
        ...activeUser,
        cart: action.payload,
      }
      case 'CART_EMPTY':
      activeUser.cart=action.payload
      return {
        activeUser
      }

    case 'WRONG_PASSWORD':
          return action.payload
    default:
      return activeUser;
  }
}
