import React from 'react';

import { MapRender } from './components/Map'
import { UserInterface } from "./components/UserInterface";
import { config } from "./config";

function App() {
  return (
      <>
          <div className="header">
              <UserInterface/>
          </div>
          <div className="mobile-title"></div>
          <MapRender />
          <div className="footer">
              <UserInterface/>
          </div>
      </>
  );
}

export default App;
