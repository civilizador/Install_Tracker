import React from 'react';
import {connect} from 'react-redux';


class UsersList extends React.Component {
    render(){
        return(
            <h1> USERS LIST </h1>
            )
    }
}

const mapStateToProps = (store) => ({store})

export default connect(mapStateToProps,null)(UsersList)