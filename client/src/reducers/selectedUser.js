



export default (selectedUser={}, action)=>{
  switch (action.type) {
    case 'GET_SELECTED_USER_DATA':
          return action.payload
    default:
          return selectedUser;
  }
}
