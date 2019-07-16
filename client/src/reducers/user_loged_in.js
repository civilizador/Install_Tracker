export default (USER_LOGED_IN=false, action)=>{
  switch (action.type) {
    case 'USER_LOGED_IN':
          return action.payload
    case 'LOGOUT':
          return action.payload
    default:
      return USER_LOGED_IN;
  }
}
