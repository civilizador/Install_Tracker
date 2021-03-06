import {combineReducers} from 'redux';
import authReducer from  './auth_reducer' ;
import getAllUsers from './getAllUsers.js';
 import itemToEdit from './itemToEdit.js';
 import selectedUser from './selectedUser.js';
  import {reducer as formReducer} from 'redux-form';

export default combineReducers({
//Auth piece of state will be accessiable inside of the react components.
  auth: authReducer,
  allUsers:  getAllUsers,
  itemToEdit: itemToEdit,
  selectedUser: selectedUser,
    // adding additional state - form to our store. SO we can manage form data through redux.
  form: formReducer
})
