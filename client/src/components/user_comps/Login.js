import React ,{ Component } from "react";
import {connect} from 'react-redux';
import { Link,Redirect } from "react-router-dom";
import {login} from "../../actions";


class Login extends Component {
state={submitted:false}
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };
  onSubmit = async e => {
      e.preventDefault();
      // Trigering login action and passing input data from the login form.
      this.props.login(this.state)
    }
    //  this function will check if user loged in and if so redirect to the home page.
    getResult = () =>{
      switch(this.props.auth.auth){
        case false:
          return "Please Log In using your e-mail and password."
        case 'no_user_logged_in':
          return "Please Log In using your e-mail and password."
        case 'wrong_password':
          return 'Wrong Password'
        default:
             return <Redirect to='/'/>;
      }
    }
  render() {
    return (

        <div className="container col-7 mx-auto" style={{ marginTop: "20vh" }}>
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Login</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.username}
                    id="username"
                    type="username"
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.password}
                    id="password"
                    type="text"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-lg btn-outline-info float-right"
                  >
                 LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
<h2> {this.getResult()} </h2>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt=''/>
            </div>
            <p className="btn-text"><b>Sign in with google</b></p>
          </div>

        </div>
    );
  }
}
const mapStateToProps = (auth) => ({auth})
export default connect(mapStateToProps, { login })(Login)
