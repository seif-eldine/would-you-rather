const initialState = {
  questions: {},
  answer: "",
  users: {},
  questionsToggler: true
};

const quesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "gettingQuestions":
      return {
        ...state,
        loading: true,
      };

    case "gotQuestions":
      return {
        ...state,
        loading: false,
        questions: action.payload,
      };

    case "addQuestion":
      const questionsData = { ...state.questions };
      questionsData[action.payload.id] = action.payload;
      return {
        ...state,
        loading: false,
        questions: questionsData,
      };

    case "showAnswered":
      return {
        ...state,
        questionsToggler: false
      }

    case "showUnanswered":
      return {
        ...state,
        questionsToggler: true
      }

    case "answerSaved":
      return {
        ...state,
        questions: action.payload
      }

    default:
      return state;
  }
};

export default quesReducer;
