import  React  from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {logUserOut} from "../redux/users/usersActions"
import { withRouter } from 'react-router-dom';


function HeaderContainer(props) {
  return (
    <div >
      <nav>
        <div className='left-side'>
          <ul>
            <li><Link to="/questions">Home</Link></li>
            <li><Link to="/add">New Question</Link></li>
            <li><Link to="/leaderboard">Leader Board</Link></li>
          </ul>
        </div>
        <div className='right-side'>
          {props.isLogged ? <ul>
            <li>Hello, {props.isLogged} <img alt="" /></li>
            <li onClick={() => {
              props.logoutUser()
              props.history.push('/')
            }}>Logout</li>
          </ul> : ''}
          
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLogged : state.users.loggedUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logUserOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderContainer));
