export default (addintToppingToItemIndex={},action)=>{
    switch (action.type) {
    case 'CURRENTLY_ADDING_TOPPING_TO':
          return action.payload
    default:
          return addintToppingToItemIndex;
  }
}
