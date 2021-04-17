
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


var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyR9jk3yd5Msam4M'}).base('appX3lOvCGm05jXmy');

console.log(base);

var titles = ['ok'];

base('List').select({
    // Selecting the first 3 records in @BitCloutOffers List:
    maxRecords: 3,
    view: "@BitCloutOffers List"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        titles.concat(record.get('Title'));
        console.log('Retrieved', record.get('Title'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});



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

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <a href="https://www.bitclout.com/u/bitcloutoffers" style={{"color": "white"}}>
//           @bitcloutoffers
//         </a>
//         <br/>
//         <a href="https://airtable.com/shrCuDoIrnE4wNPyf" style={{"color": "white"}}>
//           Click here to add an offer
//         </a>
//         <br/>

//         {titles[0]}

//         <iframe className="airtable-embed" src="https://airtable.com/embed/shrTx4wwPPXBdGqgn?backgroundColor=cyan&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style={{"background": "transparent", "border": "1px solid #ccc"}}></iframe>
//         <br/>
//         <iframe className="airtable-embed" src="https://airtable.com/embed/shrOIHvUnSidfnZxP?backgroundColor=cyan&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style={{"background": "transparent", "border": "1px solid #ccc"}}></iframe>
//       </header>
//     </div>
//   );
// }

// export default App;
