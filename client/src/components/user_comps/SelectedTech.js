import React from 'react';
import {connect} from 'react-redux';
import {getSelectedUser,addProjectToTech,removeJob} from '../../actions'
import {Link,Redirect} from 'react-router-dom';
const year = new Date().getFullYear()
        const month = ()=>{ if(new Date().getMonth()<10) {return "0" + (new Date().getMonth()+1) } else {return new Date().getMonth()+1 } }
        const day = ()=>{ if(new Date().getDate()<10) {return "0" + new Date().getDate() } else {return new Date().getDate() } }
        const fullTodaysDate = year + "-" + month() + "-" + day()
class UserView extends React.Component {
  
    state={submitted:false,projectId:'',projectName: '',projectStartDate:'',projectStartTime:'',
            installAddress:'',orderHistory:false,
            status:[{projectStatus:"Awaiting tech", timeStamp: new Date(), location:{lat:'not provided',lng:'not provided'} }]  
    }
 
    onInputChange=(e)=>{
        this.setState({[e.target.id]:e.target.value})
        console.log(this.state)
    }
    
    onFormSubmit=(userId)=>{
        console.log(userId)
        this.props.addProjectToTech(this.state,userId)
        this.setState({projectId:'',projectName: '',projectStartDate:'',projectStartTime:'',installAddress:''})
     }
 
    renderOrderHistory=(selectedUser)=>{
        if(this.state.orderHistory){
            return selectedUser.projects.map((project)=>{
                                  return (
                                      <button  class="list-group-item list-group-item-action btn btn-outline-dark">
                                        <span className="float-left">{project.projectId} - {project.projectName}</span> 
                                        <br/> 
                                        <span className="float-left">{project.installAddress} </span>
                                        <span className="float-left">{project.projectStartDate} </span>
                                        <i style={{fontSize:'22px'}} class="fas fa-times-circle float-right" onClick={()=>{this.props.removeJob(selectedUser._id,project.projectId)}}></i>
                                      </button>
                                   )
                                })
        }else{
            return
        }
    }
    
    renderTech= ()=>{
    if(this.props.store.allUsers){
        console.log("TODAYS DATE:  ",fullTodaysDate )
        const userId=   window.location.href.split('/').slice(-1)[0]
        console.log('USER ID is : ', userId)
        const selectedUser =    this.props.store.allUsers.find( (user)=>{return user._id===userId} )
        
        selectedUser.projectForToday  =  this.props.store.allUsers.find( (user)=>{return user._id===userId} ).projects.filter((project)=>{return project.projectStartDate === fullTodaysDate })
        console.log('PROJECT FOR TODAY:   ', selectedUser.projectForToday)
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
        if(this.props.store.auth && selectedUser){
             return(
                 <div key={selectedUser._id} className="card mx-auto" style={style()}>
                    <div className="btn-toolbar mb-3" role="toolbar" style={{ position: "fixed", right:"5px", top: "140px"  }}>
                        <div className="btn-group-vertical mr-2" role="group" aria-label="First group">
                           <Link to='/' className="btn btn-md btn-secondary">All</Link>
                        </div>
                     </div>
                    <div className='btn btn-lg btn-outline-info'>{
                        <div>
                            <h1>{selectedUser.name}</h1>
                            <h4 className="card-title"><i class="fas fa-globe-americas"></i>{selectedUser.region}</h4>                        
                        </div>
                    } </div>
                      
                      <div className="card-body ">
                        <div className="btn btn-outline-dark col-md-8 col-xs-12 col-lg-8">
                            <h3> Installs for Today : {selectedUser.projectForToday.length}</h3><hr/>
                                
                                {
                                    selectedUser.projectForToday.map((todaysProject)=>{
                                        return(
                                            <div>
                                                <h4 >Project ID#:  {todaysProject.projectId} </h4>
                                                <h5 >Project Name: {todaysProject.projectName} </h5>
                                                <h5 className="card-text"><i class="fas fa-map-marked-alt"></i>Install Address: {todaysProject.installAddress}</h5>
                                                <h5 >Project Start Time: {todaysProject.projectStartTime} </h5>
                                                <hr/>
                                            </div>
                                            
                                        )
                                    })
                                }
                                
                        <br/>
                        </div>
                        <div class="list-group col-md-9 mx-auto" style={{marginTop:"2vh",marginBottom:"2vh"}}>
                        <button onClick={   
                                    ()  =>  {   
                                        if(!this.state.orderHistory){
                                            this.setState({orderHistory:true})
                                        }else{this.setState({orderHistory:false})}
                                    }    
                                } 
                            className="col-md-12 col-sm-12 col-xs-12 btn btn-outline-dark">Show All Assigned Installs <i class="fas fa-arrow-circle-down"></i>
                        </button>
                              {this.renderOrderHistory(selectedUser)}
                        </div>
                         <ul className="list-group list-group-flush">
                            <li className="list-group-item" ><b> Arrival Status:  {selectedUser.status} </b></li>
                            <li className="list-group-item">Last Recorded Location: <br/> lat: {selectedUser.lat}, lng: {selectedUser.lng}</li>
                            <li className="list-group-item"><i class="fas fa-phone"></i> : {selectedUser.phone}</li>
                            <li className="list-group-item"><i class="fas fa-envelope-open"></i>: {selectedUser.email}</li>
                        </ul>
                        <button style={{marginTop:"2vh",marginBottom:"2vh"}}  className="col-md-12 col-sm-12 col-xs-12 btn btn-outline-dark">Assign new Project </button>
                        <form  className='col-md-10 col-sm-10 col-lg-10 mx-auto'>
                          <div className="form-group col-md-6 col-sm-6 col-xs-12 col-lg-6 float-left">
                            Project ID: <input value={this.state.projectId} onChange={this.onInputChange} class="form-control" id="projectId" />
                           </div>
                          <div className="form-group col-md-6 col-sm-6 col-xs-12 col-lg-6 float-left">
                            Project Name: <input value={this.state.projectName} onChange={this.onInputChange} class="form-control" id="projectName" />
                          </div>
                          <div className="form-group col-md-6 col-sm-6 col-xs-12 col-lg-6 float-left">
                            Project Address: <input type='text' value={this.state.installAddress} onChange={this.onInputChange}  class="form-control" id="installAddress" />
                          </div>
                          <div className="form-group col-md-6 col-sm-6 col-xs-12 col-lg-6 float-left">
                            Start Date <input type='date' value={this.state.projectStartDate} onChange={this.onInputChange} class="form-control" id="projectStartDate"/>
                          </div>
                          <div className="form-group col-md-6 col-sm-6 col-xs-12 col-lg-6 float-left">
                            Start Time <input type='time' value={this.state.projectStartTime} onChange={this.onInputChange}  class="form-control" id="projectStartTime" />
                          </div>
                        </form>
                        <button onClick={()=>{this.onFormSubmit(selectedUser._id)} } class="btn btn-outline-info col-md-8 col-sm-8 col-xs-12 col-lg-8 mx-auto">Assign Install</button>


                      </div>
                      
                     
                      <div className="card-body">
                        <a href={`mailto: myPM@commscope.com?Subject=${'Issue with install : '}${selectedUser.projectId}${selectedUser.projectName}` } className="card-link"> Commscope Manager: <i class="far fa-envelope-open"></i> </a>
                        <a href={`mailto: ${selectedUser.directManagerEmail}?Subject=${'Issue with install : '}${selectedUser.projectId}${selectedUser.projectName}` } className="card-link">
                            Direct Manager: <i class="far fa-envelope-open"></i> {selectedUser.directManagerName}</a>
                      </div>
                </div>
            
            )
        }
        
        }else{ return <Redirect to='/'/> }
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

export default connect(mapStateToProps,{getSelectedUser,addProjectToTech,removeJob})(UserView)