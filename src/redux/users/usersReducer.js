const initialState = {
  users: {},
  loggedUser: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "gotUsers":
      return {
        ...state,
        users: action.payload,
      };

      case "login":
        return {
          ...state,
          loggedUser: action.payload
        };

      case "logout":
        return {
          ...state,
          loggedUser: null
        }

    default:
      return state;
  }
};

export default usersReducer;
