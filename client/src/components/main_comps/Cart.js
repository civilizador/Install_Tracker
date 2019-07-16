import React  from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeFromCart} from '../../actions';
import {getCurrentUser} from '../../actions';

class Cart extends React.Component {

    componentDidMount(){
            this.props.getUser()
    }

    countItemsInCart(){
          if(this.props.store.auth && this.props.store.auth.cart ){
            return this.props.store.auth.cart.length
          }else {
            return 0
          }
    }
    // Calculating cart total .

    getCartTotal(){
        if(this.props.store.auth){
            if(this.props.store.auth.cart){
              const cart1 = this.props.store.auth.cart
              // First lets calculate summary of the main dishes
              const totalItemsPrice = cart1.reduce((sum,items) => sum + items.price, 0)
              // Then We can calculate toppings summarry by looping though cart and then once again looping through toppings for each of the cart Items
                  let toppingSum=0
                  let totalToppings   =  cart1.forEach((item)=>{
                      toppingSum      += item.toppings.reduce((sum,items) => sum + items.price, 0)
                  })
                  console.log(totalItemsPrice,toppingSum)
                  return totalItemsPrice + toppingSum
                }else{
                    return 0
                }
            }
             else{
                 return 0
             }
    }
    removeCartItem(itemIndex){
          // console.log('Cart.js line 26', itemIndex)
        this.props.removeFromCart(itemIndex)
    }

  renderCartItems(){
    if(this.props.store.auth && this.props.store.auth.cart){
        return(
            this.props.store.auth.cart.map((cartItem, index)=>{
                return (
                    <li key={index} className="list-group-item">
                        <div className='eachCartItemDiv'>
                            <img src={cartItem.image} className='cartItemImage' alt="" />
                            {cartItem.name}
                            <span className='float-right'><i onClick={()=>{this.removeCartItem(index)}} className="far fa-times-circle"></i></span>
                        </div>
                    </li>)
            })

        )
    }else{
       return(
          <div className='mx-auto'>
            <hr />
            <p>Your Cart is Empty</p>
        </div>
        )
    }
  }



  render(){
      console.log(this.props.store)
      return(
            <li className="nav-item dropdown dropleft ">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-shopping-cart"></i> <span className="badge badge-light">{this.countItemsInCart()}</span>
                </Link>
                <div className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <ul className="list-group">
                        {this.renderCartItems()}
                    </ul><br/> <hr/>
                 <h3>Total: ${this.getCartTotal()}   </h3>
                 <hr/> <br/>
                <Link to='/cart'  className='btn btn-lg btn-outline-info' > Go to Cart </Link>
                </div>
            </li>
          )
  }

}


const mapStateToProps = (store) => ({store})
const mapDispatchToProps = (dispatch)=>{
  return {
     removeFromCart: (index) => {
        dispatch(removeFromCart(index))
      },
    //   passing zipcode value to zipcode action
     getUser: () => {
       dispatch(getCurrentUser() )
     }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Cart);
