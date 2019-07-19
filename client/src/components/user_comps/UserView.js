import React from 'react';
import {connect} from 'react-redux';
import {getCurrentUser} from '../../actions'

class UserView extends React.Component {
    componentDidMount(){
        this.props.getCurrentUser()
    }
    getStyling(){
        switch(this.props.store.auth.installAddress){
            case 'Nothing is Assigned':
                return {width: "18rem", marginTop: "10vh", border: "3px solid silver"}
            default :
                return {width: "18rem", marginTop: "10vh", border: "3px solid lime"}    
        }
         
    }
    render(){
        if(this.props.store.auth)
        console.log(this.props.store.auth)
        return(
                 <div key={this.props.store.auth._id} class="card mx-auto" style={this.getStyling()}>
                      <h1>{this.props.store.auth.name}</h1>
                      <div className="card-body">
                        <h5 className="card-title">{this.props.store.auth.region}</h5>
                        <input value={this.props.store.auth.projectId}  />
                        <p className="card-text">{this.props.store.auth.installAddress}</p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <select>
                            <option>Heading To site</option>
                            <option>Arrived to the site</option>
                            <option>Running late</option>
                        </select>
                        <li className="list-group-item">{this.props.store.auth.lat}{this.props.store.auth.lng}</li>
                        <li className="list-group-item">{this.props.store.auth.phone}</li>
                        <li className="list-group-item">{this.props.store.auth.email}</li>
                      </ul>
                      <div className="card-body">
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                      </div>
                </div>
          
            
            )
    }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,{getCurrentUser})(UserView)