import './App.css';
import React, { useEffect, useState } from 'react';

// main App function 
function App() {
  
  const [shows, setShows] = useState([]);
  const [sShow, setShow] = useState(null);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => response.json())
      .then((data) => {
      //   console.log(data);
        setShows(data.map((entry) => entry.show));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  // console.log(shows);

  const Click = (sId) => {
    //console.log(sId);
     const sShow = shows.find((show) => show.id === sId);
    // console.log(sShow);
    setShow(sShow);
  };

  return (
    <div className='app'>
      {
        sShow ? (<SSummary show={sShow} />) : (<List shows={shows} onSClick={Click} />)
      }
    </div>
  );
};


// our next target page 
const SSummary = ({ show }) => {
  return (
    <div className='summary'>
      <h2> Show name : -  {show.name}</h2>
      <h4>Discription : - </h4>
      <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
    </div>
  );
};


// our component for listing all the items
const List = ({ shows, onSClick }) => {
  return (
    <div className='list_all'>
      <h2>List of Shows</h2>
      <ul>
        {shows.map((show) => (
          <li  className="list_li" key={show.id}>
            <h3>{show.name}</h3>
            <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
            <button  className='btn' onClick={() => onSClick(show.id)}>View Summary</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default App;
