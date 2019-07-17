import React  from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers} from '../../actions';
import UsersList from '../user_comps/UsersList';
import {Redirect} from 'react-router-dom';
class HomePage extends React.Component {

  componentDidMount(){
        this.props.fetchAllUsers()
        console.log(this.props.store)
    }
 
  redirectToLogin=()=>{
    if(this.props.store.auth){
      return <UsersList/> 
    }
  }
  render() {
    return (
      <div className="HomePage text-center">
        <div id='menuItems' className='row'>
          {this.redirectToLogin()}
         </div>
    </div>
    );
  }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps, {fetchAllUsers})(HomePage)
