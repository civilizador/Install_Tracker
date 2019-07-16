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



// ITEMS ACTIONS

  // FETCHING ITEMS

    export const fetchAllUsers = (category) => async (dispatch,getState) => {
       const res = await axios.get("/api/getAllUsers")
            dispatch( {type: "GET_ALL_USERS", payload: res.data} )
     }

    export const fetchByName = (id) => async (dispatch,getState) => {
      const res = await axios.get("/api/getAll")
        const idSelected = res.data.filter((items)=>{return items._id===id})
       dispatch( {type: "GET_ITEMS_BY_ID", payload: idSelected} )
     }
    export const fetchCartItems = () => async (dispatch,getState) => {
       const res = await axios.get("/api/getCartItems")
       console.log('fetch acart items ',res)
          dispatch( {type: "GET_CART_ITEMS", payload: res} )
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

// TOPPINGS ACTIONS

    export const addToppToItem = (topping,index) => async (dispatch) => {
      console.log('Cart item index is : ',index )
      const response = await axios.post(`/api/addToppingToItem`, {topping,index} )
        await dispatch({type: "TOPPING_ADDED", payload: response.data})
    }

    export const currentlyAddingToppingTo = (index) => async (dispatch) => {
       await dispatch( {type: "CURRENTLY_ADDING_TOPPING_TO", payload: index} )
    }

// ADD / UPDATE /  REMOVE ITEMS

     // CREATE ITEM

     export const createItem = (itemObject) => async (dispatch) => {

         const response = await axios({
           method:"post",
           url:"/api/addItem",
           data: itemObject
         })
         if (response.status === 200) {
             console.log("Success");
             dispatch(fetchAllUsers())
         }
     }

     // GETTING ITEM DATA TO EDIT

     export const retrieveItemToEdit = (item_id) => async (dispatch) => {
       const res = await axios.get("/api/edit/"+item_id);
       await dispatch({type: 'ITEM_TO_EDIT',payload: res.data})
     }

     // UPDATE ITEM

     export const updateItem = (item) => async (dispatch) => {
         axios.post("/api/edit/"+item._id, {
           item: item,
          })
         .then(function (response) {
           console.log(response);
         })
         .catch(function (error) {
           console.log(error);
         });
     }

     // DELETE ITEM

     export const deleteItem = (itemId) => async(dispatch) => {
       axios.delete("/api/delete/"+itemId,{data:{itemId}})
         .then(function async(response) {
           console.log('deleted');
          })
         .catch(function (error) {
           console.log(error);
         });

     }

     // SHOW ITEM DETAILS in MODAL WINDOW
    export const selectedItem = (item) =>  async (dispatch) => {
      console.log('selectedItem action triggered, FOLOWING ITEM WAS SELECTED FOR DETAILS: ',item)
      await dispatch( {type: "ITEM_SELECTED", payload: item} )
    }



// ADD REMOVE UPDATE CART

   // ADD TO CART
    export const addToCart = (item) => async (dispatch) => {
        const { data: cart } = await axios.post('/api/addToCart', {
          item: item,
         })

        dispatch({type: 'CART',payload: cart})
    }

    // REMOVE FROM CART

    export const removeFromCart = (index) => async (dispatch) => {
        const { data: cart }  = await axios.post('/api/removeFromCart', {
          index: index,
         })
         dispatch({type: 'REMOVED_FROM_CART',payload: cart})
    }


// ORDERS ACTIONS

    // GET ALL ORDERS
    export const getAllOrders = (orderOwner) => async (dispatch) => {
      const allOrders = await axios.get('/api/getAllOrders')
      if (allOrders.status = 200) {
           dispatch({type: 'ALL_ORDERS',payload: allOrders.data})
      }

    }


    // ADD ORDER

    export const addOrder = (orderItems, total,owner) =>async (dispatch) => {
 
        const order = {
            orderItems: orderItems,
            total: total,
            orderOwner:owner
        }
        console.log('addOrder Action   ', order)
        const response = await axios.post('/api/newOrder',{
            order
        })
        if (response.status = 200) {
             dispatch({type: 'ORDER_ADDED',payload: response.data})
             const cartResponse = await axios.get('/api/emptyCart')
             console.log('CART EMPTY API RESPONSE',cartResponse)
             dispatch({type: 'CART_EMPTY',payload: cartResponse.data})
        }
    }
