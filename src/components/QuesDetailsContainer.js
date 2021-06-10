import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { saveQuestionAnswer } from "../redux/questions/quesActions";
import ProgressBar from './ProgressBar';

const styleObj = {
  color: "#a69c22",
  border: "2px solid #a69c22",
  borderRadius: "26px",
  backgroundColor: "#e6ebf0"
}

function QuesDetailsContainer(props) {

  const history = useHistory();

  const data = props.questions.questions;
  const questions = [];
  const dataUser = props.receivedUsersFromState;

  for (let key in data) {
    questions.push(data[key]);
  }

  const paramsId = props.match.params.question_id

  let choosenQues = null;
  let optOne = "";
  let optTwo = "";

  for(let quest of questions){
    if(quest.id === paramsId){
      choosenQues = quest
    }
  }

  if(choosenQues === null){
    history.push('/not-found')
  } else {
    optOne = choosenQues.optionOne.text;
    optTwo = choosenQues.optionTwo.text;
  }
 
  // Creating the functional components to extract ( Avatar - Name )

  const avatarFinder = (choosenQues) => {
    for (let rec in dataUser) {
      if(choosenQues === null) return

      if (choosenQues.author === dataUser[rec].id) {
        return dataUser[rec].avatarURL;
      }
    }
  };

  const nameFinder = (choosenQues) => {
    for (let rec in dataUser) {
      if(choosenQues === null) return
      if (choosenQues.author === dataUser[rec].id) {
        return dataUser[rec].name;
      }
    }
  };

  //////////////////// -- end of the functional components -- ////////////////////

  // Below is Results Section >>

  function getPercentage(optionVotes, totalVotes) {
    const num = optionVotes * 100 / totalVotes
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  let userId = ""

  for(let record in dataUser){
    let loggingUserName = dataUser[record].name
    if(props.isLogged !== null && loggingUserName === props.isLogged){
      let id = dataUser[record].id
      userId = id
    }
  }

  let soloElement = choosenQues

  let oneVotes = soloElement ? soloElement.optionOne.votes.length : 0
  let twoVotes = soloElement ? soloElement.optionTwo.votes.length : 0
  let textOne = soloElement ? soloElement.optionOne.text : ''
  let textTwo = soloElement ? soloElement.optionTwo.text : ''
  let totalVotes = oneVotes + twoVotes

  let optionOneChoosen = false;
  let optionTwoChoosen = false;

  if(soloElement){
    if(props.isLogged && soloElement.optionOne.votes.includes(userId)){
      optionOneChoosen = true;
    } else if (props.isLogged && soloElement.optionTwo.votes.includes(userId)) { 
      optionTwoChoosen = true
    }
  
  }
  

  const isItAQuestion = () => { 
    if(optionOneChoosen || optionTwoChoosen){
      return false 
    }
      return true
  }

  const submission = (e) => {
    e.preventDefault();

    const inpValue = document.querySelector('input[name="ques"]:checked').value;

    const answerObj = {
      authedUser: userId,
      qid: paramsId,
      answer: inpValue,
    };
    props.submitAnswer(answerObj);
    setTimeout(() => {
      props.history.push(
        `/questions/${paramsId}`
      );
    }, 
    200);
  };

  return (
    isItAQuestion() ? (
    <div className='ques-section'>
      <div className='question'>
        <div className='heading'>
          <h3>{nameFinder(choosenQues)}</h3>
        </div>
        <div className='img-part'>
          <img src={avatarFinder(choosenQues)} height={100} width={100} alt='avatar'/>
        </div>
        <div className='poll-part'>
          <h3>Would you rather ...</h3>
          <form onSubmit={(e) => submission(e)}>
            <input type='radio' id='quesOne' name='ques' value='optionOne' />
            <label htmlFor='quesOne'>{optOne}</label> <br />
            <input type='radio' id='quesTwo' name='ques' value='optionTwo' />
            <label htmlFor='quesTwo'>{optTwo}</label>
            <button type='submit' className='poll-link'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>) : (<div className='ques-section'>
      <div className='question'>
        <div className='heading'>
          <h3>{nameFinder(choosenQues)}</h3>
        </div>
        <div className='img-part'>
          <img src={avatarFinder(choosenQues)} height={100} width={100} alt='avatar' />
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
    </div>)
  );
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
    isLogged : state.users.loggedUser,
    receivedUsersFromState: state.users.users,
    answer: state.answer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitAnswer: (answerObj) => dispatch(saveQuestionAnswer(answerObj)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(QuesDetailsContainer);
