import React from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers} from '../../actions'

class UsersList extends React.Component {
    componentDidMount(){
        this.props.fetchAllUsers()
    }
    render(){
        if(this.props.store.auth)
        console.log(this.props.store.auth)
        return(
            this.props.store.allUsers.map((user)=>{
                return (
                    <div key={user._id} class="card" style={{width: "18rem"}}>
                      <h1>{user.name}</h1>
                      <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
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

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,{fetchAllUsers})(UsersList)