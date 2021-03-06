import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import './fonts/helvetica/HelveticaNeueLTW01-107XBlkCn.ttf';
import reportWebVitals from './reportWebVitals';
import {
  MetadataProvider, GreyOutProvider
} from './context';

ReactDOM.render(
  <MetadataProvider>
    <GreyOutProvider>
      <App />
    </GreyOutProvider>
  </MetadataProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
