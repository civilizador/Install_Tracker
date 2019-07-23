import React from 'react';
import { BrowserRouter, Route }  from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentUser} from '../actions';
import Nav from './main_comps/Nav';
import HomePage from './main_comps/HomePage';
import Profile from './user_comps/Profile';
import Login from './user_comps/Login';
import Register from './user_comps/Register';
import SelectedTech from './user_comps/SelectedTech';

class App extends React.Component {

renderEditRoutes(){
  if(this.props.store.auth && this.props.store.auth.admin){
    return(
      <BrowserRouter>
        <Nav />
          <Route path='/' exact component={HomePage} />
          <Route path='/profile/:id' exact component={Profile} />
          <Route path='/tech/:id' exact component={SelectedTech} />
        </BrowserRouter>
          )
  }else if(this.props.store.auth){
    return(
      <BrowserRouter>
        <Nav />
          <Route path='/' exact component={HomePage} />
          <Route path='/profile/:id' exact component={Profile} />

        </BrowserRouter>
          )
  }else{
      return(
      <BrowserRouter>
        <Nav />
          <Route path='/' exact component={Login} />
          <Route path='/register' exact component={Register} />
         </BrowserRouter>
          )
  }
}



  componentDidMount(){
       this.props.getCurrentUser()

  }

  render() {
     return (
      <div className="App">
        {this.renderEditRoutes()}
       </div>
    );
  }

}
// Since we will be accessing to the user state inside of NAV component we not going to pass our state object here instead we will pass
// Action to get current user .
const mapStateToProps=(store)=>({store})
export default connect(mapStateToProps,{getCurrentUser})(App);
