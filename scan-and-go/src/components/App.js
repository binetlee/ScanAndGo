import './App.css';
import React, { useContext, useEffect } from 'react';
import { MetadataContext } from '../context';
import Home from './Home';
import TestPage1 from './TestPage1';
import TestPage2 from './TestPage2';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/global-css.scss';
import Security from "./Security";
import ScanCart from "./ScanCart";

function App() {

  const { state: metadataState, dispatch: metadataDispatch } = useContext(MetadataContext);

  useEffect(() => {
    console.log(`dispatching metadata event from App`);
    metadataDispatch({
      type: 'UPDATE_RECEIPT_INFO',
      receiptInfo : {
        receiptId: 'dnIM22c'
      }
    });
    console.log(`metadataState: ${metadataState}`);
  }, []);

  return (
    <BrowserRouter>
          <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/scanner"><TestPage1 /></Route>
          <Route exact path="/opc"><TestPage1 /></Route><Route exact path="/security"><Security /></Route> {/* mobile wallet */}
          <Route exact path="/security"><Security /></Route>
          <Route exact path="/scanandgo"><ScanCart/></Route>
          <Route exact path="/orderConf"><OrderConfirmationPage /></Route> {/* Order Confirmation Page */}
          </Switch>
    </BrowserRouter>
  );
}

export default App;
