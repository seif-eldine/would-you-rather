import React, { useEffect } from "react";
import {connect} from "react-redux";
import {showAnsweredQuestions, showUnansweredQuestions} from "../redux/questions/quesActions"
// import AnswersContainer from "./AnswersContainer";
//Component
import QuesContainer from "./QuesContainer";

function HomeContainer(props) {

  useEffect( () => {
    props.showTheUnanswered()
  }, []);


  const dataQues = props.questions.questions;
  const dataUser = props.receivedUsersFromState;

  const usersAnsweredQuestions = []
  const usersUnansweredQuestions = []

  let userId = ""
  const questions = [];

  for(let key in dataQues) {
    questions.push(dataQues[key]);
  }

  ////////////////////////////////////////////////////////////////////////////////////
  for(let record in dataUser){
    let loggingUserName = dataUser[record].name
    if(props.isLogged !== null && loggingUserName === props.isLogged){
      let id = dataUser[record].id
      userId = id
    }
  }
  
  for(let record in dataQues){
    if(dataQues[record].optionOne.votes.includes(userId) || dataQues[record].optionTwo.votes.includes(userId)){
      usersAnsweredQuestions.push(dataQues[record])
    } else {
      usersUnansweredQuestions.push(dataQues[record])
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////

  const avatarFinder = (ques) => {
    for(let rec in dataUser) {
      if(ques.author === dataUser[rec].id){
        return dataUser[rec].avatarURL
      }
    }
  }

  const nameFinder = (ques) => {
    for(let rec in dataUser) {
      if(ques.author === dataUser[rec].id){
        return dataUser[rec].name
      }
    }
  }

  const unAnsweredQuestShower = () => {
    props.showTheUnanswered()
  }

  const answeredQuestShower = () => {
    props.showTheAnswered()
  }

  function compareNumbers(a, b) {
    if(a.timestamp > b.timestamp){
      return -1;
    }
    if(a.timestamp < b.timestamp){
      return 1;
    }
    return 0;
  }

const unAnsweredAfterSorted = usersUnansweredQuestions.sort( compareNumbers );
const answeredAfterSorted = usersAnsweredQuestions.sort( compareNumbers );

  return (
    <div className='home-section'>
      <div className='home-container'>
        <div className='two-tabs'>
          <div className='unanswered-ques' onClick={() => unAnsweredQuestShower()}>Unanswered Questions</div>
          <div className='answered-ques' onClick={() => answeredQuestShower()}>Answered Questions</div>
        </div>
        <div className='ques-list'>
          {props.questionsShower ? 
          unAnsweredAfterSorted.map(ques => <QuesContainer key={ques.id} avatar={avatarFinder(ques)} id={ques.id} author={nameFinder(ques)} text={ques.optionOne.text} textOne={ques.optionOne.text} textTwo={ques.optionTwo.text} votesOne={ques.optionOne.votes} votesTwo={ques.optionTwo.votes}/>)
        : answeredAfterSorted.map(ques =>   <QuesContainer key={ques.id} avatar={avatarFinder(ques)} id={ques.id} author={nameFinder(ques)} text={ques.optionOne.text} textOne={ques.optionOne.text} textTwo={ques.optionTwo.text} votesOne={ques.optionOne.votes} votesTwo={ques.optionTwo.votes} />)}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    isLogged : state.users.loggedUser,
    receivedUsersFromState: state.users.users,
    questionsShower: state.questions.questionsToggler
  }
}


const mapDispatchToProps = dispatch => {
  return {
    showTheAnswered: () => dispatch(showAnsweredQuestions()),
    showTheUnanswered: () => dispatch(showUnansweredQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
