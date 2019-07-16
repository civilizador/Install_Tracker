import React ,{ Component } from "react";
import { connect } from 'react-redux'
import {createItem} from '../../actions'
import { Redirect } from "react-router-dom";
import Form from "./Form";

class Create extends Component {
state={submitted:false}

  getResult = () =>{
    switch(this.state.submitted){
      case false:
        return "Add new Menu Item"
      case true:
       return <Redirect to='/'/>;
      default:
           return <Redirect to='/'/>;
    }
  }


  onSubmit = values => {
      console.log(values);
      this.props.createItem(values);
      this.setState({submitted:true});
      console.log(this.state.submitted)
  }

  render() {
      return (

        <div className="container col-7 mx-auto" style={{ marginTop: "20vh" }}>
          <div className="container col-7 mx-auto" style={{ marginTop: "20vh" }}>
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col s8 offset-s2">
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4> <b><h2> {this.getResult()} </h2></b> </h4>
                </div>
                 <Form onSubmit={this.onSubmit} />
              </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store)=>({store})

  export default connect(mapStateToProps, { createItem })(Create)
