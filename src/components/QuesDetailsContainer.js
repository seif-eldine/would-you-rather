import React from "react";
import { connect } from "react-redux";
import { saveQuestionAnswer } from "../redux/questions/quesActions";

function QuesDetailsContainer(props) {

  const data = props.questions.questions;
  const questions = [];
  const dataUser = props.receivedUsersFromState;

  for (let key in data) {
    questions.push(data[key]);
  }

  const choosenQues = questions.filter(
    (ques) => ques.id === props.match.params.question_id
  );
  let optOne = "";
  let optTwo = "";

  if (choosenQues.length > 0) {
    optOne = choosenQues[0].optionOne.text;
    optTwo = choosenQues[0].optionTwo.text;
  }

  const avatarFinder = (choosenQues) => {
    for (let rec in dataUser) {
      if (choosenQues[0].author === dataUser[rec].id) {
        return dataUser[rec].avatarURL;
      }
    }
  };

  const nameFinder = (choosenQues) => {
    for (let rec in dataUser) {
      if (choosenQues[0].author === dataUser[rec].id) {
        return dataUser[rec].name;
      }
    }
  };

  const idFinder = (loggedUser) => {
    for(let rec in dataUser) {
      if(loggedUser === dataUser[rec].name){
        return dataUser[rec].id
      }
    }
  }

  const submission = (e) => {
    e.preventDefault();

    const inpValue = document.querySelector('input[name="ques"]:checked').value;

    const answerObj = {
      authedUser: idFinder(props.isLogged),
      qid: props.match.params.question_id,
      answer: inpValue,
    };

    props.submitAnswer(answerObj);

    setTimeout(() => {
      props.history.push(
        `/questions/${props.match.params.question_id}/results`
      );
    }, 
    500);
  };

  return (
    <div className='ques-section'>
      <div className='question'>
        <div className='heading'>
          <h3>{nameFinder(choosenQues)}</h3>
        </div>
        <div className='img-part'>
          <img
            src={avatarFinder(choosenQues)}
            height={100}
            width={100}
            alt='avatar'
          />
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
    </div>
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
    // sendAnswer: (optionValue) => dispatch(setAnswer(optionValue)),
    submitAnswer: (answerObj) => dispatch(saveQuestionAnswer(answerObj)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(QuesDetailsContainer);
