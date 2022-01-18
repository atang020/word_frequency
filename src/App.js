import React, { useState } from 'react';
import ErrorBoundary from './components/error/ErrorBoundary';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [wordMap, setWordMap] = useState({});
  const [sortedKeys, setSortedKeys] = useState([]);
  const [error, setError] = useState()

  const generateMapping = () => {
    if (!content) {
      setError("Cannot map an empty content. Please provide text content");
      return;
    }
    const array = content.toLowerCase().match(/\w+(?:'\w+)*/g);
    let map = {};
    for (let a of array) {
      let val = map[a];
      if (!val) {
        val = 1;
      } else {
        val++;
      }
      map[a] = val;
    }
    const sortedFreq = Object.keys(map).sort((a, b) => map[b]-map[a]);
    setWordMap(map);
    setSortedKeys(sortedFreq);
  }

  return (
    <ErrorBoundary>
      <div className="App">
          <textarea onBlur={(e) => { setContent(e.target.value)}} rows="20"></textarea>
          <button onClick={() => { generateMapping()}}>Get words frequency</button>
          {error && <div>{error}</div>}
          <table>
            <thead>
              <tr>
                <th>Word</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {sortedKeys.map((val, idx) => {
                return (
                  <tr key={val}>
                    <td>{val}</td>
                    <td>{wordMap[val]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </ErrorBoundary>
  );
}

export default App;
