import loadinglogo from './loadinglogo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [fullContent, setFullContent] = useState('');
    const [characterList, setCharacterList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/63616c')
            .then(response => response.text())
            .then(data => {
                setTimeout(() => {
                  setFullContent(data);
                  setLoading(false);
                }, 3000);
            })
            .catch(error => {
                console.error('Error fetching HTML content:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading && fullContent) {
            let index = 0;
            const interval = setInterval(() => {
                const characters = Array.from(fullContent.substring(0, index + 1));
                setCharacterList(characters);
                index++;
                if (index === fullContent.length) {
                    clearInterval(interval);
                }
            }, 500); // 500ms delay between each letter
            return () => clearInterval(interval);
        }
    }, [loading, fullContent]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
            {loading ? (
              <>
                <img src={loadinglogo} className="App-logo" alt="loading" />  
                <h1>Loading...</h1>
              </>
            ) : (
              <ul>
              {characterList.map((char, index) => (
                  <li key={index}>{char}</li>
              ))}
          </ul>
            )}
            
        </div>
      </header>
    </div>
  );
}


export default App;
