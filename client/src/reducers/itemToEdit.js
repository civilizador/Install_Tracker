export default (itemToEdit={},action)=>{
    switch(action.type){
        case 'ITEM_TO_EDIT':
            return action.payload;
        default:
            return itemToEdit
    }
}