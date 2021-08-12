import React, { useContext } from 'react';
import { GreyOutContext } from "../../context";

const backDropStyles = {
  height: '100%',
  left: 0,
  zIndex: 1000,
  position: 'fixed',
};

export const GreyOut = () => {
  const { greyoutCount } = useContext(GreyOutContext);
  return (
    (greyoutCount > 0) && (
      <div className="hd-coverup fade-in pre-loader-container">
        <div style={backDropStyles} className="grey-out">
        </div>
      </div>
    )
  );
};