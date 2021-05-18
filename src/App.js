
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ReactGA from 'react-ga';

import logo from './bitcloutoffers.png';

import { createBrowserHistory } from 'history';

import './App.css';
import './index.css';

import Home from "./Home.js";
import List from "./List.js";
import Calendar from "./Calendar.js";
import Bot from "./Bot.js";
import FeatureRequest from "./FeatureRequest.js";
import EventStream from "./EventStream.js";

const trackingId = "UA-145092910-3"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

// ReactGA.set({
//   userId: auth.currentUserId(),
//   // any data that is relevant to the user session
//   // that you would like to track with google analytics
// })

const history = createBrowserHistory();
// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

export default function App() {
  return (
    <Router history={history}>
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
          <Route path="/feature-requests">
            <FeatureRequest />
          </Route>
          <Route path="/event-stream">
            <EventStream />
          </Route>
          <Route path="/">
            <Calendar />
            {/* <Home /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}