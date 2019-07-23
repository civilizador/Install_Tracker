import React from 'react';
import {connect} from 'react-redux';
import {getSelectedUser,updateUserStatus} from '../../actions'

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
        if(this.props.store.auth)
        console.log(this.props.store.auth)
        return(
                 <div key={this.props.store.auth._id} className="card mx-auto" style={this.getColorOnStatus()}>
                    <div className='btn btn-lg btn-outline-info'>{this.props.store.auth.projects.slice(-1)[0].projectStartTime} -- {this.props.store.auth.projects.slice(-1)[0].projectStartDate} </div>
                      <h1>{this.props.store.auth.name}</h1>
                      <div className="card-body">
                        <h5 className="card-title"><i class="fas fa-globe-americas"></i>{this.props.store.auth.region}</h5>
                        <p >Project ID#:  {this.props.store.auth.projects.slice(-1)[0].projectId} </p>
                        <p >Project Name: {this.props.store.auth.projects.slice(-1)[0].projectName} </p>
                        <p className="card-text"><i class="fas fa-map-marked-alt"></i>{this.props.store.auth.installAddress}</p>
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