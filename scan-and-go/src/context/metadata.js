import React, { createContext, useReducer } from 'react';
import { metadataReducer, initialMetadataState } from '../hooks/useReducers';

const MetadataContext = createContext({});

function MetadataProvider({ children }) {
    const [state, dispatch] = useReducer(metadataReducer, initialMetadataState);
  
    return (
      <MetadataContext.Provider value={{ state, dispatch }}>
        {children}
      </MetadataContext.Provider>
    );
  }
  
export { MetadataContext, MetadataProvider };