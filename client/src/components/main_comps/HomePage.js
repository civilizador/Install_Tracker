import React  from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers,updateLatLng} from '../../actions';
import UsersList from '../user_comps/UsersList';
import UserView from '../user_comps/UserView'
import {Redirect} from 'react-router-dom';
 
 class HomePage extends React.Component {
  state = {view:'user', locationAllowed:''}
  
  componentDidMount() {
        
        window.navigator.geolocation.getCurrentPosition(
            async (position) => {
              if(position.coords.latitude){
                  let  latlng = await {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                  console.log(latlng)
                  await this.props.updateLatLng(latlng)
                  await this.props.fetchAllUsers() 
              }
              
            },
            (err) => { 
                 this.setState({locationAllowed: err.message});
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
  returnSwitchButtons(){
    if(this.props.store.auth && this.props.store.auth.admin){
      return( <div>
              </div>
              )
    }else if(this.props.store.auth){
       return( <div className="btn-group-vertical mr-2" role="group" aria-label="First group">
                <button onClick={ () => {  this.setState({view:'user'}) } }    className="btn btn-md btn-secondary">Me</button>
                <button onClick={ () => {  this.setState({view:'admin'}) } }    className="btn btn-md btn-secondary">All</button>
              </div>
              )
    } 
  }
  render() {
    return (
    <div className="HomePage">
        <div className='row'>
          {this.whichScreenToShow()}
        </div>  
          <div className="btn-toolbar mb-3" role="toolbar" style={{ position: "fixed", right:"5px", top: "140px"  }}>
             {this.returnSwitchButtons()}
          </div>
    </div>
    );
  }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps, {fetchAllUsers,updateLatLng})(HomePage)
