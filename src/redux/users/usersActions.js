import { _getUsers } from "../../_DATA";

export const gotUsers = (users) => {
  return {
    type: "gotUsers",
    payload: users,
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    const usersRespone = await _getUsers();
    dispatch(gotUsers(usersRespone));
  };
};

export const logUserIn = (user) => {
  return {
    type: "login",
    payload: user
  }
}

export const logUserOut = () => {
  return {
    type: "logout",
  }
}