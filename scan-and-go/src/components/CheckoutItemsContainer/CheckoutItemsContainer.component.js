import React, { useState } from 'react';
import DownArrow from '../../images/DownArrow.svg';
import UpArrow from '../../images/UpArrow.svg';
import InStoreScanAndGo from '../../images/InStoreScanAndGo.svg';

export const CheckoutItemsContainer = ({goToCart, children}) => {

  const [collapsed, setCollapsed] = useState(false);
  const numChildren = children.length;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }

  return (
    <>
    <div className="col__12-12">
      <div className="col__7-12 u--paddingNone">
        <img className="u--padding-right" src={InStoreScanAndGo}/>
        <span className="itemsContainerHeader">In-Store Scan & Go</span>
      </div>
      <div className="col__5-12 u--paddingNone u__default-link u__text-align--right u--marginAwkward-top">
        <button role="link" className="u__default-link u--paddingXsmall-right" onClick={goToCart}>Items ({numChildren})</button>
        <img className="u--paddingXsmall-top" src={collapsed ? DownArrow : UpArrow} onClick={toggleCollapse}/>
      </div>
    </div>
      {!collapsed && children}
    </>
  );
};