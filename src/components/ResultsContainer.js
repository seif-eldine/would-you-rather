import  React  from "react";
import {connect} from "react-redux";
import ProgressBar from './ProgressBar';

function getPercentage(optionVotes, totalVotes) {
  const num = optionVotes * 100 / totalVotes
  return (Math.round(num * 100) / 100).toFixed(2)
}

const styleObj = {
  color: "#a69c22",
  border: "2px solid #a69c22",
  borderRadius: "26px",
  backgroundColor: "#e6ebf0"
}

function ResultsContainer(props) {

  const dataUser = props.receivedUsersFromState;
  let userId = ""

  for(let record in dataUser){
    let loggingUserName = dataUser[record].name
    if(props.loggedUser !== null && loggingUserName === props.loggedUser){
      let id = dataUser[record].id
      userId = id
    }
  }

  const data = props.questions.questions;
  const questions = [];

  for(let key in data) {
    questions.push(data[key]);
  }

  const choosenQues = questions.filter(ques => ques.id === props.match.params.question_id)

  let soloElement = choosenQues[0]

  let oneVotes = soloElement ? soloElement.optionOne.votes.length : 0
  let twoVotes = soloElement ? soloElement.optionTwo.votes.length : 0
  let theAuthor = soloElement ? soloElement.author : ''
  let textOne = soloElement ? soloElement.optionOne.text : ''
  let textTwo = soloElement ? soloElement.optionTwo.text : ''
  let totalVotes = oneVotes + twoVotes

  let optionOneChoosen = false;
  let optionTwoChoosen = false;

  if(props.loggedUser && soloElement.optionOne.votes.includes(userId)){
    optionOneChoosen = true;
  } else if (props.loggedUser && soloElement.optionTwo.votes.includes(userId)) { 
    optionTwoChoosen = true
  }

  const avatarFinder = (choosenQues) => {
    for (let rec in dataUser) {
      if (choosenQues === dataUser[rec].id) {
        return dataUser[rec].avatarURL;
      }
    }
  };

  const nameFinder = (choosenQues) => {
    for (let rec in dataUser) {
      if (choosenQues === dataUser[rec].id) {
        return dataUser[rec].name;
      }
    }
  };


  return (
    <div className='ques-section'>
      <div className='question'>
        <div className='heading'>
          <h3>{nameFinder(theAuthor)}</h3>
        </div>
        <div className='img-part'>
          {/* <img src={require('../assets/klipartz.com.png').default} height={100} width={100} alt="avatar"/> */}
          <img src={avatarFinder(theAuthor)} height={100} width={100} alt='avatar' />
        </div>
        <div className='poll-part'>
          <h3>Results</h3>
          <div className='ques-one-box'>
            <p>{textOne}</p>
            <div className='progress-bar'>
                <ProgressBar
                  completion={getPercentage(oneVotes, totalVotes)}
                />
            </div>
            <h4> {oneVotes} out of {totalVotes} votes</h4>
            {optionOneChoosen && <h3 style={styleObj}>You Voted This</h3>}
          </div>
          <div className='ques-two-box'>
          <p>{textTwo}</p>
            <div className='progress-bar'>
                <ProgressBar
                  completion={getPercentage(twoVotes, totalVotes)}
                />
            </div>
            <h4> {twoVotes} out of {totalVotes} votes</h4>
            {optionTwoChoosen && <h3 style={styleObj}>You Voted This</h3>}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    answer: state.answer,
    loggedUser: state.users.loggedUser,
    receivedUsersFromState: state.users.users,
  }
}

export default connect(mapStateToProps)(ResultsContainer);
