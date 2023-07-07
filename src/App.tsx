import React from 'react';

import { MapRender } from './components/Map'
import { UserInterface } from "./components/UserInterface";
import { config } from "./config";

import { AddModalWindow } from "./components/addPointModal"

function App() {
  return (
      <>
        { !config.isMobile && <UserInterface/> }
        <MapRender />
        { config.isMobile && <UserInterface/> }
          <AddModalWindow />
      </>
  );
}

export default App;
