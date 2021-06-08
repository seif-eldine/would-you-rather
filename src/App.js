import "./App.css";
import React, { useEffect } from "react";

import HeaderContainer from "./components/HeaderContainer";
import HomeContainer from "./components/HomeContainer";
import NewQuesContainer from "./components/NewQuesContainer";
import LeaderBoardContainer from "./components/LeaderBoardContainer";

import { useDispatch} from "react-redux";
import { getQuestions } from "../src/redux/questions/quesActions";
import { getUsers } from "../src/redux/users/usersActions"

import { Route, Switch } from "react-router-dom";
import QuesDetailsContainer from "./components/QuesDetailsContainer";
// import ResultsContainer from "./components/ResultsContainer";
import LoginContainer from './components/LoginContainer';
import  ProtectedRoute  from "./protected.route";
import PageNotFound from "./components/notFound";

function App() {

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getQuestions());
    dispatch(getUsers());
  }, []);

  return (
      <div className='App'>
        <HeaderContainer />
        <Switch>

          {/* <ProtectedRoute path='/questions/:question_id/results' component={ResultsContainer} /> */}
          {/* <ProtectedRoute path='/questions/:question_id' component={ResultsContainer} /> */}
          <ProtectedRoute path='/questions/:question_id' component={QuesDetailsContainer} />
          <ProtectedRoute path='/questions' exact={true} component={HomeContainer} />
          <ProtectedRoute path='/add' component={NewQuesContainer} />
          <ProtectedRoute path='/leaderboard' component={LeaderBoardContainer} />
          <Route path='/' exact={true} component={LoginContainer}/>
          <ProtectedRoute path='*' component={PageNotFound} />
        </Switch>
      </div>
  );
}

export default App;
