import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchAllUsers,updateUserStatus} from '../../actions'

class UsersList extends React.Component {
    
    state={status: this.props.store.auth.status}

    componentDidMount(){
        this.props.fetchAllUsers()
    }
    renderAllTechs= (region)=>{
        const alltechs =  this.props.store.allUsers.filter((user)=>{return user.region==region})
        console.log(alltechs)
        if(alltechs.length>0)
           return  alltechs.map((user)=>{
                    return (
                        <div key={user._id} class="card col-lg-3 col-md-4 col-sm-12 col-xs-12" style={this.getStyling(user.status)}>
                            <div className='btn btn-md btn-outline-info'>{user.projects.slice(-1)[0].projectStartTime} -- {user.projects.slice(-1)[0].projectStartDate} </div>
                                  {this.renderLink(user.name,user._id)}
                                  <div className="card-body">
                                    <h5 className="card-title">{user.region}</h5>
                                    <p >Project ID#:  {user.projects.slice(-1)[0].projectId} </p>
                                    <p >Project Name: {user.projects.slice(-1)[0].projectName} </p>
                                    <p >Install Address: {user.projects.slice(-1)[0].installAddress} </p>
                                    <p className="card-text">{user.installAddress}</p>
                                  </div>
                                  <ul className="list-group list-group-flush">
                                    <li className="list-group-item btn btn-outline-info" >{user.status}</li> 
                                  
                                  </ul>
                                  <div className="card-body">
                                    <a href={`mailto: ${user.email}?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link"> Email Tech: <i class="far fa-envelope-open"></i> </a>
                                    <a href={`mailto: ${this.props.store.auth.directManagerEmail}?Subject=${'Issue with install : '}${this.props.store.auth.projectId}${this.props.store.auth.projectName}` } className="card-link">
                                        Manager: <i class="far fa-envelope-open"></i> {this.props.store.auth.directManagerName}</a>
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
        console.log(this.state)
    }
    assignJob=async(userId)=>{
        console.log('AssignJob to User : ',userId)
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


