import React from 'react';
import {connect} from 'react-redux';
import {getCurrentUser,updateUserStatus} from '../../actions'

class UserView extends React.Component {
  
    state={status: this.props.store.auth.status}
    
    componentDidMount(){
        this.props.getCurrentUser()
        console.log(this.state)
    }
    getStyling(){
        switch(this.props.store.auth.installAddress){
            case 'Nothing is Assigned':
                return {width: "70%", marginTop: "12vh", border: "3px solid silver"}
            default :
                return {width: "70%", marginTop: "12vh", border: "3px solid lime"}    
        }
         
    }
    onStatusChange=async(e)=>{
        const value= e.target.value
       await this.setState({status:value})
        await this.props.updateUserStatus(value)
        console.log(this.state)
    }
    render(){
        if(this.props.store.auth)
        console.log(this.props.store.auth)
        return(
                 <div key={this.props.store.auth._id} class="card mx-auto" style={this.getStyling()}>
                      <h1>{this.props.store.auth.name}</h1>
                      <div className="card-body">
                        <h5 className="card-title">{this.props.store.auth.region}</h5>
                        <p > {this.props.store.auth.projectId} </p>
                        <p className="card-text">{this.props.store.auth.installAddress}</p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <select 
                            className='form-control'
                            onChange={this.onStatusChange}
                            id="status"
                            type="text"
                            value={this.state.status}
                                >
                            <option value="Heading To site" >Heading To site</option>
                            <option value="Arrived to the site">Arrived to the site</option>
                            <option value="Running late">Running late</option>
                        </select>
                        <li className="list-group-item">{this.props.store.auth.lat}{this.props.store.auth.lng}</li>
                        <li className="list-group-item">{this.props.store.auth.phone}</li>
                        <li className="list-group-item">{this.props.store.auth.email}</li>
                      </ul>
                      <div className="card-body">
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                      </div>
                </div>
          
            
            )
    }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,{getCurrentUser,updateUserStatus})(UserView)