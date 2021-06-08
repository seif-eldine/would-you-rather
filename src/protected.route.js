import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { urlRequested } from './redux/users/usersActions'
import {connect} from "react-redux";


const ProtectedRoute = ({component: Component, isLogged,shipUrl, ...rest}) => {
    return (
        <Route {...rest} 
        render={
            (props) => {
                if(isLogged){
                   return <Component {...props} />
                }else{
                    const searchedParams = props.location.pathname
                    shipUrl(searchedParams)
                    return <Redirect to={{pathname: "/"}} />
                }
            }
        } />
    )
}

const mapStateToProps = state => {
    return {
      isLogged : state.users.loggedUser,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        shipUrl: (urlShipped) => dispatch(urlRequested(urlShipped))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
