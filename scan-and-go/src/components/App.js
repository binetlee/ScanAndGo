import './App.css';
import React, { useContext, useEffect } from 'react';
import { MetadataContext } from '../context';
import Home from './Home';
import TestPage1 from './TestPage1';
import TestPage2 from './TestPage2';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/global-css.scss';
import Opc from "./Opc";
import Security from "./Security";
import GreyOut from "./GreyOut";
import ScanCart from "./ScanCart";

function App() {

  return (
    <BrowserRouter>
      <GreyOut/>
          <Switch>
          <Route exact path="/"><Home /></Route>
              <Route exact path="/scanner"><TestPage1 /></Route>
          <Route exact path="/opc"><Opc /></Route>
              <Route exact path="/security"><Security /></Route>
          <Route exact path="/scanandgo"><ScanCart/></Route>
          <Route exact path="/orderConf"><OrderConfirmationPage /></Route> {/* Order Confirmation Page */}
          </Switch>
    </BrowserRouter>
  );
}

export default App;
