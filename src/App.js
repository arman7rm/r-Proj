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
// document.addEventListener('DOMContentLoaded', function() {
//   let articleElements =  Array.from(document.getElementsByTagName('article'));
  
//   articleElements.forEach(function(article) {
//       article.parentNode.removeChild(article);
//   });

//   let sectionElements = Array.from(document.getElementsByTagName('section'));
//   sectionElements.forEach(function(s) {
//       s.parentNode.removeChild(s);
//   });

//   let elements = document.querySelectorAll('#content > *');

//   elements.forEach(function(element) {
//       let dataClassValue = element.getAttribute('data-class');
//       let dataTagValue = element.getAttribute('data-tag');
//       let dataIdValue = element.getAttribute('data-id');

//       if (!(dataClassValue.startsWith('23') ||
//             (dataTagValue && dataTagValue.endsWith('93')) ||
//             (dataIdValue && dataIdValue.includes('21')))) {
//           element.parentNode.removeChild(element);
//       }
//   });

//   let chars = document.getElementsByTagName('i');
//   let link = '';
//   for(let i=0; i<chars.length; i++){
//       link += chars[i].getAttribute('value');
//   }
//   console.log('link : ',link);
// });


export default App;
