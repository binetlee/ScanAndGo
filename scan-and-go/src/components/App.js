import './App.css';
import React, { useContext, useEffect } from 'react';
import { MetadataContext } from '../context';
import TestPage1 from './TestPage1';

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
    <TestPage1 />
  );
}

export default App;
