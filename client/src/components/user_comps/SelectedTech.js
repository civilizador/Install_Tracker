import React from 'react';
import {connect} from 'react-redux';
import {getSelectedUser,updateUserStatus} from '../../actions'
import {Link} from 'react-router-dom';

class UserView extends React.Component {
  
    state={status: this.props.store.auth.status}
    
    componentDidMount(){
        this.props.getSelectedUser(window.location.href.split('/').slice(-1)[0])
        console.log('USER ID is : ', window.location.href.split('/').slice(-1)[0])
        console.log(this.props.store)
    }
    
    getColorOnStatus(){
        switch(this.state.status){
            case 'Running late':
                return {marginTop:'15vh', border: "3px solid red", textAlign: "center"}
            case 'Arrived to the site':
                return {marginTop:'15vh', border: "3px solid #0ead0e3b", textAlign: "center"}
            default :
                return {marginTop:'15vh', border: "3px solid silver", textAlign: "center"}   
        }
    }
    onStatusChange=async(e)=>{
        const value= e.target.value
        await this.setState({status:value})
        await this.props.updateUserStatus(value)
        console.log(this.state)
    }
    render(){
        if(this.props.store.auth && this.props.store.auth.admin)
        console.log(this.props.store.auth)
        return(
                 <div key={this.props.store.auth._id} className="card mx-auto" style={this.getColorOnStatus()}>
                    <div className="btn-toolbar mb-3" role="toolbar" style={{ position: "fixed", right:"5px", top: "140px"  }}>
                        <div className="btn-group-vertical mr-2" role="group" aria-label="First group">
                           <Link to='/' className="btn btn-md btn-secondary">All</Link>
                        </div>
                    </div>
                    <div className='btn btn-lg btn-outline-info'>{this.props.store.auth.projects.slice(-1)[0].projectStartTime} -- {this.props.store.auth.projects.slice(-1)[0].projectStartDate} </div>
                      <h1>{this.props.store.auth.name}</h1>
                      <div className="card-body">
                        <h4 className="card-title"><i class="fas fa-globe-americas"></i>{this.props.store.auth.region}</h4>
                        <h4 >Project ID#:  {this.props.store.auth.projects.slice(-1)[0].projectId} </h4>
                        <h5 >Project Name: {this.props.store.auth.projects.slice(-1)[0].projectName} </h5>
                        <h5 className="card-text"><i class="fas fa-map-marked-alt"></i>{this.props.store.auth.installAddress}</h5>
                        <form className='col-md-9 col-sm-9 col-lg-9 mx-auto'>
                          <div class="form-group">
                            Project ID: <input  class="form-control" id="projectId" />
                           </div>
                          <div class="form-group">
                            Project Name <input class="form-control" id="projectName" />
                          </div>
                          <div class="form-group">
                            Start Date <input class="form-control" id="projectStartDate"/>
                          </div>
                          <div class="form-group">
                            Start Time <input class="form-control" id="projectStartTime" />
                          </div>
                          <button type="submit" class="btn btn-outline-info">Assign Install</button>
                        </form>
                      </div>
                      
                      <ul className="list-group list-group-flush">
                        <select 
                        
                            style = {this.getColorOnStatus() }
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
                        <li className="list-group-item">lat: {this.props.store.auth.lat}, lng: {this.props.store.auth.lng}</li>
                        <li className="list-group-item"><i class="fas fa-phone"></i> : {this.props.store.auth.phone}</li>
                        <li className="list-group-item"><i class="fas fa-envelope-open"></i>: {this.props.store.auth.email}</li>
                      </ul>
                      <div className="card-body">
                        <a href={`mailto: myPM@commscope.com?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link"> Commscope Manager: <i class="far fa-envelope-open"></i> </a>
                        <a href={`mailto: ${this.props.store.auth.directManagerEmail}?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link">
                            Direct Manager: <i class="far fa-envelope-open"></i> {this.props.store.auth.directManagerName}</a>
                      </div>
                </div>
          
            
            )
    }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,{getSelectedUser,updateUserStatus})(UserView)