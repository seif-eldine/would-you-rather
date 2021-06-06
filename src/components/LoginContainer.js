import  React  from "react";
import {connect} from "react-redux";
import {logUserIn, logUserOut} from "../redux/users/usersActions"

function LoginContainer(props) {

  const usersInState = props.receivedUsersFromState
  const usersAvailable = []

  for(let key in usersInState){
    usersAvailable.push(usersInState[key].name)
  }

const handleSubmission = (e) => {
  e.preventDefault();
  const userId = document.getElementById('userOption').value
  props.loginUser(userId)
  setTimeout(() => {
    props.history.push('/questions')
  }, 400)
}

  return (
    <div className="login-box-section">
      <div className='login-box'>
        <h2>Welcome to The Would You Rather App!</h2>
        <h4>Please sign up to continue</h4>

        <div className='login-form'>
          <h3>Sign in</h3>
          <form onSubmit={(e)=> handleSubmission(e)}>
            <select id="userOption">
              {usersAvailable.map(username => <option key={username} name={username} value={username}>{username}</option> )}
            </select>
            <br />
            <button type="submit" >Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLogged : state.users.loggedUser,
    receivedUsersFromState: state.users.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user) => dispatch(logUserIn(user)),
    logoutUser: () =>    dispatch(logUserOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
