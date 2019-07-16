export default (selectedItem={},action)=>{
    switch (action.type) {
    case 'ITEM_SELECTED':
          return action.payload
    default:
          return selectedItem;
  }    
}