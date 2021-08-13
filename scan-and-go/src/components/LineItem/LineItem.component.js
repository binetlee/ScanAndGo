import React from 'react';
import { VALID_UPC } from '../../mocks/receiptMock';

export const LineItem = ({upc, quantity, canEditQuantity = false, onQuantityChange = () => {}}) => {
  const { imageURL, itemDescription, itemCost } = VALID_UPC[upc];
  const totalItemCost = (Math.round(itemCost*quantity * 100) / 100).toFixed(2);

  const EditableQuantity = <input value={quantity} onChange={onQuantityChange} type="tel" className="form-input__field u__text-align--center"/>;

  return (
      <div className="col__12-12 lineItemContainer">
        <div className="col__4-12 u--paddingNone u--padding-right">
          <div className="col__12-12 imageContainer u--paddingNone u--paddingXsmall-bottom">
            <img src={imageURL}/>
          </div>
          { canEditQuantity &&
            <div className="col__12-12 u--paddingNone u__text-align--center">
              {EditableQuantity}
            </div>
          }
        </div>
        <div className="col__8-12 u--paddingNone">
          <div className="col__12-12 itemDescription u--paddingNone u--padding-bottom">
            {itemDescription}
          </div>
          { !canEditQuantity &&
            <div className="col__12-12 u--paddingNone u--padding-bottom">
              Qty : {quantity}
            </div>
          }
          <div className="col__12-12 u--paddingNone u--bold totalCost">
            ${totalItemCost}
          </div>
        </div>
      </div>
  );
};