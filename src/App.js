import {useState, useEffect} from 'react';
import TwitterLogo from './Twitter';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const key = process.env.REACT_APP_QUOTE_KEY;

  useEffect(() => {
    return () => {
      fetchQuote();
    };
  }, []); //Run only on pageLoad

  const fetchQuote = async () => {
    await fetch('https://api.api-ninjas.com/v1/quotes', {
      method: 'GET',
      headers: {
        'X-API-Key': key,
      }
    }).then((response) => response.json())
    .then((data) => {
      setQuote(data[0].quote);
      setAuthor(data[0].author);
    });

    setRed(Math.floor((Math.random()%255)*100));
    setGreen(Math.floor((Math.random()%255)*100));
    setBlue(Math.floor((Math.random()%255)*100));
    document.getElementById('quote').classList.remove('fadeIn');
    document.getElementById('author').classList.remove('fadeIn');
    void document.getElementById('quote').offsetWidth;
    void document.getElementById('author').offsetWidth;
    document.getElementById('quote').classList.add('fadeIn');
    document.getElementById('author').classList.add('fadeIn');
    
  }
  return (
    <div className="App">
      <div id="quote-box" className="d-flex align-items-center justify-content-center mx-auto" style={{"height": '50em', width:'100%', background: `rgba(${red}, ${green}, ${blue})`}}>
        <div id="text" className="card w-75 h-auto p-2 border rounded">
          <span id="quote" className="mt-5 fs-4 fw-normal">
          {quote ? quote : ''}
          </span>
          <br />
          <div className="d-flex justify-content-end">
            <span id="author" className="w-25 fs-5 fw-light">{author? author : ''}</span>
          </div>
          <br />
          <div className="text-center">
            <button className="btn w-25" type="submit" id="new-quote" onClick={fetchQuote} style={{'background': `rgba(${red}, ${green}, ${blue})`, color: 'white'}}>
              Next Quote
            </button>
            <span id="tweet-btn" className="m-2">
              <a id="tweet-quote" target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet">
                <TwitterLogo className="border rounded p-1" style={{'width': '2.5rem', 'height': '2.5rem', 'fill': 'white', background: `rgba(${red}, ${green}, ${blue})`}}/>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
