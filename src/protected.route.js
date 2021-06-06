import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {connect} from "react-redux";


const ProtectedRoute = ({component: Component, isLogged, ...rest}) => {
    return (
        <Route {...rest} 
        render={
            (props) => {
                if(isLogged){
                   return <Component {...props} />
                }else{
                    return <Redirect to={ {
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }
                    } />
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

export default connect(mapStateToProps)(ProtectedRoute);
