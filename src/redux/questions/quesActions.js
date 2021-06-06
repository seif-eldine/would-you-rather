import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  
} from "../../_DATA";

export const addQues = (firstInp, secondInp) => {
  return {
    type: "addQues",
    payload: {
      firstInp,
      secondInp,
    },
  };
};

export const getQuesRequest = () => {
  return {
    type: "gettingQuestions",
  };
};

export const getQuesSuccess = (allQuests) => {
  return {
    type: "gotQuestions",
    payload: allQuests,
  };
};

export const getQuestions = () => {
  return async (dispatch) => {
    dispatch(getQuesRequest);
    const getQuestionsResponse = await _getQuestions();
    dispatch(getQuesSuccess(getQuestionsResponse));
  };
};

// For Creating a New Question !

export const createdQuestion = (newQues) => {
  return {
    type: "addQuestion",
    payload: newQues,
  };
};

export const creatingQuestion = (quesInProcess) => {
  return async (dispatch) => {
    const quesCreationResponse = await _saveQuestion(quesInProcess);
    dispatch(createdQuestion(quesCreationResponse));
  };
};

export const answerSaved = (newQuestions) => {
  return {
    type: "answerSaved",
    payload: newQuestions
  };
};

export const saveQuestionAnswer = (answerInProcess) => {
  return async (dispatch) => {
    await _saveQuestionAnswer(answerInProcess);
    let receivedQuestions = await _getQuestions()
    dispatch(answerSaved(receivedQuestions));
  };
};



export const showAnsweredQuestions = () => {
  return { 
    type: "showAnswered"
  }
}

export const showUnansweredQuestions = () => {
  return { 
    type: "showUnanswered"
  }
}