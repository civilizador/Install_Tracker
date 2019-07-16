import {combineReducers} from 'redux';
import authReducer from  './auth_reducer' ;
import itemsReducer from './displayAll.js';
import getAllOrders from './getAllOrders.js';
import loginStatus from  './user_loged_in.js' ;
import cart from './cart.js';
// import cartItems from './cartItems.js';
import selectedItem from './selectedItem.js';
import itemToEdit from './itemToEdit.js';
// import cartTotal from './cartTotal.js';
import addToppingItem from './addToppingItem.js';
 // importing redux-form library and use name formReducer for reference
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
//Auth piece of state will be accessiable inside of the react components.
  auth: authReducer,
  logedIN: loginStatus,
  items:  itemsReducer,
  cart: cart,
  selectedItem: selectedItem,
  itemToEdit: itemToEdit,
  addToppingItem: addToppingItem,
  allOrders: getAllOrders,
   // adding additional state - form to our store. SO we can manage form data through redux.
  form: formReducer
})
