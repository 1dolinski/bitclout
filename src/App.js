import logo from './bitcloutoffers.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="https://www.bitclout.com/u/bitcloutoffers" style={{"color": "white"}}>
          @bitcloutoffers
        </a>
        <br/>
        <a href="https://airtable.com/shrCuDoIrnE4wNPyf" style={{"color": "white"}}>
          Click here to add an offer
        </a>
        <br/>



        <iframe class="airtable-embed" src="https://airtable.com/embed/shrTx4wwPPXBdGqgn?backgroundColor=cyan&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style={{"background": "transparent", "border": "1px solid #ccc;"}}></iframe>
        <br/>
        <iframe class="airtable-embed" src="https://airtable.com/embed/shrOIHvUnSidfnZxP?backgroundColor=cyan&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style={{"background": "transparent", "border": "1px solid #ccc;"}}></iframe>
      </header>
    </div>
  );
}

export default App;
