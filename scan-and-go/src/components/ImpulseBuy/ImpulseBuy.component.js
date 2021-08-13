import React from 'react';
import { VALID_UPC } from '../../mocks/receiptMock';
import PriceFormatter from "../Opc/PriceFormatter";
import FiveStars from '../../images/FiveStars.png';

const ImpulseBuyItem = ({ upc, addToCart }) => {
  const { imageURL, itemDescription, itemCost } = VALID_UPC[upc];
  return (<div className="col__6-12 impulseBuyContainer">
      <div className="col__12-12 u--paddingNone u--paddingSmall-top">
        <img className="productImage" src={imageURL}/>
      </div>
      <div className="col__12-12 u--paddingNone u--paddingSmall-top itemDescription">
        {itemDescription}
      </div>
      <div className="col__12-12 u--paddingNone u--paddingSmall-top rating">
        <img className="rating u--paddingTiny-right" src={FiveStars}/>
        (9001)
      </div>
      <div className="col__12-12 u--paddingNone u--paddingTiny-top u--padding-bottom">
        <PriceFormatter price={itemCost} className="impulseBuyPrice"/>
      </div>
      <button
        className="bttn-outline--primary addToCartButton"
        onClick={() => addToCart(upc)}>
        <span className="bttn__content addToCart">Add to Cart</span>
      </button>
    </div>
  );
};

export const ImpulseBuy = ({ addToCart }) => (
  <>
    <div className="col__12-12 u--paddingNone-bottom impulseBuyHeader">
      Want to Add Something?
    </div>
    <ImpulseBuyItem upc="079357382072" addToCart={addToCart}/>
    <ImpulseBuyItem upc="028400199148" addToCart={addToCart}/>
  </>
);