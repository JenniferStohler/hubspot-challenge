import React, { useState, useEffect } from 'react';



function App() {

  
  const [event, setEvent] = useState([]);

  
  //1.GET event from API and sort it
  useEffect(() => {
    fetch('https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=fc1f41dec9b635995cefdcfdc971')
      .then(res => res.json())
      .then(event => {
        setEvent(event.events);
        event.sort((a, b) => a.visitorId - b.visitorId);
      })
      .catch(err => console.log(err));
  }, [])

  
  
  console.log(event)
  

  //POST data to another API
  
  useEffect(() => {
    const sendData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: 'Events'})
    };
    fetch('https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=fc1f41dec9b635995cefdcfdc971', sendData)
      .then(res => res.json())
      .then(event => this.setData({ event: event.id }))
      .catch(err => console.log(err));
  }, [])

  console.log(event)
  
  return (
    //Get data on the page

    event.map((event, index) => {
      console.log(event);
      return (
        <div className="event" key={index}>
          <div className="container mx-auto px-auto">
            <h1 className="timestamp">Visitor Id: {event.visitorId}</h1>
            <h2 className="url">Timestamp: {event.timestamp}</h2>
            <h3 className="url">URL: {event.url}</h3>
          </div>
        </div>
      )
    })
  );
  }

export default App;
