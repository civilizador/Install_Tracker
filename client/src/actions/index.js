import axios from 'axios'
let wrongPass = false;

// USER LOGIN ACTIONS

  // Get Current User Data ACTION
  export const getCurrentUser = () => {
      return async function(dispatch,getState) {
          const data = await getProfileData();
                if (data!=='no_user_logged_in') {
                    dispatch({ type: 'GET_USER_DATA',  payload: data.data })

                }
                else dispatch({ type: 'GET_USER_DATA',  payload: 'no user_logged_in' })
       }
  }

  // Update User Information
  export const updateUser = (updatedUser) => {
    return async(dispatch)=>{
        const response = await  axios.put("/api/update_user", {
           updatedUser
          })
         .then(function (response) {
           console.log('User updated as following: ' , response.data);
         })
         .catch(function (error) {
           console.log(error);
         });
     }
  }



  // Get current User DATA helper function
  async function getProfileData() {
       const data =  await axios.get(`/api/current_user`)
     return data
  }
  // LOGIN STATUS ACTION
  export const loginAction = () => {
      return async function(dispatch,getState) {
        console.log('this message from action USER_LOGED_IN');
          dispatch({ type: 'USER_LOGED_IN',  payload: true })
        }
  }

  // LOGOUT  ACTION
  export const logoutAction = () => {
       return async function(dispatch,getState) {
         await axios.get("/api/logout")
         dispatch(getCurrentUser());
        console.log('this message from action USER_LOGOUT');
          dispatch({ type: 'LOGOUT',  payload: false })
       }
  }
    // Password is wrong ACTION
    export const wrongPassAction = () => {
      return function(dispatch,getState) {
        if(wrongPass){
          dispatch({ type: 'WRONG_PASSWORD',  payload: 'wrong_password' }) }
      }
    }
    // LOGIN
     export const login = ({ username, password }) => async (dispatch) => {
        await axios({
          method:"post",
          url:"/api/login",
          data: { username, password }
        })
          .then( (response) => {
              console.log(response.status);
              dispatch( getCurrentUser() );
              dispatch( loginAction() );
            })
          .catch( (err) => {
              wrongPass=true;
              console.log(err,wrongPass);
               dispatch( wrongPassAction() );
          } )
      }

     export const fetchAllUsers = (category) => async (dispatch,getState) => {
       const res = await axios.get("/api/getAllUsers")
            dispatch( {type: "GET_ALL_USERS", payload: res.data} )
     }

    export const fetchByName = (id) => async (dispatch,getState) => {
      const res = await axios.get("/api/getUsersByName")
        const idSelected = res.data.filter((items)=>{return items._id===id})
       dispatch( {type: "GET_USERS_BY_NAME", payload: idSelected} )
     }


 // SEARCH ITEM actions

    export const searchAction = (searchValue) => async (dispatch) => {
      // console.log('This is Search Action speaking, You searching for : ' , searchValue)
      const response = await axios.get("/api/search/"+searchValue)
      // console.log(response.data)
        if(response.data.length >0){
          dispatch( {type: "SEARCH_RESULT", payload: response.data} )
          console.log(response.status,response.data)
        }
        else{
          dispatch( {type: "SEARCH_RESULT_FALSE", payload: 'NothingFound'} )
          console.log('NothingFound')
        }

     }

