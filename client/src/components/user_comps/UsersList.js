import React from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers,updateUserStatus} from '../../actions'

class UsersList extends React.Component {
    
    state={status: this.props.store.auth.status}

    componentDidMount(){
        this.props.fetchAllUsers()
    }
    
    
    getStyling(){
        switch(this.props.store.auth.installAddress){
            case 'Nothing is Assigned':
                return { marginTop: "12vh", border: "3px solid silver"}
            default :
                return {  marginTop: "12vh", border: "3px solid lime"}    
        }
    }
    onStatusChange=async(e)=>{
        const value= e.target.value
        await this.setState({status:value})
        await this.props.updateUserStatus(value)
        console.log(this.state)
    }
    assignJob=async(userId)=>{
        console.log('AssignJob to User : ',userId)
    }
    render(){
            
        if(this.props.store.auth.admin){
            return (this.props.store.allUsers.map((user)=>{
                    return (
                         <div key={user._id} class="card mx-auto col-lg-3 col-md-4 col-sm-12 col-xs-12" style={this.getStyling()}>
                         <div className='btn btn-lg btn-outline-info'>{user.projects.slice(-1)[0].projectStartTime} -- {this.props.store.auth.projects.slice(-1)[0].projectStartDate} </div>
                          <h1>{user.name}</h1>
                          <div className="card-body">
                            <h5 className="card-title">{user.region}</h5>
                            <p >Project ID#:  {user.projects.slice(-1)[0].projectId} </p>
                            <p >Project Name: {user.projects.slice(-1)[0].projectName} </p>
                            <div class="input-group mb-3">
                                <input 
                                    className='form-control' 
                                    value={user.projectId}  
                                />                              
                                <div class="input-group-append">
                                    <button onClick={()=>{this.assignJob(user._id)}} class="btn btn-outline-secondary" type="button" id="button-addon2">Assign</button>
                                </div>
                            </div>
                            
                            <p className="card-text">{user.installAddress}</p>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">{user.status}</li> 
                            <li className="list-group-item">lat: {user.lat} lng: {user.lng}</li>
                            <li className="list-group-item">{user.phone}</li>
                            <li className="list-group-item">{user.email}</li>
                          </ul>
                          <div className="card-body">
                            <a href={`mailto: ${user.email}?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link"> Email Tech: <i class="far fa-envelope-open"></i> </a>
                            <a href={`mailto: ${this.props.store.auth.directManagerEmail}?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link">
                                Manager: <i class="far fa-envelope-open"></i> {this.props.store.auth.directManagerName}</a>
                          </div>
                    </div>
                    )
                })
            )
        }else if(this.props.store.auth){
            console.log(this.props.store.auth)
            return(
                this.props.store.allUsers.map((user)=>{
                    return (
                         <div key={user._id} class="card mx-auto col-lg-3 col-md-4 col-sm-12 col-xs-12" style={this.getStyling()}>
                         <div className='btn btn-lg btn-outline-info'>{user.projects.slice(-1)[0].projectStartTime} -- {this.props.store.auth.projects.slice(-1)[0].projectStartDate} </div>
                          <h1>{user.name}</h1>
                          <div className="card-body">
                            <h5 className="card-title">{user.region}</h5>
                            <p className="card-text">{user.projectId}</p>
                            <p className="card-text">{user.installAddress}</p>
                          </div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">{user.status}</li> 
                            <li className="list-group-item">lat: {user.lat} lng: {user.lng}</li>
                            <li className="list-group-item">{user.phone}</li>
                            <li className="list-group-item">{user.email}</li>
                          </ul>
                          <div className="card-body">
                             
                          </div>
                    </div>
                         )
                })
            )
        }
    }
   
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,{fetchAllUsers,updateUserStatus})(UsersList)


