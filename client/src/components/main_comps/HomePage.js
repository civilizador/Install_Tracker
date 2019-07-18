import React  from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers} from '../../actions';
import UsersList from '../user_comps/UsersList';
import UserView from '../user_comps/UserView'
import {Redirect} from 'react-router-dom';

class HomePage extends React.Component {
  componentDidMount(){
        this.props.fetchAllUsers()
        console.log(this.props.store)
    }
  whichScreenToShow(){
    if(this.props.store.auth.admin){
      return <UsersList/>
    }else if(this.props.store.auth){
      return <UserView/>
    }else{
      {this.redirectToLogin()}
    }
  }
  
  render() {
    return (
      <div className="HomePage text-center">
        <div id='menuItems' className='row'>
          {this.whichScreenToShow()}
         </div>
    </div>
    );
  }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps, {fetchAllUsers})(HomePage)
