import React ,{ Component } from "react";
import { connect } from 'react-redux'
import {retrieveItemToEdit, updateItem} from '../../actions'
import { Redirect } from "react-router-dom";
import Form from "./Form";

class Edit extends Component {
  
state={submitted:false}

   componentDidMount(){
     const itemId= window.location.href.split('/').reverse()[0]
     this.props.retrieveItemToEdit(itemId)
  } 

  getResult = () =>{
    switch(this.state.submitted){
      case false:
        return "Edit Item"
      default:
           return <Redirect to='/'/>;
    }
  }
  
  onSubmit = async values => {
      console.log('Edit: ' ,values);
       await this.props.updateItem(values);
               this.setState({submitted:true});

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
                 <Form  onSubmit={this.onSubmit} initialValues = {  this.props.store.itemToEdit  }/>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store)=>({store})

  export default connect(mapStateToProps, { retrieveItemToEdit,updateItem })(Edit)
