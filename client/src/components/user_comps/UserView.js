import React from 'react';
import {connect} from 'react-redux';
import {getCurrentUser,updateUserStatus,changeProjectStatus} from '../../actions'
const year = new Date().getFullYear()
        const month = ()=>{ if(new Date().getMonth()<10) {return "0" + (new Date().getMonth()+1) } else {return new Date().getMonth()+1 } }
        const day = ()=>{ if(new Date().getDate()<10) {return "0" + new Date().getDate() } else {return new Date().getDate() } }
        const fullTodaysDate = year + "-" + month() + "-" + day()
        
class UserView extends React.Component {
  
    state={status: this.props.store.auth.status}
    
    componentDidMount(){
        this.props.getCurrentUser()
        // console.log(this.state)
    }
     
    renderStatusButtons=(status,projectId)=>{
        // console.log(status)
        switch(status){
            
            case "Arrived to the site":
                return (
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button onClick={()=>{this.onButtonClick('Awaiting tech',projectId)}} type="button" className="btn btn-outline-secondary">Awaiting tech</button>
                      <button type="button" className="btn btn-success">{status}</button>
                      <button onClick={()=>{this.onButtonClick('Arriving Late',projectId)}}  type="button" className="btn btn-outline-warning">Arriving Late</button>
                    </div>
                )
            case "Arriving Late":
                return (
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-outline-secondary">Awaiting tech</button>
                      <button type="button" className="btn btn-outline-success">Arrived to the site</button>
                      <button type="button" className="btn btn-warning">{status}</button>
                    </div>
                )    
            default :
            return (
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-secondary">{status}</button>
                      <button onClick={()=>{this.onButtonClick('Arrived to the site',projectId)}}  type="button" className="btn btn-outline-success">Arrived to the site</button>
                      <button onClick={()=>{this.onButtonClick('Arriving Late',projectId)}} type="button" className="btn btn-outline-warning">Arriving Late</button>
                    </div>
                )
        }
    }
    onButtonClick=(value,projectId)=>{
        // console.log(value,projectId)
        this.props.changeProjectStatus(value,projectId)
    }
    renderTodayProjectInfo=()=>{
        if(this.props.store.auth){
           if(this.props.store.auth.projects.filter((project)=>{return project.projectStartDate == fullTodaysDate}).length > 0 ){
            //   console.log('WE HAVE PROJECTS for TODAY')
                return this.props.store.auth.projects.filter((project)=>{return project.projectStartDate == fullTodaysDate}).map((project)=>{return (
                            <div key={project.projectId} className="btn btn-outline-dark col-md-12 col-xs-12 col-lg-12">  
                                <p >Project ID#:  {project.projectId} </p>
                                <p >Project Name: {project.projectName} </p>
                                <p className="card-text"><i className="fas fa-map-marked-alt"></i>{project.installAddress}</p>
                                <p><i className="fas fa-clock"></i> {project.projectStartTime} -- {project.projectStartDate} </p>
                                     { this.renderStatusButtons(project.status[project.status.length-1].projectStatus,project.projectId) }
                                <hr/>
                            </div>    
                        )})
           }else{
               return( <div key={Math.random()*100+"sde"} className="btn btn-outline-dark col-md-12 col-xs-12 col-lg-12">  
                                <p >Project ID#:  "No installs for today" </p>
                                <p >Project Name: "No installs for today"  </p>
                                <p className="card-text"><i className="fas fa-map-marked-alt"></i>"No installs for today" </p>
                                <p><i className="fas fa-clock"></i> "No installs for today"  -- "No installs for today"  </p>
                            </div>   
                            )
           }
        }
    }
    
    render(){
        if(!this.props.store.auth) return null;
        // console.log(this.props.store.auth)
        return(
                 <div  key={Math.random()*100+"sde"} className="card mx-auto" >
                 <div className="btn-group-vertical mr-2" role="group" aria-label="First group">
                  </div>
                    {this.props.store.auth.projectForToday.map((project)=>{return (
                       <div key={Math.random()*100+"sde"} className='btn btn-lg btn-outline-info'>{project.projectName} -- {project.projectStartTime} </div>
                    )})}
                      <h1>{this.props.store.auth.name}</h1>
                      <div className="card-body">
                        <h5 className="card-title"><i className="fas fa-globe-americas"></i>{this.props.store.auth.region}</h5>
                        
                        <h5>Total Projects Today: {this.props.store.auth.projectForToday.length}</h5>
                        {this.renderTodayProjectInfo()}
                        
                       
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">lat: {this.props.store.auth.lat}, lng: {this.props.store.auth.lng}</li>
                        <li className="list-group-item"><i className="fas fa-phone"></i> : {this.props.store.auth.phone}</li>
                        <li className="list-group-item"><i className="fas fa-envelope-open"></i>: {this.props.store.auth.email}</li>
                      </ul>
                      <div className="card-body">
                        <a href={`mailto: myPM@commscope.com?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link"> Commscope Manager: <i className="far fa-envelope-open"></i> </a>
                        <a href={`mailto: ${this.props.store.auth.directManagerEmail}?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link">
                            Direct Manager: <i className="far fa-envelope-open"></i> {this.props.store.auth.directManagerName}</a>
                      </div>
                </div>
          
            
            )
    }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,{getCurrentUser,updateUserStatus,changeProjectStatus})(UserView)