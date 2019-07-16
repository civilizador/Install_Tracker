import React  from 'react';
import {connect} from 'react-redux'
import {fetchAllUsers} from '../../actions'
import UsersList from '../user_comps/UsersList' 
class HomePage extends React.Component {

  componentDidMount(){
        this.props.fetchAllUsers()
        console.log(this.props.store)
    }

  render() {
    return (
      <div className="HomePage text-center">
        <div id='menuItems' className='row'>
          <UsersList />
         </div>
    </div>
    );
  }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps, {fetchAllUsers})(HomePage)
