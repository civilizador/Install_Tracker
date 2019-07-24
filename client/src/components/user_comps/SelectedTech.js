import React from 'react';
import {connect} from 'react-redux';
import {getSelectedUser,updateUserStatus} from '../../actions'
import {Link} from 'react-router-dom';

class UserView extends React.Component {
  
    state={selectedUser: null, projectId:'',projectName: '',projectStartDate:'',projectStartTime:''  }
    
    componentDidMount(){
        
    }
    onInputChange=(e)=>{
        this.setState({[e.target.id]:e.target.value})
        console.log(this.state)
    }
    onFormSubmit=()=>{
        
    }
    renderTech=()=>{
        const userId=   window.location.href.split('/').slice(-1)[0]
        console.log('USER ID is : ', userId)
        const selectedUser =   this.props.store.allUsers.find( (user)=>{return user._id===userId} )
        const style = ()=>{
            switch(selectedUser.status){
                case 'Running late':
                    return {marginTop:'15vh', border: "3px solid red", textAlign: "center"}
                case 'Arrived to the site':
                    return {marginTop:'15vh', border: "3px solid #0ead0e3b", textAlign: "center"}
                default :
                    return {marginTop:'15vh', border: "3px solid silver", textAlign: "center"}   
            } 
        }
        console.log(selectedUser)
        return(
                 <div key={selectedUser._id} className="card mx-auto" style={style()}>
                    <div className="btn-toolbar mb-3" role="toolbar" style={{ position: "fixed", right:"5px", top: "140px"  }}>
                        <div className="btn-group-vertical mr-2" role="group" aria-label="First group">
                           <Link to='/' className="btn btn-md btn-secondary">All</Link>
                        </div>
                    </div>
                    <div className='btn btn-lg btn-outline-info'>{selectedUser.projects.slice(-1)[0].projectStartTime} -- {selectedUser.projects.slice(-1)[0].projectStartDate} </div>
                      <h1>{selectedUser.name}</h1>
                      <div className="card-body">
                        <h4 className="card-title"><i class="fas fa-globe-americas"></i>{selectedUser.region}</h4>
                        <h4 >Project ID#:  {selectedUser.projects.slice(-1)[0].projectId} </h4>
                        <h5 >Project Name: {selectedUser.projects.slice(-1)[0].projectName} </h5>
                        <h5 className="card-text"><i class="fas fa-map-marked-alt"></i>{selectedUser.installAddress}</h5>
                        <form className='col-md-9 col-sm-9 col-lg-9 mx-auto'>
                          <div class="form-group">
                            Project ID: <input value={this.state.projectId} onChange={this.onInputChange} class="form-control" id="projectId" />
                           </div>
                          <div class="form-group">
                            Project Name <input value={this.state.projectName} onChange={this.onInputChange} class="form-control" id="projectName" />
                          </div>
                          <div class="form-group">
                            Start Date <input type='date' value={this.state.projectStartDate} onChange={this.onInputChange} class="form-control" id="projectStartDate"/>
                          </div>
                          <div class="form-group">
                            Start Time <input type='time' value={this.state.projectStartTime} onChange={this.onInputChange}  class="form-control" id="projectStartTime" />
                          </div>
                          <button type="submit" class="btn btn-outline-info">Assign Install</button>
                        </form>
                      </div>
                      
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item" ><b> Arrival Status:  {selectedUser.status} </b></li>
                        <li className="list-group-item">lat: {selectedUser.lat}, lng: {selectedUser.lng}</li>
                        <li className="list-group-item"><i class="fas fa-phone"></i> : {selectedUser.phone}</li>
                        <li className="list-group-item"><i class="fas fa-envelope-open"></i>: {selectedUser.email}</li>
                      </ul>
                      <div className="card-body">
                        <a href={`mailto: myPM@commscope.com?Subject=${'Issue with install : '}${selectedUser.projectId}${selectedUser.projectName}` } className="card-link"> Commscope Manager: <i class="far fa-envelope-open"></i> </a>
                        <a href={`mailto: ${selectedUser.directManagerEmail}?Subject=${'Issue with install : '}${selectedUser.projectId}${selectedUser.projectName}` } className="card-link">
                            Direct Manager: <i class="far fa-envelope-open"></i> {selectedUser.directManagerName}</a>
                      </div>
                </div>
          
            
            )
    }
    
    onStatusChange=async(e)=>{
        const value= e.target.value
        await this.setState({status:value})
        await this.props.updateUserStatus(value)
        console.log(this.state)
    }
    render(){
        if(this.props.store.auth.admin)
            return(this.renderTech())
            
    }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,{getSelectedUser,updateUserStatus})(UserView)