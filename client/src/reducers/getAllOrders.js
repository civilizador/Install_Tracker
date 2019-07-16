export default (orders=[],action)=>{
 switch (action.type) {
    case 'ALL_ORDERS':
          return action.payload
    default:
          return orders;
  }
}
