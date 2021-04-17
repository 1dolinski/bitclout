
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './bitcloutoffers.png';
import './App.css';
import './index.css';

import Home from "./Home.js";
import List from "./List.js";
import Calendar from "./Calendar.js";
import Bot from "./Bot.js";

export default function App() {
  return (
    <Router>
      <div class="container mx-auto">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/bot">
            <Bot />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}