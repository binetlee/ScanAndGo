import './App.css';
import React, { useContext, useEffect } from 'react';
import { MetadataContext } from '../context';
import TestPage1 from './TestPage1';
import TestPage2 from './TestPage2';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

function App() {

  const { state: metadataState, dispatch: metadataDispatch } = useContext(MetadataContext);

  useEffect(() => {
    console.log(`dispatching metadata event from App`);
    metadataDispatch({
      type: 'SWITCH_TO_BARCODE',
      testData: 'testData'
    });
    console.log(`metadataState: ${metadataState}`);
  }, []);

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/"><TestPage1 /></Route> {/* PHP homepage */}
          <Route exact path="/scanner"><TestPage1 /></Route> {/* scanner */}
          <Route exact path="/opc"><TestPage1 /></Route> {/* OPC */}
          <Route exact path="/wallet"><TestPage2 /></Route> {/* mobile wallet */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
