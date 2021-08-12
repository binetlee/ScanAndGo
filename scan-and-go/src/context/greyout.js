import React, {createContext, useState}  from 'react';

const GreyOutContext = createContext({
  greyoutCount: 0,
  isOpaque:false,
  /**
   * Although it is possible to remove the following I like to keep them here
   * because they help anyone importing GreyOutContext to understand what API (methods)
   * this particular context has available
   */
  showGreyOut: (isOpaque) => {},
  hideGreyOut: () => {}
});


const GreyOutProvider = (props) => {
  const {children} = props;
  /**
   * GreyOut state/controls
   */
  const showGreyOut = (isOpaque) => {
    toggleGreyOut( prevState => {
      return {
        ...prevState,
        greyoutCount: prevState.greyoutCount + 1,
        isOpaque
      }
    })
  };

  const hideGreyOut = () => {
    toggleGreyOut( prevState => {
      return {
        ...prevState,
        greyoutCount: prevState.greyoutCount > 0? prevState.greyoutCount - 1 : 0
      }
    })
  };

  const greyoutState = {
    greyoutCount: 0,
    showGreyOut,
    hideGreyOut
  };

  const [greyout, toggleGreyOut] = useState(greyoutState);

  return (
    <GreyOutContext.Provider value={greyout}>
      {children}
    </GreyOutContext.Provider>
  )
};

export {GreyOutContext, GreyOutProvider};