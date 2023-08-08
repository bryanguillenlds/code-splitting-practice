import React, {Suspense} from 'react';
import './App.css';

import { useState } from 'react';

import Page1 from './components/Page1';

// Using react lazy to dynamically load components
const Page2Lazy = React.lazy(() => import('./components/Page2'));
const Page3Lazy = React.lazy(() => import('./components/Page3'));

// We will use this to set and use the state for the route and component.
const initialDetails = {
  route: 'page1'
};

const App = () => {
  // Using initialDetails as an initial state. This is a single object with details so that we don't have to have separate states and risk mutating them out of sync.
  const [details, setDetails] = useState(initialDetails);

  // Method will be triggered when children components are clicked and send the route to the parent to determine which component to render
  const handleRouteChange = async (route) => {
    // Default route is Page1 component
    if (route === 'page1') {
      return setDetails(initialDetails);
    }

    // Set the route according to what's coming from children components when user clicks buttons
    switch (route) {
      case 'page2':
        setDetails({route});
        break;
      case 'page3':
        setDetails({route});
        break;
      default:
        // Do nothing
        break;
    }
  };

  // Render page 1 as a default component and render the rest with react lazy
  // Lazy/Dynamic components should be wrapped with Suspense so that a fallback component is rendered while loading lazy components
  if (details.route === 'page1') {
    return(
      <Page1 onRouteChange={handleRouteChange} />
    );
  } else if (details.route === 'page2') {
    return(
      <Suspense fallback={<div>Loading component...</div>}>
        <Page2Lazy onRouteChange={handleRouteChange} />
      </Suspense>
    );
  } else if (details.route === 'page3') {
    return(
      <Suspense fallback={<div>Loading component...</div>}>
        <Page3Lazy onRouteChange={handleRouteChange} />
      </Suspense>
    );
  }
};

export default App;
