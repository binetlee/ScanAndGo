import './App.css';
import React, { useContext, useEffect } from 'react';
import { MetadataContext } from '../context';
import Home from './Home';
import TestPage1 from './TestPage1';
import TestPage2 from './TestPage2';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/global-css.scss';
import Opc from "./Opc";

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
              <Route exact path="/"><Home /></Route>
              <Route exact path="/scanner"><TestPage1 /></Route>
              <Route exact path="/opc"><Opc /></Route>
              <Route exact path="/wallet"><TestPage2 /></Route>
          </Switch>
    </BrowserRouter>
  );
}

export default App;
