 //  Create Item flow
  
    async function getAllItems() {
           const allItemsData =  await axios.get(`/api/getAll`)
           console.log('getAllItems was called ',allItemsData)
           return allItemsData
        }
        
      export const createItem = async (itemObject) => {
        await axios({
          method:"post",
          url:"/api/addItem",
          data: itemObject
        })
          .then( (response) => {
              console.log(response.status);
              getAllItemsAction()
             })
          .catch( (err) => {
              console.log(err);
          })
      }



 // Get all items ACTION
    export  const getAllItemsAction = (itemObject) => {
      return async function(dispatch,getState) {
          const itemStatusCode = await createItem(itemObject);
          if (itemStatusCode == 200){
              const data = await getAllItems();
              dispatch({ type: 'GET_ALL_ITEMS',  payload: data })
          }else{
              console.log('Item creation failed! ')
          }
       }
    }
    
    
   