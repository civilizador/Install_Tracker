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
            
        if(this.props.store.auth.admin){
            return (this.props.store.allUsers.map((user)=>{
                    return (
                         <div key={user._id} class="card mx-auto" style={this.getStyling()}>
                          <h1>{user.name}</h1>
                          <div className="card-body">
                            <h5 className="card-title">{user.region}</h5>
                            <input value={user.projectId}  />
                            <p className="card-text">{user.installAddress}</p>
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
                            <li className="list-group-item">lat: {user.lat} lng: {user.lng}</li>
                            <li className="list-group-item">{user.phone}</li>
                            <li className="list-group-item">{user.email}</li>
                          </ul>
                          <div className="card-body">
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
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
                         <div key={user._id} class="card mx-auto" style={this.getStyling()}>
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
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
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


