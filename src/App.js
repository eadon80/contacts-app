import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './features/login/Login';
import List from './features/list/List';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        
        <Route path="/list">
          <List />
        </Route>

        <Route path="/logout" render={() => {
          localStorage.removeItem('userData');

          return <Redirect to="/login" />
        }}>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
