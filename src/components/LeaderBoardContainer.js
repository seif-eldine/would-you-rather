import React, { useEffect } from "react";
import {connect} from "react-redux";
import LBBoxContainer from "./LBBoxContainer";
import {getUsers} from '../redux/users/usersActions'

function LeaderBoardContainer(props) {

  useEffect( () => {
    props.fetchUsers()
  }, []);

  const allUsers = [];
  const data = props.receivedUsersFromState

  for(let key in data) {
    allUsers.push(data[key]);
  }

function compare( a, b ) {
  const aAnswersCount = Object.keys(a.answers).length
  const aQuestionsCount = a.questions.length
  const aCombinedCounts = (aAnswersCount+aQuestionsCount)

  const bAnswersCount = Object.keys(b.answers).length
  const bQuestionsCount = b.questions.length
  const bCombinedCounts = (bAnswersCount+bQuestionsCount)
  if ( aCombinedCounts > bCombinedCounts ){
    return -1;
  }
  if ( aCombinedCounts < bCombinedCounts ){
    return 1;
  }
  return 0;
}

const allUsersSorted = allUsers.sort( compare );

  return (
    <div className="LBBox-section">
      {allUsersSorted.map(user => <LBBoxContainer key={user.id} name={user.name} avatar={user.avatarURL} answers={user.answers} questions={user.questions} />)}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    receivedUsersFromState: state.users.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(getUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardContainer);
