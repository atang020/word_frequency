import React, { useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [wordMap, setWordMap] = useState({});
  const [sortedKeys, setSortedKeys] = useState([]);

  const generateMapping = () => {
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
    <div className="App">
        <textarea onBlur={(e) => { setContent(e.target.value)}} rows="50"></textarea>
        <button onClick={() => { generateMapping()}}>Get words frequency</button>
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
  );
}

export default App;
