


export default (allUsers=[], action)=>{
  switch (action.type) {
    case 'GET_ALL_USERS':
          return action.payload
    case 'GET_USERS_BY_NAME':
          return action.payload
    case 'SEARCH_RESULT':
          return action.payload
    case 'SEARCH_RESULT_FALSE':
          return allUsers;
    default:
          return allUsers;
  }
}
