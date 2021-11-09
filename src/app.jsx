import React from 'react';
import SetGame from './components/SetGame';

const App = ({ location }) => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  return (
    <div>
      <SetGame autoStart={!!params.get('autoStart')} />
    </div>
  );
};

export default App;
