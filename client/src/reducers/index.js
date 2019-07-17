import {combineReducers} from 'redux';
import authReducer from  './auth_reducer' ;
import getAllUsers from './getAllUsers.js';
import loginStatus from  './user_loged_in.js' ;
  import selectedItem from './selectedItem.js';
import itemToEdit from './itemToEdit.js';
 import addToppingItem from './addToppingItem.js';
 import {reducer as formReducer} from 'redux-form';

export default combineReducers({
//Auth piece of state will be accessiable inside of the react components.
  auth: authReducer,
  logedIN: loginStatus,
  allUsers:  getAllUsers,
   selectedItem: selectedItem,
  itemToEdit: itemToEdit,
  addToppingItem: addToppingItem,
    // adding additional state - form to our store. SO we can manage form data through redux.
  form: formReducer
})
