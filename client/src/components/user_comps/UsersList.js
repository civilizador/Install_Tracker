import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllUsers,updateUserStatus} from '../../actions'


    const year = new Date().getFullYear()
        const month = ()=>{ if(new Date().getMonth()<10) {return "0" + (new Date().getMonth()+1) } else {return new Date().getMonth()+1 } }
        const day = ()=>{ if(new Date().getDate()<10) {return "0" + new Date().getDate() } else {return new Date().getDate() } }
        const fullTodaysDate = year + "-" + month() + "-" + day()
    let alltechs =[]
    
class UsersList extends React.Component {
    
    state={status: this.props.store.auth.status ,alltechs:[]}

    componentDidMount(){
        this.props.fetchAllUsers()
        
    }
    renderAllTechs= (region)=>{
        if(this.props.store.allUsers)
         alltechs =  this.props.store.allUsers.filter((user)=>{return user.region==region})
         if(alltechs.length>0)
           return  alltechs.map((user)=>{
               const jobForToday = user.projects.filter((project)=>{return project.projectStartDate == fullTodaysDate}) 
               user.projectForToday = jobForToday
               console.log(jobForToday)
                    return (
                        <div key={user._id} className="card col-lg-3 col-md-4 col-sm-12 col-xs-12" style={this.getStyling(user.status)}>
                            <div className='btn btn-md btn-outline-info'>
                                    {user.projects.filter((project)=>{return project.projectStartDate == fullTodaysDate})[0].projectStartTime} -- {user.projects.filter((project)=>{return project.projectStartDate == fullTodaysDate})[0].projectStartDate} 
                                     <h5 className="card-title">{user.region}</h5>
                            </div>
                                  {this.renderLink(user.name,user._id)}
                                  <div className="card-body">
                                   
                                    <p ><b>Project ID#:</b>  {user.projectForToday[0].projectId} </p>
                                    <p ><b>Project Name:</b> {user.projectForToday[0].projectName} </p>
                                    <p ><b>Install Address:</b> {user.projectForToday[0].installAddress} </p>
                                   </div>
                                  <ul className="list-group list-group-flush">
                                    <li className="list-group-item btn btn-outline-info" >{user.status}</li> 
                                  
                                  </ul>
                                  <div className="card-body">
                                    <a href={`mailto: ${user.email}?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link"> Email Tech: <i className="far fa-envelope-open"></i> </a>
                                    <a href={`mailto: ${this.props.store.auth.directManagerEmail}?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link">
                                        Manager: <i className="far fa-envelope-open"></i> {this.props.store.auth.directManagerName}</a>
                             </div>
                        </div>
                )
            })
     
    }
        
    
    getStyling = async(status)=>{
        switch(status){
                    case 'Running late':
                        return { marginTop: "12vh", border: "3px solid red"}
                    case 'Arrived to the site':
                        return { marginTop: "12vh", border: "3px solid #0ead0e3b"}
                    default :
                        return {  marginTop: "12vh", border: "3px solid red"}    
                    }
    }
    onStatusChange=async(e)=>{
        const value= e.target.value
        await this.setState({status:value})
        await this.props.updateUserStatus(value)
     }
 
    renderLink=(name,id)=>{
        if(this.props.store.auth && this.props.store.auth.admin){
            return <Link to={ `/tech/${id}` } > <h1>{name}</h1> </Link>
        }else if(this.props.store.auth){
            return   <h1>{name}</h1>  
        }
    }
  
    render(){
            return(
                <div className='container' style={{width: "100%", paddingTop: "15vh"}}>
                    <h1>South East</h1><hr/>
                    <div className='row' style={{width: "100%"}}>
                        {this.renderAllTechs('South East')}
                    </div><br/>
                    <h1>South West</h1><hr/>
                    <div className='row' style={{width: "100%"}}>
                         {this.renderAllTechs('South West')}
                    </div><br/>
                    <h1>North East</h1><hr/>
                    <div className='row' style={{width: "100%"}}>
                        {this.renderAllTechs('North East')}
                    </div><br/>
                    <h1>Central</h1><hr/>
                    <div className='row' style={{width: "100%"}}>
                        {this.renderAllTechs('Central')}
                    </div><br/>  
                    <h1>California</h1><hr/>
                    <div className='row' style={{width: "100%"}}>
                        {this.renderAllTechs('California')}
                    </div><br/>     
                </div>
                )
           
     }       
      
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,{fetchAllUsers,updateUserStatus})(UsersList)


