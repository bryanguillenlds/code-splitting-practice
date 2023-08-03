import React from 'react';
import './App.css';
import {useState} from "react";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";

function App() {
  const [route, setRoute] = useState('page1');

  const displayPage = (route) => {
    switch (route) {
      case 'page1':
        return <Page1 onRouteChange={setRoute}/>;
      case 'page2':
        return <Page2 onRouteChange={setRoute}/>;
      case 'page3':
        return <Page3 onRouteChange={setRoute}/>;
      default:
        return <Page1 onRouteChange={setRoute}/>;
    }
  }

  return (
    <div className="App">
      {displayPage(route)}
    </div>
  );
}

export default App;
