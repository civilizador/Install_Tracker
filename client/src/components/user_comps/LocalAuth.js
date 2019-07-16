import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

class LocalAuth extends Component {

  renderAuthItems=()=>{
        switch(this.props.userState ){
          case true:
            return (<div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to='/profile'  className="dropdown-item">Profile </Link>
                      <Link to='/signOut'  className="dropdown-item">SignOut </Link>
                    </div>  )
          case false:
            return (<div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to='/login'  className="dropdown-item">Login </Link>
                        <Link to='/register'  className="dropdown-item">Register </Link>
                    </div>  )
          default:
            return (<div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to='/login'  className="dropdown-item">Login </Link>
                        <Link to='/register'  className="dropdown-item">Register </Link>
                    </div>  )
        }
  }

  render() {
    return (
      <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-utensils"></i>
            </a>
            {this.renderAuthItems()}
      </li>
    );
  }
}

export default LocalAuth;
