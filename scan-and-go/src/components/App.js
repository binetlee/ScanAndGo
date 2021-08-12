import './App.css';
import React, { useContext, useEffect } from 'react';
import { MetadataContext } from '../context';
import Home from './Home';
import TestPage1 from './TestPage1';
import TestPage2 from './TestPage2';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../styles/global-css.scss';

function App() {

  return (
    <BrowserRouter>
        <div
          id="outer"
          className="col__12-12"
        >
          <Switch>
            <Route exact path="/"><Home /></Route> {/* PHP homepage */}
            <Route exact path="/scanner"><TestPage1 /></Route> {/* scanner */}
            <Route exact path="/opc"><TestPage1 /></Route> {/* OPC */}
            <Route exact path="/wallet"><TestPage2 /></Route> {/* mobile wallet */}
            <Route exact path="/orderConf"><OrderConfirmationPage /></Route> {/* Order Confirmation Page */}
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
