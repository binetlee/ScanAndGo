import React, {useContext, useEffect, useState} from "react";
import thd_logo from './img/thd_logo.svg';
import {MetadataContext} from "../../context";
import PriceFormatter from "./PriceFormatter";
import LineItem from "../LineItem";
import hd_credit_card from "./img/HD_Credit_Card.png";
import cashback_icon from "./img/cashback_icon.svg";
import TotalPrice from "../TotalPrice";
import CheckoutItemsContainer from "../CheckoutItemsContainer";
import { VALID_UPC } from '../../mocks/receiptMock';
import {ImpulseBuy} from "../ImpulseBuy/ImpulseBuy.component";
import {useHistory} from "react-router-dom";

export function Opc({}) {

    const { state: metadataState, dispatch: metadataDispatch } = useContext(MetadataContext);
    const [cashback, cashbackChecked] = useState(false);
    const cashBackAmount = 10.00;
    const taxRate = 0.0625;

    function calcTotal (price) {
        return ((cashback ? (price - cashBackAmount) : price) * (taxRate + 1)).toFixed(2);
    }

    function parseDollar (total) {
        return Math.trunc(total);
    }

    function parseCents(total) {
        if (Number.isInteger(total)) {
            return "00";
        } else {
            return (total+"").split(".")[1];
        }
    }

    function paymentTypeSelect(e) {
        console.log(e.target.value);
    }

    const cashbackSelect = () => {
        const amountToAdd = cashback ? -cashBackAmount : cashBackAmount;
        metadataDispatch({
            type: 'UPDATE_RECEIPT_INFO',
            receiptDetails: {...metadataState.receiptDetails, orderTotal: toDbl(metadataState.receiptDetails.orderTotal - amountToAdd)}
        });
        cashbackChecked(!cashback);
    }

    const [quantity, setQuantity] = useState(1);

    const onQuantityChanged = (e) => {
        setQuantity(e.target.value);
    }

    const history = useHistory();

    const submit = () => {
        metadataDispatch({
            type: 'UPDATE_RECEIPT_INFO',
            receiptDetails: metadataState.receiptDetails
        });
        history.push("/orderConf");
    };

    const toDbl = (srcVal) => {
        return Number((Math.round(srcVal * 100) / 100).toFixed(2));
    };

    const calcNewTotal = (newReceiptDetails) => {
        const curLineItems = newReceiptDetails.lineItems;
        let sum = 0;
        //exists, modify qty
        curLineItems.forEach((lineItem) => {
            let { totalCost } = lineItem;
            sum += totalCost;
        });

        newReceiptDetails.subTotal = sum;
        newReceiptDetails.salesTax = toDbl(sum*.0625);
        newReceiptDetails.orderTotal = sum + newReceiptDetails.salesTax;
    };

    const addToCart = (upc) => {
        const { itemDescription, itemCost } = VALID_UPC[upc];
        const lineItems = metadataState.receiptDetails.lineItems;
        let found = false;
        //exists, modify qty to +1
        lineItems.forEach((lineItem) => {
            let { upcCode, quantityOrdered, itemCost} = lineItem;
            if (upcCode === upc) {
                found = true;
                lineItem.quantityOrdered = quantityOrdered + 1;
                lineItem.totalCost = toDbl(itemCost * lineItem.quantityOrdered);
            }
        });
        if (!found) {
            lineItems.push({
                itemCost, itemDescription, quantityOrdered: 1, totalCost: itemCost, upcCode: upc
            });
        }
        const newReceiptDetails = { ...metadataState.receiptDetails, lineItems };
        calcNewTotal(newReceiptDetails);
        metadataDispatch({
            type: 'UPDATE_RECEIPT_INFO',
            receiptDetails: newReceiptDetails
        });
    }

    return (
        <>
        <div className="grid isBound">
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                <div className="">
                    <span><img src={thd_logo} className="opc-image-align"  alt="THD Logo"/></span>
                    <span className="opc-scan-go-text">Scan & Go Checkout</span>
                    <span className="opc-edit-cart">Edit Cart ({metadataState?.receiptDetails?.lineItems?.length})</span>
                </div>
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                <div className="opc-border-bottom-grey" >
                    <span className="opc-your-order-text">Your Order</span>
                    <PriceFormatter price={metadataState?.receiptDetails?.orderTotal} />
                </div>
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl opc-lineItems">
                {/*<CheckoutItemsContainer children={*/}
                {/*    [<LineItem upc={"025315283740"} canEditQuantity={false} quantity={9001}/>,*/}
                {/*    <LineItem upc={"899744003749"} canEditQuantity={false} quantity={9001}/>,*/}
                {/*    <LineItem upc={"783050455166"} canEditQuantity={false} quantity={9001}/>,*/}
                {/*    <LineItem upc={"041570143575"} canEditQuantity={false} quantity={9001}/>,*/}
                {/*    <LineItem upc={"100008671452"} canEditQuantity={false} quantity={9001}/>]}/>*/}
                <CheckoutItemsContainer children={
                    metadataState.receiptDetails?.lineItems?.map((lineItem) => {
                        return (<LineItem
                            upc={lineItem.upcCode}
                            canEditQuantity={false}
                            quantity={lineItem.quantityOrdered}
                        />);}

                    )}/>
            </div>
            <ImpulseBuy addToCart={addToCart}/>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                <div className="opc-border-bottom-grey">
                    <span className="opc-your-order-text">Payment</span>
                </div>
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl" onChange={paymentTypeSelect}>
                <div >
                    <input className="radio-btn__input" type="radio" name="paymentChoice" readOnly value="payPal" />
                    <label className="radio-btn__label" htmlFor="payPal">
                        <span className="radio-btn"/>
                        <div className="">
                           <img src="https://www.homedepot.com/mycheckout/assets/react/images/layout/paypal-logo.png" className="opc-paypal-logo"/>
                        </div>
                    </label>
                    <input className="radio-btn__input" type="radio" name="paymentChoice" readOnly value="creditCard" />
                    <label className="radio-btn__label" htmlFor="creditCard">
                        <span className="radio-btn"/>
                            <div> <img src={hd_credit_card} className="opc-credit-image"  alt="Credit Card Logo"/>****5555 05/25</div>
                    </label>
                </div>
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl" onChange={cashbackSelect}>
                <div className="checkbox-btn">
                    <input className="checkbox-btn__input" type="checkbox" id="cashback" name="cashback"/>
                    <label className="checkbox-btn__label" htmlFor="cashback">
                        <div>
                            <img src={cashback_icon} className="opc-cashback-icon"/>
                            <span className="bold">Apply $10.00 cash back </span>
                            <div>Thanks for paying with your Home Depot credit card</div>
                        </div>

                    </label>
                </div>
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                <TotalPrice subtotal={metadataState?.receiptDetails?.subTotal} tax={metadataState?.receiptDetails?.salesTax} orderTotal={metadataState?.receiptDetails?.orderTotal} cashback={cashback} cashbackAmount={cashBackAmount}/>
            </div>
            <button
                className="bttn--primary"
                onClick={() => submit() }
            >

                <span className="bttn__content">Place Order</span>

            </button>
        </div>
        </>
    )
}

export default Opc;