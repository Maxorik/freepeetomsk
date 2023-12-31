import React from 'react';

import { MapRender } from './components/Map'
import { UserInterface } from "./components/UserInterface";

function App() {
  return (
      <>
          <div className="header">
              <UserInterface/>
          </div>
          <div className="mobile-title"/>
          <MapRender />
          <div className="footer">
              <UserInterface/>
          </div>
      </>
  );
}

export default App;
