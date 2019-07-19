import React from 'react';
import {Link}  from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutAction,searchAction} from '../../actions';
 

 class Nav extends React.Component {

   state = {searchValue: 'Type Text Name'}

  renderAuthItems=()=>{
    // console.log('Render Auth items function',this.props.store.auth)
      if( !this.props.store.auth ){
          return (<div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to='/'  className="dropdown-item">Login </Link>
                        <Link to='/register'  className="dropdown-item">Register </Link>
                  </div>  )
      }else{
          return (<div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        
                        <Link to={'/profile/'+this.props.store.auth._id}  className="dropdown-item">Profile </Link>
                        <p onClick={ ()=>{this.props.logoutAction()} }  className="dropdown-item"> SignOut </p>
                  </div>  )
      }
  }
  
  onSearchSubmit=(e)=>{
    e.preventDefault();
    console.log('Search for: ',this.state.searchValue)
    this.props.searchAction(this.state.searchValue)
    this.setState({searchValue:''})
  }


  render(){
    console.log(this.state.searchValue)
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
          <Link  className="navbar-brand" to="/">
            <img  src="logo_transparent.png" width="100"  className="d-inline-block align-top" alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              
            </ul>
        
            <form className="form-inline my-2 my-lg-0" onSubmit={this.onSearchSubmit}>
              <input
                className="form-control mr-sm-2"
                onChange = {  (e)=>{  this.setState({searchValue:e.target.value}) }  }
                value = { this.state.searchValue } />
              <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
            </form>

            <ul className="navbar-nav authBUttons">
                <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-truck"></i>
                      </Link>
                      {this.renderAuthItems()}
                </li>
            </ul>

          </div>
      </nav>
  )
}
}

const mapStateToProps = (store) => ({store})


export default connect(mapStateToProps,{logoutAction,searchAction})(Nav);
