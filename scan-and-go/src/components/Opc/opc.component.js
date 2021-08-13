import React, {useContext, useEffect, useState} from "react";
import thd_logo from './img/thd_logo.svg';
import {MetadataContext} from "../../context";
import PriceFormatter from "./PriceFormatter";
import LineItem from "../LineItem";
import hd_credit_card from "./img/HD_Credit_Card.png";

export function Opc({}) {

    const { state: metadataState, dispatch: metadataDispatch } = useContext(MetadataContext);

    function parseDollar (total : Number) {
        return Math.trunc(total);
    }

    function parseCents(total) {
        if (Number.isInteger(total)) {
            return "00";
        } else {
            return (total+"").split(".")[1];
        }
    }

    useEffect(()=> {
        metadataDispatch({
            type: 'UPDATE_RECEIPT_INFO',
            receiptDetails : {
                receiptId: 'W123452003',
                receiptCreatedDate: "2020-03-21",
                subTotal: 48.00,
                salesTax : 3.00,
                orderTotal : 51.01,
                paymentType: {
                    cardName : "family card",
                    cardType : "PLCC",
                    cashbackAmt : "2.56",
                    lastFour : "4321"
                },
                billingAddress: {
                    addressLine1: "3950 Spring Valley Rd",
                    addressLine2: "Hackberry Creek",
                    addressLine3: "",
                    addressLine4: "",
                    addressLine5: "",
                    city: "Farmers Branch",
                    dayPhone: "214-562-6856",
                    emailId: "raju_datla@homedepot.com",
                    firstName: "Raju",
                    lastName: "Datla",
                    middleName: "L",
                    mobilePhone: "214-525-6366",
                    state: "TX",
                    zipCode: "75244"
                },
                lineItems: [
                    {
                        lineItemId: "101",
                        upcCode: "8049393624",
                        quantityOrdered: 5,
                        itemDescription: "Hart 25 oz. Milled Face Hicory Farming Hammer",
                        itemCost: 4.25,
                        totalCost: 21.25
                    },
                    {
                        lineItemId: "102",
                        upcCode: "72440143197",
                        quantityOrdered: 5,
                        itemDescription: "Meredith Home and Landscape Series Magazine",
                        itemCost: 4.25,
                        totalCost: 26.75
                    }
                ]
            }
        });
    }, []);
    useEffect(()=> {
        console.log("metadata changed to:", metadataState.receiptDetails);
    }, [metadataState]);

    const [quantity, setQuantity] = useState(1);

    const onQuantityChanged = (e) => {
        setQuantity(e.target.value);
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
                <LineItem upc={"025315283740"} canEditQuantity={false} quantity={9001}/>
                {/*<LineItem upc={"899744003749"} canEditQuantity={false} quantity={9001}/>*/}
                {/*<LineItem upc={"783050455166"} canEditQuantity={false} quantity={9001}/>*/}
                {/*<LineItem upc={"041570143575"} canEditQuantity={false} quantity={9001}/>*/}
                {/*<LineItem upc={"100008671452"} canEditQuantity={false} quantity={9001}/>*/}
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                <div className="opc-border-bottom-grey">
                    <span className="opc-your-order-text">Payment</span>
                </div>
            </div>
            <div className="col__12-12 col__12-12--xs col__12-12--sm col__12-12--md col__12-12--lg col__12-12--xl">
                    <div className="col__12-12 radio-btn">
                        <input className="radio-btn__input" type="radio" name="payPal" readOnly value="payPal" />
                        <label className="radio-btn__label" htmlFor="payPal">
                            <span className="radio-btn"/>
                            <div className="">
                               <img src="https://www.homedepot.com/mycheckout/assets/react/images/layout/paypal-logo.png" className="opc-paypal-logo"/>
                            </div>
                        </label>
                    </div>
                    <div className="col__12-12 radio-btn">
                        <input className="radio-btn__input" type="radio" name="creditCard" readOnly value="creditCard" />
                        <label className="radio-btn__label" htmlFor="creditCard">
                            <span className="radio-btn"/>
                                <div> <img src={hd_credit_card} className="opc-credit-image"  alt="Credit Card Logo"/>****5555 05/25</div>
                        </label>
                    </div>
            </div>
        </div>
        </>
    )
}

export default Opc;