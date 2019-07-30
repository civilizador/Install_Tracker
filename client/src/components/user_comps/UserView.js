import React from 'react';
import {connect} from 'react-redux';
import {getCurrentUser,updateUserStatus,changeProjectStatus} from '../../actions'

        
class UserView extends React.Component {
  
    state={status: this.props.store.auth.status}
    
    componentDidMount(){
        this.props.getCurrentUser()
        console.log(this.state)
    }
    getColorOnStatus(){
        switch(this.state.status){
            case 'Running late':
                return {border: "3px solid red", textAlign: "center"}
            case 'Arrived to the site':
                return {border: "3px solid #0ead0e3b", textAlign: "center"}
            default :
                return {border: "3px solid silver", textAlign: "center"}   
        }
    }
    renderStatusButtons=(status,projectId)=>{
        console.log(status)
        switch(status){
            case "Awaiting tech":
                return (
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary">{status}</button>
                      <button onClick={()=>{this.onButtonClick('Arrived to the site',projectId)}}  type="button" class="btn btn-outline-success">Arrived to the site</button>
                      <button onClick={()=>{this.onButtonClick('Arriving Late',projectId)}} type="button" class="btn btn-outline-warning">Arriving Late</button>
                    </div>
                )
            case "Arrived to the site":
                return (
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button onClick={()=>{this.onButtonClick('Awaiting tech',projectId)}} type="button" class="btn btn-outline-secondary">Awaiting tech</button>
                      <button type="button" class="btn btn-success">{status}</button>
                      <button onClick={()=>{this.onButtonClick('Arriving Late',projectId)}}  type="button" class="btn btn-outline-warning">Arriving Late</button>
                    </div>
                )
            case "Arriving Late":
                return (
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary">Awaiting tech</button>
                      <button type="button" class="btn btn-outline-success">Arrived to the site</button>
                      <button type="button" class="btn btn-warning">{status}</button>
                    </div>
                )    
            default :
            return (
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary">status</button>
                      <button type="button" class="btn btn-outline-secondary">Middle</button>
                      <button type="button" class="btn btn-outline-secondary">Right</button>
                    </div>
                )
        }
    }
    onButtonClick=(value,projectId)=>{
        console.log(value,projectId)
        this.props.changeProjectStatus(value,projectId)
    }
    
    
    render(){
        if(this.props.store.auth)
        console.log(this.props.store.auth)
        return(
                 <div key={this.props.store.auth._id} className="card mx-auto" style={this.getColorOnStatus()}>
                    {this.props.store.auth.projectForToday.map((project)=>{return (
                       <div className='btn btn-lg btn-outline-info'>{project.projectName} -- {project.projectStartTime} </div>
                    )})}
                      <h1>{this.props.store.auth.name}</h1>
                      <div className="card-body">
                        <h5 className="card-title"><i class="fas fa-globe-americas"></i>{this.props.store.auth.region}</h5>
                        <h5>Total Projects Today: {this.props.store.auth.projectForToday.length}</h5>
                        
                        {this.props.store.auth.projectForToday.map((project)=>{return (
                            <div className="btn btn-outline-dark col-md-8 col-xs-12 col-lg-8">  
                                <p >Project ID#:  {project.projectId} </p>
                                <p >Project Name: {project.projectName} </p>
                                <p className="card-text"><i class="fas fa-map-marked-alt"></i>{project.installAddress}</p>
                                <p><i class="fas fa-clock"></i> {project.projectStartTime} -- {project.projectStartDate} </p>
                                     { this.renderStatusButtons(project.status[project.status.length-1].projectStatus,project.projectId) }
                                <hr/>
                            </div>    
                        )})}
                       
                      </div>
                      <ul className="list-group list-group-flush">
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

export default connect(mapStateToProps,{getCurrentUser,updateUserStatus,changeProjectStatus})(UserView)