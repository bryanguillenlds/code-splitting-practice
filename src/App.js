import './App.css';

import { useState } from 'react';

import Page1 from './components/Page1';

// We will use this to set and use the state for the route and component.
const initialDetails = {
  route: 'page1',
  component: null,
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

    // Dynamically load component via code splitting
    // Note that in order to access the component itself, you must use .default
    // Remember import returns a promise
    switch (route) {
      case 'page2':
        const page2 = await import('./components/Page2');
        setDetails({
          route,
          component: page2.default,
        });
        break;
      case 'page3':
        const page3 = await import('./components/Page3');
        setDetails({
          route,
          component: page3.default,
        });
        break;
      default:
        // Do nothing
        break;
    }
  };

  // Render page 1 as a default component
  if (details.route === 'page1') {
    return(
      <Page1 onRouteChange={handleRouteChange} />
    );
  }

  // Dynamically load component based on route passed by children
  return (
    <details.component onRouteChange={handleRouteChange} />
  );
};

export default App;
