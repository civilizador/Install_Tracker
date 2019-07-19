import React  from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers,updateUser} from '../../actions';
import UsersList from '../user_comps/UsersList';
import UserView from '../user_comps/UserView'
import {Redirect} from 'react-router-dom';
 
 class HomePage extends React.Component {
  state = {view:'user'}
  
  componentDidMount() {
        this.props.fetchAllUsers()
        console.log(this.props.store)
        // Getting User's current location information from window object and passing it as a  'position' object to callback function.
        window.navigator.geolocation.getCurrentPosition(
              (position) => {
              
                const latlng = {
                    latitude: position.coords.latitude,
                    longtitude: position.coords.longtitude}
                console.log(latlng)
                this.props.updateUser(latlng)
                console.log(position)
                
        // Making an API call to get weather data and saving result to data_weather variable.
             },
            (err) => { 
                 this.setState({errMessage: err.message});
             }
        )
        
  }
  
  whichScreenToShow(){
    if(this.props.store.auth.admin){
      return <UsersList/>
    }else if(this.props.store.auth && this.state==='user'){
      return <UserView/>
    }
    else if(this.props.store.auth && this.state.view==='admin'){
      return <UsersList/>
    }
    else if(this.props.store.auth){
      return <UserView/>
    }  
    else{
      {this.redirectToLogin()}
    }
  }
  
  render() {
    return (
    <div className="HomePage text-center">
        <div id='menuItems' className='row'>
          {this.whichScreenToShow()}
         <div className="btn-toolbar mb-3" role="toolbar" style={{ position: "fixed", left:"10px", top: "120px"  }}>
          <div className="btn-group-vertical mr-2" role="group" aria-label="First group">
            <button onClick={ () => {  this.setState({view:'user'}) } }    className="btn btn-lg btn-secondary">My Install</button>
            <button onClick={ () => {  this.setState({view:'admin'}) } }    className="btn btn-lg btn-secondary">All Techs</button>
           </div>
        </div>
         </div>
    </div>
    );
  }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps, {fetchAllUsers,updateUser})(HomePage)
