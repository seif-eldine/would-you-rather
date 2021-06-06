import React from "react";
import { connect } from "react-redux";

// Actions
import { creatingQuestion } from "../redux/questions/quesActions";

function NewQuesContainer(props) {

  const dataUser = props.receivedUsersFromState;

  const creation = () => {
    const firstInp = document.getElementById("quesOne");
    const secondInp = document.getElementById("quesTwo");

    const quesObj = {
      optionOneText: firstInp.value,
      optionTwoText: secondInp.value,
      author: idFinder(props.isLogged),
    };
    props.creatingQuest(quesObj);
    props.history.push('/questions')
  };

  const idFinder = (loggedUser) => {
    for(let rec in dataUser) {
      if(loggedUser === dataUser[rec].name){
        return dataUser[rec].id
      }
    }
  }

  return (
    <div className='newQues-section'>
      <div className='newQues-container'>
        <div className='newQues'>
          <h2>Create New Question</h2>
          <hr />

          <div>
            <h5>Complete the question:</h5>
            <h3>Would you rather ...</h3>
            <form>
              <input
                type='text'
                id='quesOne'
                placeholder='Enter option one text here'
              />
              <h3>OR</h3>
              <input
                type='text'
                id='quesTwo'
                placeholder='Enter option two text here'
              />{" "}
              <br />
              <button type='button' onClick={() => creation()}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    receivedUsersFromState: state.users.users,
    isLogged : state.users.loggedUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creatingQuest: (question) => dispatch(creatingQuestion(question)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewQuesContainer);
