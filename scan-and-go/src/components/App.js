import './App.css';
import React, { useContext, useEffect } from 'react';
import { MetadataContext } from '../context';
import Home from './Home';
import TestPage1 from './TestPage1';
import TestPage2 from './TestPage2';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/global-css.scss';
import ScanCart from "./ScanCart";

function App() {

  return (
    <BrowserRouter>
          <Switch>
            <Route exact path="/"><Home /></Route> 
            <Route exact path="/scanner"><TestPage1 /></Route> 
            <Route exact path="/opc"><TestPage1 /></Route> 
            <Route exact path="/wallet"><TestPage2 /></Route>
            <Route exact path="/scanandgo"><ScanCart/></Route>
            <Route exact path="/orderConf"><OrderConfirmationPage /></Route> {/* Order Confirmation Page */}
          </Switch>
    </BrowserRouter>
  );
}

export default App;
