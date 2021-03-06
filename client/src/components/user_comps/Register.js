import React, { Component } from "react";
import { Link} from "react-router-dom";
import { Redirect } from "react-router-dom";

import axios from 'axios';


class Register extends Component {
  state = {
      name: "", email: "", password: "", password2: "",
      username: "", phone: "", address: "", phone: "",
      errors: {}, submitted:false, region: "South East", directManagerEmail: "", directManagerName: ""
    };
  constructor(props){
    super(props)
      this.name = React.createRef(); this.phone= React.createRef();  this.username = React.createRef();
      this.address = React.createRef(); this.password2 = React.createRef();  this.phone = React.createRef();
      this.email = React.createRef(); this.password = React.createRef(); this.submit = React.createRef(); this.region = React.createRef();
      this.directManagerEmail = React.createRef(); this.directManagerName = React.createRef();
  }
  
  renderHeader = ()=>{
    switch(this.state.submitted){
      case true:
         return <Redirect to='/' />;
      case false:
         return 'Please Register bellow'
      default:
         return <Redirect to='/' />;
    }
  }

  onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };
  onChangeForRegion = e => {
     this.setState({ region : e.target.value });
     console.log( this.state.region ," Is selected region ","for: ", e.target.id )
  }
  onSubmit = async(e) => {
      e.preventDefault()
        console.log(this.state)
       const response = await axios({
            method: 'post',
            url: 'api/register',
            data: this.state
        })
        if(response.status === 200){
           this.setState({submitted:true});
           console.log(' Registered successfully')
        }
  }

  onKeyUp = (e,target) => {
    if(e.keyCode === 13){
      switch (target) {
        case 'username' :
          this.name.current.focus();
          break;
        case 'name' :
          this.address.current.focus();
          break;
        case 'addr' :
          this.phone.current.focus();
          break;
        case 'phone' :
          this.email.current.focus();
          break;
        case 'email' :
          this.password.current.focus();
          break;
        case 'password' :
          this.password2.current.focus();
          break;
        case 'password2' :
          this.submit.current.focus();
          break;
        default :
          this.submit.current.focus();
          break;
      }

    }
  }
  render() {
  return (
      <div className="container col-7 mx-auto" style={{ marginTop: "20vh" }}>
        <div className="row">
          <div className="col s8 offset-s2">

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>{this.renderHeader()}</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/">Log in</Link>
              </p>
            </div>
            <form onSubmit={this.onSubmit}>

              <div className="form-group">
                <label htmlFor="username">User Name</label>
                <input
                required
                  className='form-control'
                  ref={this.username}
                  onKeyUp={(e)=>{this.onKeyUp(e,'username')}}
                  onChange={this.onChange}
                  value={this.state.username}
                  id="username"
                  type="text"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                required
                  className='form-control'
                  ref={this.name}
                  onKeyUp={(e)=>{this.onKeyUp(e,'name')}}
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="region">Region</label>
                <select
                required
                  className='form-control'
                  ref={this.region}
                  onKeyUp={(e)=>{this.onKeyUp(e,'region')}}
                  onChange={this.onChangeForRegion}
                  value={this.state.region}
                  defaultValue={this.state.region}
                  id="region"
                  type="text"
                >
                  <option  value='South East'> South East </option>
                  <option value='South West'> South West </option>
                  <option value='North East'> North East </option>
                  <option value='Central'> Central</option>
                  <option value='California'> California</option>
                </select>
              </div>
 
              
              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input
                required
                  className='form-control'
                  ref={this.phone}
                  onKeyUp={(e)=>{this.onKeyUp(e,'phone')}}
                  onChange={this.onChange}
                  value={this.state.phone}
                  id="phone"
                  type="text"
                />
              </div>
               
               <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                required
                  className='form-control'
                  ref={this.email}
                  onKeyUp={(e)=>{this.onKeyUp(e,'email')}}
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="directManagerName">Direct Manager Name</label>
                <input
                required
                  className='form-control'
                  ref={this.directManagerName}
                  onKeyUp={(e)=>{this.onKeyUp(e,'directManagerName')}}
                  onChange={this.onChange}
                  value={this.state.directManagerName}
                  id="directManagerName"
                  type="directManagerName"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="directManagerEmail">Direct Manager Email</label>
                <input
                required
                  className='form-control'
                  ref={this.directManagerEmail}
                  onKeyUp={(e)=>{this.onKeyUp(e,'directManagerEmail')}}
                  onChange={this.onChange}
                  value={this.state.directManagerEmail}
                  id="directManagerEmail"
                  type="directManagerEmail"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                required
                className='form-control'
                  ref={this.password }
                  onKeyUp={(e)=>{this.onKeyUp(e,'password')}}
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                required
                className='form-control'
                onKeyUp={(e)=>{this.onKeyUp(e,'password2')}}
                  ref={ this.password2 }
                  onChange={this.onChange}
                  value={this.state.password2}
                  id="password2"
                  type="password"
                />
              </div>
              <div className="form-group" style={{ paddingLeft: "11.250px" }}>
                <button
                  onClick={this.onSubmit}
                  ref={ this.submit }
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-lg btn-outline-warning"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default  Register ;
