import React from 'react';

import { MapRender } from './components/Map'
import { UserInterface } from "./components/UserInterface";
import { config } from "./config";

function App() {
  return (
      <>
        { !config.isMobile && <UserInterface/> }
        <MapRender />
        { config.isMobile && <UserInterface/> }
      </>
  );
}

export default App;
